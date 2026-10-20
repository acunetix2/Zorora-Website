const REPOSITORY = "acunetix2/Zorora"
const GITHUB_API_VERSION = "2022-11-28"

function sanitizeReleaseNotes(body) {
  if (typeof body !== "string") return null
  const notes = body
    .split(/\r?\n/)
    .filter((line) => !/github\.com/i.test(line))
    .join("\n")
    .trim()
  return notes || null
}

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

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    sendError(response, 503, "The private release source is not configured.")
    return
  }

  let upstream
  try {
    upstream = await fetch(
      `https://api.github.com/repos/${REPOSITORY}/releases?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": GITHUB_API_VERSION,
        },
        cache: "no-store",
      },
    )
  } catch (error) {
    console.error("Release list request failed:", error)
    sendError(response, 502, "The release service could not be reached.")
    return
  }

  if (!upstream.ok) {
    const rateLimitRemaining = upstream.headers.get("x-ratelimit-remaining")
    const rateLimited =
      upstream.status === 429 ||
      (upstream.status === 403 && rateLimitRemaining === "0")
    const statusCode = rateLimited ? 429 : 502

    console.error("GitHub release list request was rejected:", {
      status: upstream.status,
      requestId: upstream.headers.get("x-github-request-id"),
      rateLimitRemaining,
      rateLimitReset: upstream.headers.get("x-ratelimit-reset"),
    })

    sendError(
      response,
      statusCode,
      rateLimited
        ? "GitHub's release API rate limit has been reached. Try again after it resets."
        : upstream.status === 401
          ? "GitHub rejected the release token. Check that GITHUB_TOKEN is active and configured for this deployment."
          : upstream.status === 403
            ? "GitHub denied access to the private Zorora releases. Check the token's repository access and Contents: read permission."
            : upstream.status === 404
              ? "GitHub could not find the private Zorora release source. Check that the configured token can access acunetix2/Zorora."
              : "The release service could not provide release information.",
    )
    return
  }

  let data
  try {
    data = await upstream.json()
  } catch (error) {
    console.error("Release list response was not valid JSON:", error)
    sendError(response, 502, "The release service returned an invalid response.")
    return
  }

  if (!Array.isArray(data)) {
    sendError(response, 502, "The release service returned an invalid release list.")
    return
  }

  const releases = data
    .filter((release) =>
      release &&
      typeof release.id === "number" &&
      typeof release.tag_name === "string" &&
      typeof release.prerelease === "boolean" &&
      !release.draft &&
      Array.isArray(release.assets),
    )
    .map((release) => ({
      id: release.id,
      tag_name: release.tag_name,
      name: typeof release.name === "string" ? release.name : null,
      body: sanitizeReleaseNotes(release.body),
      draft: Boolean(release.draft),
      prerelease: release.prerelease,
      published_at: typeof release.published_at === "string" ? release.published_at : null,
      assets: release.assets
        .filter((asset) =>
          asset &&
          typeof asset.id === "number" &&
          typeof asset.name === "string" &&
          typeof asset.size === "number" &&
          /\.apk$/i.test(asset.name),
        )
        .map((asset) => ({
          id: asset.id,
          name: asset.name,
          size: asset.size,
          content_type: typeof asset.content_type === "string" ? asset.content_type : "",
          download_count: typeof asset.download_count === "number" ? asset.download_count : 0,
        })),
    }))
    .filter((release) => release.assets.length > 0)

  response.statusCode = 200
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.setHeader("Cache-Control", "no-store")
  response.end(JSON.stringify(releases))
}
