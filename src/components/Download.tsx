import { ArrowDownToLine, ArrowUpRight, Github, Info, Loader2, Rocket } from 'lucide-react'
import type { ReactNode } from 'react'
import { fmt } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import {
  PLATFORM_NAMES,
  RELEASES_URL,
  REPO_URL,
  buildsOf,
  formatBytes,
  latestRelease,
  recommendedBuild,
  useDetectedSystem,
  useReleases,
  type Build,
  type Platform,
  type Release
} from '../lib/github'
import { OsIcon, Reveal, SectionHeading } from './ui'

const PLATFORMS: Platform[] = ['windows', 'macos', 'linux']

const KIND_ORDER = ['installer', 'dmg', 'deb', 'rpm', 'portable', 'archive']

function useLabels() {
  const { t } = useLanguage()
  const archLabel = (build: Build) =>
    build.platform === 'macos'
      ? build.arch === 'arm64'
        ? t.download.arch.macArm64
        : t.download.arch.macX64
      : t.download.arch[build.arch]
  const kindLabel = (build: Build) => t.download.kinds[build.kind]
  return { archLabel, kindLabel }
}

function formatDate(iso: string | null, lang: string) {
  if (!iso) return ''
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(iso))
}

function Recommended({ build }: { build: Build }) {
  const { t } = useLanguage()
  const { archLabel, kindLabel } = useLabels()
  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/[0.12] via-blue-600/[0.06] to-violet-600/[0.1] p-6 sm:p-8">
      <div
        aria-hidden
        className="absolute -right-20 -top-24 size-72 rounded-full bg-sky-400/20 blur-3xl"
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
            <OsIcon platform={build.platform} className="size-7 text-white" />
          </span>
          <div>
            <p className="text-xs font-medium text-sky-300">{t.download.recommended}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
              {PLATFORM_NAMES[build.platform]} · {archLabel(build)}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {kindLabel(build)} · {formatBytes(build.asset.size)}
            </p>
          </div>
        </div>
        <a
          href={build.url}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-7 text-sm font-semibold text-ink-950 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.7)] transition-[background-color,transform] hover:-translate-y-px hover:bg-sky-50"
        >
          <ArrowDownToLine className="size-4" />
          {t.nav.downloadCta}
        </a>
      </div>
      {build.platform === 'macos' && (
        <p className="relative mt-6 flex items-start gap-2 border-t border-white/[0.08] pt-5 text-xs leading-relaxed text-slate-400">
          <Info className="mt-px size-3.5 shrink-0" />
          {t.download.macTip}
        </p>
      )}
    </div>
  )
}

function PlatformCard({ platform, builds }: { platform: Platform; builds: Build[] }) {
  const { t } = useLanguage()
  const { archLabel, kindLabel } = useLabels()
  // Mac 先列 Apple 芯片，其余平台先列 x64；同架构内按安装方式排序
  const primaryArch = platform === 'macos' ? 'arm64' : 'x64'
  const archRank = (build: Build) => (build.arch === primaryArch ? 0 : 1)
  const sorted = [...builds].sort(
    (a, b) => archRank(a) - archRank(b) || KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind)
  )
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
      <div className="flex items-center gap-3">
        <OsIcon platform={platform} className="size-5 text-slate-200" />
        <h3 className="text-lg font-semibold text-white">{PLATFORM_NAMES[platform]}</h3>
      </div>
      <p className="mt-1.5 text-xs text-slate-500">{t.download.requirements[platform]}</p>
      <ul className="mt-5 flex-1 space-y-1">
        {sorted.length === 0 && (
          <li className="py-2 text-sm text-slate-500">{t.download.noAsset}</li>
        )}
        {sorted.map((build) => (
          <li key={build.asset.name}>
            <a
              href={build.url}
              title={build.asset.name}
              className="group -mx-3 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-slate-200">
                  {kindLabel(build)}
                  <span className="ml-2 text-xs text-slate-500">{archLabel(build)}</span>
                </span>
              </span>
              <span className="font-mono text-xs text-slate-500">
                {formatBytes(build.asset.size)}
              </span>
              <ArrowDownToLine className="size-4 text-slate-500 transition-colors group-hover:text-sky-300" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReleaseDownloads({ release }: { release: Release }) {
  const { t, lang } = useLanguage()
  const system = useDetectedSystem()
  const builds = buildsOf(release)
  const recommended = system ? recommendedBuild(builds, system.platform, system.arch) : null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-400">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-200">
          {release.tag_name}
        </span>
        <span>{fmt(t.download.publishedOn, { date: formatDate(release.published_at, lang) })}</span>
        <a
          href={release.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200"
        >
          {t.download.releaseNotes}
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      {recommended && (
        <Reveal className="pt-6">
          <Recommended build={recommended} />
        </Reveal>
      )}

      <div className="grid gap-4 pt-2 md:grid-cols-3">
        {PLATFORMS.map((platform, index) => (
          <Reveal key={platform} delay={index * 0.06}>
            <PlatformCard
              platform={platform}
              builds={builds.filter((build) => build.platform === platform)}
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function Notice({
  icon,
  title,
  desc,
  cta
}: {
  icon: ReactNode
  title?: string
  desc: string
  cta?: boolean
}) {
  const { t } = useLanguage()
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6 py-12 text-center sm:px-12">
      <span className="flex size-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
        {icon}
      </span>
      {title && <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>}
      <p className="mt-3 text-balance text-sm leading-relaxed text-slate-400">{desc}</p>
      {cta && (
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-sky-50"
        >
          <Github className="size-4" />
          {t.download.empty.cta}
        </a>
      )}
      <div className="mt-8 flex items-center gap-4 text-slate-500">
        {PLATFORMS.map((platform) => (
          <OsIcon key={platform} platform={platform} className="size-4" />
        ))}
      </div>
    </div>
  )
}

export function Download() {
  const { t } = useLanguage()
  const releases = useReleases()
  const latest = releases.status === 'ready' ? latestRelease(releases.data) : null

  return (
    <section id="download" className="relative py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.14),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.download.eyebrow}
          title={t.download.title}
          desc={t.download.desc}
        />
        <div className="mt-14">
          {releases.status === 'loading' && (
            <Notice icon={<Loader2 className="size-5 animate-spin" />} desc={t.download.loading} />
          )}
          {releases.status === 'error' && (
            <div className="text-center">
              <p className="text-sm text-slate-400">{t.download.error}</p>
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-white/12 px-6 text-sm text-slate-200 hover:bg-white/[0.06]"
              >
                <Github className="size-4" />
                GitHub Releases
              </a>
            </div>
          )}
          {releases.status === 'ready' &&
            (latest ? (
              <ReleaseDownloads release={latest} />
            ) : (
              <Notice
                icon={<Rocket className="size-5" />}
                title={t.download.empty.title}
                desc={t.download.empty.desc}
                cta
              />
            ))}
        </div>
      </div>
    </section>
  )
}
