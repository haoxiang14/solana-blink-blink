import { ActionError, ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions"

export default defineEventHandler((event) => {
  setResponseHeaders(event, ACTIONS_CORS_HEADERS)

  try {
    const url = getRequestURL(event)

    const response: ActionGetResponse = {
      type: "action",
      title: "Get angpao",
      icon: new URL('/favicon.ico', url.origin).toString(),
      description: "Get random money",
      label: "Open",
      links: {
        actions: [
          {
            label: "Open angpao",
            href: new URL('/api/angpao', url.origin).toString()
          }
        ]
      }
    }

    return response
  } catch (error) {
    setResponseStatus(event, 400)
    console.log(error);

    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof error === "string") actionError.message = error;

    return actionError
  }
})
