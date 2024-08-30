import { ActionError, ActionPostRequest, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions"
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, ACTIONS_CORS_HEADERS)

  try {
    const body: ActionPostRequest = await readBody(event)

    let receiver: PublicKey
    try {
      receiver = new PublicKey(body.account)
    } catch (error) {
      console.log(error)
      throw `Invalid account provided '${body.account}'`
    }

    // TODO:configure with angpao giver account
    const account = new PublicKey('')

    // TODO: store total in db or cache
    const total = 5000

    if (total <= 0) throw "Angpao is empty"

    const amount = getRandomIntInclusive(1, 25) * .1 * total

    const connection = new Connection(process.env.SOLANA_RPC! || clusterApiUrl("devnet"))
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: receiver,
      lamports: amount * LAMPORTS_PER_SOL
    })

    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight
    }).add(transferInstruction)

    // const response = await createPostResponse({
    //   fields: {
    //     transaction,
    //     message: `Send to ${to}`
    //   }
    // })

    // return response
  } catch (error) {
    setResponseStatus(event, 400)
    console.log(error);

    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof error === "string") actionError.message = error;

    return actionError
  }
})

function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
