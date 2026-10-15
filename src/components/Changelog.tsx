import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { RELEASES_URL, latestRelease, useReleases, type Release } from '../lib/github'
import { Reveal, SectionHeading } from './ui'

const VISIBLE = 5

// Markdown 渲染只有更新日志用得到，单独拆包，不拖慢首屏
const Markdown = lazy(() => import('react-markdown'))

// GitHub 自动生成的发行说明里是裸链接和 @用户名；不引入 GFM 插件，直接改写成 Markdown 链接
function linkify(body: string) {
  return body
    .replace(/https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/(?:pull|issues)\/(\d+)/g, '[#$1]($&)')
    .replace(/https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/compare\/(\S+)/g, '[$1]($&)')
    .replace(/(^|\s)@([\w-]+)/g, '$1[@$2](https://github.com/$2)')
}

function ReleaseEntry({ release, isLatest }: { release: Release; isLatest: boolean }) {
  const { t, lang } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const body = release.body?.trim() ?? ''
  const long = body.split('\n').length > 10 || body.length > 600
  const date = release.published_at
    ? new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(new Date(release.published_at))
    : ''

  return (
    <article className="relative grid gap-4 pb-12 pl-8 sm:grid-cols-[10rem_1fr] sm:gap-10 sm:pl-0">
      <div className="sm:text-right">
        <span
          aria-hidden
          className={`absolute left-0 top-1.5 size-2.5 rounded-full ring-4 ring-ink-950 sm:left-[calc(10rem+1.25rem-5px)] ${isLatest ? 'bg-sky-400' : 'bg-slate-600'}`}
        />
        <p className="font-mono text-sm text-white">{release.tag_name}</p>
        <p className="mt-1 text-xs text-slate-500">{date}</p>
      </div>
      <div className="min-w-0 sm:pl-10">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-white">{release.name || release.tag_name}</h3>
          {isLatest && (
            <span className="rounded-full bg-sky-400/15 px-2 py-0.5 text-[11px] font-medium text-sky-300">
              {t.changelog.latest}
            </span>
          )}
          {release.prerelease && (
            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
              {t.changelog.prerelease}
            </span>
          )}
        </div>
        {body && (
          <div className="relative mt-4">
            <div
              className={`prose-release overflow-hidden text-sm leading-relaxed text-slate-400 ${long && !expanded ? 'max-h-56' : ''}`}
            >
              <Suspense fallback={<p className="whitespace-pre-line">{body}</p>}>
                <Markdown
                  components={{
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-300 hover:text-sky-200"
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {linkify(body)}
                </Markdown>
              </Suspense>
            </div>
            {long && !expanded && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-950 to-transparent"
              />
            )}
          </div>
        )}
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white"
          >
            {expanded ? t.changelog.collapse : t.changelog.expand}
            <ChevronDown
              className={`size-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    </article>
  )
}

export function Changelog() {
  const { t } = useLanguage()
  const releases = useReleases()
  const list = releases.status === 'ready' ? releases.data.slice(0, VISIBLE) : []
  const latest = releases.status === 'ready' ? latestRelease(releases.data) : null

  return (
    <section id="changelog" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.changelog.eyebrow}
          title={t.changelog.title}
          desc={t.changelog.desc}
        />

        <Reveal className="mt-16">
          {releases.status === 'ready' && list.length > 0 ? (
            <div className="relative">
              <span
                aria-hidden
                className="absolute bottom-12 left-[4px] top-2 w-px bg-white/[0.08] sm:left-[calc(10rem+1.25rem)]"
              />
              {list.map((release) => (
                <ReleaseEntry
                  key={release.tag_name}
                  release={release}
                  isLatest={release === latest}
                />
              ))}
            </div>
          ) : (
            releases.status !== 'loading' && (
              <p className="text-center text-sm text-slate-500">
                {releases.status === 'error' ? t.changelog.error : t.changelog.empty}
              </p>
            )
          )}
          <div className="mt-4 text-center">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white"
            >
              {t.changelog.viewAll}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
