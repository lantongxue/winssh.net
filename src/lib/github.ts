import { useEffect, useState } from 'react'

export const REPO_URL = 'https://github.com/lantongxue/winssh-pro'
export const RELEASES_URL = `${REPO_URL}/releases`
export const ISSUES_URL = `${REPO_URL}/issues`

// 走 cloud-functions/api.go 代理并缓存的 GitHub 接口，页面不直连 api.github.com，避免触发 IP 限流
const API_BASE = '/api/v1'

export interface ReleaseAsset {
  name: string
  size: number
  // 云函数已按 GITHUB_MIRROR 改写成镜像加速站地址，前端拿到就用
  browser_download_url: string
}

export interface Release {
  tag_name: string
  name: string | null
  body: string | null
  html_url: string
  published_at: string | null
  draft: boolean
  prerelease: boolean
  assets: ReleaseAsset[]
}

export type Platform = 'windows' | 'macos' | 'linux'
export type Arch = 'x64' | 'arm64'
export type BuildKind = 'installer' | 'portable' | 'dmg' | 'deb' | 'rpm' | 'archive'

export interface Build {
  platform: Platform
  arch: Arch
  kind: BuildKind
  asset: ReleaseAsset
  // 云函数给出的镜像加速地址，不指向 GitHub 直链
  url: string
}

export type LoadState<T> =
  { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: T }

const cache = new Map<string, Promise<unknown>>()

function getJson<T>(path: string): Promise<T> {
  let pending = cache.get(path) as Promise<T> | undefined
  if (!pending) {
    pending = fetch(`${API_BASE}${path}`).then((res) => {
      if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`)
      return res.json() as Promise<T>
    })
    // 失败的请求不留在缓存里，下次挂载时可以重试
    pending.catch(() => cache.delete(path))
    cache.set(path, pending)
  }
  return pending
}

function useApi<T>(load: () => Promise<T>, key: string): LoadState<T> {
  const [state, setState] = useState<LoadState<T>>({ status: 'loading' })

  useEffect(() => {
    let alive = true
    load()
      .then((data) => alive && setState({ status: 'ready', data }))
      .catch(() => alive && setState({ status: 'error' }))
    return () => {
      alive = false
    }
  }, [key])

  return state
}

// 云函数会透传 GitHub 的错误状态码，这里再按数据形状校验一次，防止异常响应被当成数据渲染
function loadReleases() {
  return getJson<unknown>('/releases').then((data) => {
    if (!Array.isArray(data)) throw new Error('unexpected releases payload')
    return (data as Release[]).filter((release) => !release.draft)
  })
}

function loadStars() {
  return getJson<{ stargazers_count?: unknown }>('/repo').then((data) => {
    if (typeof data.stargazers_count !== 'number') throw new Error('unexpected repo payload')
    return data.stargazers_count
  })
}

export function useReleases() {
  return useApi(loadReleases, 'releases')
}

export function useStars() {
  return useApi(loadStars, 'stars')
}

export function latestRelease(releases: Release[]) {
  return releases.find((release) => !release.prerelease) ?? releases[0] ?? null
}

const IGNORED_ASSET = /\.(sha256|sha512|sig|asc|minisig|blockmap|yml|yaml|txt|json)$/i

// 产物命名见 winssh-pro 的 .github/workflows/release.yml：
//   winssh-pro-<arch>-<ver>-setup.exe、winssh-pro-<ver>-macos-<arch>.dmg、
//   winssh-pro-<os>-<arch>.{deb,rpm,tar.gz}
export function classifyAsset(asset: ReleaseAsset): Build | null {
  const name = asset.name.toLowerCase()
  if (IGNORED_ASSET.test(name)) return null

  let kind: BuildKind
  let platform: Platform | null = null
  if (name.endsWith('.exe') || name.endsWith('.msi')) {
    kind = 'installer'
    platform = 'windows'
  } else if (name.endsWith('.dmg')) {
    kind = 'dmg'
    platform = 'macos'
  } else if (name.endsWith('.deb')) {
    kind = 'deb'
    platform = 'linux'
  } else if (name.endsWith('.rpm')) {
    kind = 'rpm'
    platform = 'linux'
  } else if (/\.(tar\.gz|tgz|zip|tar\.xz|appimage)$/.test(name)) {
    kind = 'archive'
  } else {
    return null
  }

  platform ??= /windows|win(32|64)?[-_.]/.test(name)
    ? 'windows'
    : /macos|darwin|mac[-_.]/.test(name)
      ? 'macos'
      : /linux/.test(name)
        ? 'linux'
        : null
  if (!platform) return null
  if (platform === 'windows' && kind === 'archive') kind = 'portable'

  const arch: Arch = /arm64|aarch64/.test(name) ? 'arm64' : 'x64'
  return { platform, arch, kind, asset, url: asset.browser_download_url }
}

export function buildsOf(release: Release | null) {
  if (!release) return []
  return release.assets
    .map(classifyAsset)
    .filter((build): build is Build => build !== null)
}

const KIND_PRIORITY: Record<Platform, BuildKind[]> = {
  windows: ['installer', 'portable'],
  macos: ['dmg', 'archive'],
  linux: ['deb', 'rpm', 'archive']
}

export function recommendedBuild(builds: Build[], platform: Platform, arch: Arch) {
  const candidates = builds.filter((build) => build.platform === platform)
  const rank = (build: Build) =>
    (build.arch === arch ? 0 : 10) + KIND_PRIORITY[platform].indexOf(build.kind)
  return candidates.sort((a, b) => rank(a) - rank(b))[0] ?? null
}

export interface DetectedSystem {
  platform: Platform
  arch: Arch
}

type UAData = {
  platform?: string
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>
}

function detectPlatform(): Platform | null {
  const nav = navigator as Navigator & { userAgentData?: UAData }
  const source =
    `${nav.userAgentData?.platform ?? ''} ${navigator.platform} ${navigator.userAgent}`.toLowerCase()
  if (/iphone|ipad|android/.test(source)) return null
  if (/win/.test(source)) return 'windows'
  if (/mac/.test(source)) return 'macos'
  if (/linux|x11|cros/.test(source)) return 'linux'
  return null
}

// Mac 上的浏览器一律在 UA 里自称 Intel，只能借 WebGL 渲染器名判断是不是 Apple 芯片
function looksLikeAppleSilicon() {
  try {
    const gl = document.createElement('canvas').getContext('webgl')
    if (!gl) return true
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = String(
      info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)
    )
    return !/intel|amd|radeon|nvidia/i.test(renderer)
  } catch {
    return true
  }
}

async function detectSystem(): Promise<DetectedSystem | null> {
  const platform = detectPlatform()
  if (!platform) return null
  if (platform === 'macos') return { platform, arch: looksLikeAppleSilicon() ? 'arm64' : 'x64' }

  const nav = navigator as Navigator & { userAgentData?: UAData }
  try {
    const values = await nav.userAgentData?.getHighEntropyValues?.(['architecture'])
    if (values?.architecture === 'arm') return { platform, arch: 'arm64' }
  } catch {
    // 拿不到高熵信息时退回 UA 判断
  }
  return { platform, arch: /aarch64|arm64/i.test(navigator.userAgent) ? 'arm64' : 'x64' }
}

let systemPromise: Promise<DetectedSystem | null> | null = null

export function useDetectedSystem() {
  const [system, setSystem] = useState<DetectedSystem | null>(null)
  useEffect(() => {
    let alive = true
    systemPromise ??= detectSystem()
    systemPromise.then((value) => alive && setSystem(value))
    return () => {
      alive = false
    }
  }, [])
  return system
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const PLATFORM_NAMES: Record<Platform, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux'
}
