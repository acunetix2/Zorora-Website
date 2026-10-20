import { once } from "node:events"

const REPOSITORY = "acunetix2/Zorora"
const GITHUB_API_VERSION = "2022-11-28"

function sendError(response, statusCode, message) {
  response.statusCode = statusCode
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.setHeader("Cache-Control", "no-store")
  response.end(JSON.stringify({ error: message }))
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET")
    sendError(response, 405, "Only GET requests are supported.")
    return
  }

  const requestUrl = new URL(request.url ?? "/", `https://${request.headers.host ?? "localhost"}`)
  const assetId = requestUrl.searchParams.get("assetId")
  const token = process.env.GITHUB_TOKEN

  if (!assetId || !/^\d{1,20}$/.test(assetId)) {
    sendError(response, 400, "A valid Android release asset is required.")
    return
  }

  if (!token) {
    sendError(response, 503, "The private release source is not configured.")
    return
  }

  const upstreamUrl = `https://api.github.com/repos/${REPOSITORY}/releases/assets/${assetId}`
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  }
  let upstream
  try {
    const metadataResponse = await fetch(upstreamUrl, { headers })
    if (!metadataResponse.ok) {
      const statusCode = metadataResponse.status === 404 ? 404 : 502
      sendError(
        response,
        statusCode,
        statusCode === 404
          ? "This Android file is no longer available in the release."
          : "The release file server could not verify this download.",
      )
      return
    }

    const metadata = await metadataResponse.json()
    if (typeof metadata.name !== "string" || !/\.apk$/i.test(metadata.name)) {
      sendError(response, 400, "Only Android APK files can be downloaded here.")
      return
    }

    upstream = await fetch(upstreamUrl, {
      headers: { ...headers, Accept: "application/octet-stream" },
      redirect: "follow",
    })
  } catch (error) {
    console.error("Release download request failed:", error)
    sendError(response, 502, "The release file server could not be reached.")
    return
  }

  if (!upstream.ok) {
    const statusCode = upstream.status === 404 ? 404 : 502
    sendError(
      response,
      statusCode,
      upstream.status === 404
        ? "This file is no longer available in the release."
        : "The release file server could not provide this download.",
    )
    return
  }

  if (!upstream.body) {
    sendError(response, 502, "The release file server returned an empty response.")
    return
  }

  response.statusCode = 200
  response.setHeader("Content-Type", upstream.headers.get("content-type") || "application/octet-stream")
  response.setHeader("Content-Disposition", "attachment")
  response.setHeader("Cache-Control", "private, no-store")
  response.setHeader("X-Content-Type-Options", "nosniff")

  const contentLength = upstream.headers.get("content-length")
  if (contentLength && /^\d+$/.test(contentLength)) {
    response.setHeader("Content-Length", contentLength)
  }

  const reader = upstream.body.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!response.write(value)) await once(response, "drain")
    }
    response.end()
  } catch (error) {
    console.error("Release download stream failed:", error)
    response.destroy(error)
  } finally {
    reader.releaseLock()
  }
}
