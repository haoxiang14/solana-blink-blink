import { createClient } from '@/lib/supabase';
import { ActionError, ActionGetResponse, ActionPostRequest, ActionPostResponse, createActionHeaders, createPostResponse } from '@solana/actions'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const headers = createActionHeaders();

async function fetchAirdrop(airdropId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('airdrops').select().eq('airdrop_id', airdropId).single()
  if (error) {
    console.log(error)
    return null
  }
  return data
}

export async function GET(request: Request, { params }: { params: { airdropId: string } }) {
  try {
    const { airdropId } = params
    const airdrop = await fetchAirdrop(airdropId)

    if (!airdrop) {
      return Response.json({ status: 404 })
    }

    const requestUrl = new URL(request.url);
    const baseHref = new URL(`/airdrops/${airdropId}/action`, requestUrl.origin).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: "...",
      icon: new URL("/next.svg", requestUrl.origin).toString(),
      description: "...",
      label: "Claim", // this value will be ignored since `links.actions` exists
      links: {
        actions: [
          airdrop.password ? {
            label: "Secret Phrase",
            href: `${baseHref}&sp={secretPhrase}`,
            parameters: [
              {
                name: "secretPhrase", // parameter name in the `href` above
                label: "••••••••••••", // placeholder of the text input
                required: true,
              },
            ],
          } : {
            label: "Claim",
            href: `${baseHref}`, // update this
          }
        ],
      },
    }

    return Response.json(payload, {
      headers,
    });
  } catch (error) {
    console.log(error);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof error == "string") actionError.message = error;
    return Response.json(actionError, {
      status: 500,
      headers,
    });
  }
}

export async function OPTIONS(_request: Request) {
  return Response.json(null, { headers });
}

export async function POST(request: Request, { params }: { params: { airdropId: string } }) {
  try {
    const { airdropId } = params
    const airdrop = await fetchAirdrop(airdropId)

    if (!airdrop) {
      return Response.json({ status: 404 })
    }

    const requestUrl = new URL(request.url);
    const password = requestUrl.searchParams.get('password')

    if (airdrop.password && airdrop.password.length > 0) {
      if (password !== airdrop.password) {
        throw "Invalid password"
      }
    }

    const body: ActionPostRequest = await request.json();

    // from
    const secretKey = new Uint8Array(airdrop.secret.split(',').map((s) => parseInt(s)))
    const from = Keypair.fromSecretKey(secretKey)

    // to
    let to: PublicKey;
    try {
      to = new PublicKey(body.account)
    } catch (err) {
      throw 'Invalid "account" provided'
    }

    const connection = new Connection(process.env.SOLANA_RPC! || clusterApiUrl("devnet"))

    // TODO: get token type from airdrop and check balance of token in wallet

    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: airdrop.amount * LAMPORTS_PER_SOL,
    });

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    const transaction = new Transaction({
      feePayer: from.publicKey,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${airdrop.amount} SOL to ${to.toBase58()}`,
      },
    });

    return Response.json(payload, {
      headers,
    });
  } catch (error) {
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof error == "string") actionError.message = error;
    return Response.json(actionError, {
      status: 500,
      headers,
    });
  }
}
