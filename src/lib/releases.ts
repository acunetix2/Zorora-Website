export const RELEASES_API = "/api/releases"
export const PAGE_SIZE = 4
export const RELEASE_REFRESH_INTERVAL_MS = 5 * 60 * 1000
export const RELEASE_FOCUS_REFRESH_THRESHOLD_MS = 4 * 60 * 1000

export type ReleaseAsset = {
  id: number
  name: string
  size: number
  content_type: string
  download_count: number
}

export type DownloadOption = {
  id: string
  name: string
  size: number | null
  download_url: string
}

export type GithubRelease = {
  id: number
  tag_name: string
  name: string | null
  body: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  assets: ReleaseAsset[]
}

export type ReleaseState = "loading" | "ready" | "error"

export type DownloadJob = {
  id: string
  name: string
  status: "downloading" | "complete" | "error"
  progress: number | null
  message?: string
}

export function shortReleaseCode(release: GithubRelease) {
  return String(release.id).slice(-6).padStart(6, "0")
}

export function sanitizeReleaseNotes(body: string | null) {
  if (!body) return ""
  return body
    .split(/\r?\n/)
    .filter((line) => !/github\.com/i.test(line))
    .join("\n")
    .trim()
}

export function formatDate(value: string | null) {
  if (!value) return "Date unavailable"
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

export function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function isAndroidApk(asset: ReleaseAsset) {
  return /\.apk$/i.test(asset.name)
}

export function releaseDownloads(release: GithubRelease): DownloadOption[] {
  return release.assets
    .filter(isAndroidApk)
    .map((asset) => ({
      id: String(asset.id),
      name: asset.name,
      size: asset.size,
      download_url: `/api/download?assetId=${asset.id}`,
    }))
}

export function releasePath(release: GithubRelease) {
  return `/releases/${encodeURIComponent(release.tag_name)}`
}
