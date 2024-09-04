import { ActionError, ActionGetResponse, createActionHeaders } from '@solana/actions'

const headers = createActionHeaders();

export function GET(request: Request, { params }: { params: { airdropId: string } }) {
  try {
    const { airdropId } = params
    const requestUrl = new URL(request.url);

    const baseHref = new URL(`/airdrops/${airdropId}/action`, requestUrl.origin).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: "...",
      icon: new URL("/next.svg", requestUrl.origin).toString(),
      description: "...",
      label: "Claim", // this value will be ignored since `links.actions` exists
      // TODO: set actions conditionaly based on whether airdrop is password protected
      links: {
        actions: [
          {
            label: "Claim",
            href: `${baseHref}`, // update this
          },
          {
            label: "Secret Phrase",
            href: `${baseHref}&sp={secretPhrase}`,
            parameters: [
              {
                name: "secretPhrase", // parameter name in the `href` above
                label: "••••••••••••", // placeholder of the text input
                required: true,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
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
  return Response.json({ message: 'Unimplemented' }, { headers })
}
