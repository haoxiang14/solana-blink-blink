import { createClient } from '@/lib/supabase';
import { ActionError, ActionGetResponse, createActionHeaders } from '@solana/actions'

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
    const baseHref = new URL(`/airdrops/${airdropId}/action`, requestUrl.origin).toString();

    // TODO: implement transfer based on airdrop details

    return Response.json({ message: 'Unimplemented' }, { headers })
  } catch (error) {
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof error == "string") actionError.message = error;
    return Response.json(actionError, {
      status: 500,
      headers,
    });
  }
}
