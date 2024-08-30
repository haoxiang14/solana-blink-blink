import { ACTIONS_CORS_HEADERS } from "@solana/actions"

export default defineEventHandler((event) => {
  setResponseHeaders(event, ACTIONS_CORS_HEADERS)
  return null
})
