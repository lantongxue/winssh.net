import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { Circle, GitCommit, Loader2, ChevronDown, ChevronUp, ExternalLink, Sparkles, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Release {
  id: number
  tag_name: string
  name: string
  published_at: string
  body: string
  prerelease: boolean
  html_url: string
}

function ReleaseItem({
  release,
  index,
  formatDate,
  t
}: {
  release: Release
  index: number
  formatDate: (d: string) => string
  t: any
}) {
  const [expanded, setExpanded] = useState(false)
  const isLong = release.body && (release.body.length > 300 || release.body.split('\n').length > 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-7 h-7 rounded-full border border-cyan-500/30 bg-[#0c0c0e] text-cyan-400 group-hover:text-white group-hover:border-cyan-400 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_12px_rgba(6,182,212,0.4)] relative z-10">
        <GitCommit className="w-3.5 h-3.5" />
      </div>

      {/* Card */}
      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-display font-semibold text-xl text-white">
              <a
                href={release.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                {release.name || release.tag_name}
              </a>
            </h3>
            {release.prerelease ? (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                Pre-release
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Release
              </span>
            )}
          </div>
          <time className="text-xs font-mono text-neutral-400">
            {formatDate(release.published_at)}
          </time>
        </div>

        <div
          className={`mt-4 break-words relative transition-all duration-300 ${!expanded && isLong ? 'max-h-[220px] overflow-hidden' : ''}`}
          style={
            !expanded && isLong
              ? {
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }
              : {}
          }
        >
          <ReactMarkdown
            components={{
              ul: ({ node, ...props }) => <ul className="space-y-2.5 my-3" {...props} />,
              li: ({ node, ...props }) => (
                <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm font-light">
                  <Circle className="w-1.5 h-1.5 mt-1.5 shrink-0 text-cyan-400 fill-cyan-400" />
                  <span className="leading-relaxed flex-1" {...props} />
                </li>
              ),
              p: ({ node, ...props }) => (
                <p className="text-neutral-400 text-xs sm:text-sm font-light mb-2 last:mb-0" {...props} />
              ),
              h1: ({ node, ...props }) => (
                <h4 className="text-white font-medium text-sm mb-2 mt-4 first:mt-0" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h4 className="text-white font-medium text-sm mb-2 mt-4 first:mt-0" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h4 className="text-white font-medium text-sm text-neutral-300 mb-2 mt-4 first:mt-0" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-cyan-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-white/10 px-1 py-0.5 rounded text-xs font-mono text-cyan-300"
                  {...props}
                />
              )
            }}
          >
            {release.body}
          </ReactMarkdown>
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> {t.changelogSection.showLess || 'Show less'}
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> {t.changelogSection.showMore || 'Read full notes'}
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export function Changelog() {
  const { t, lang } = useLanguage()
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    fetch('/api/v1/releases')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReleases(data)
        }
      })
      .catch((e) => console.log('Notice: fallback to local changelog dataset', e))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date)
    } catch {
      return dateString
    }
  }

  // Fallback to static rich translation history if API returns empty
  const displayItems =
    releases.length > 0
      ? releases
      : t.changelogSection.versions.map((v: any, idx: number) => ({
          id: idx,
          tag_name: v.version,
          name: `${v.version} - ${v.badge}`,
          published_at: v.date,
          body: v.changes.join('\n\n'),
          prerelease: false,
          html_url: 'https://github.com/lantongxue/winssh/releases'
        }))

  return (
    <section id="changelog" className="py-28 px-4 sm:px-6 md:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.changelogSection.badge}</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4"
          >
            {t.changelogSection.titleLevel1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              {t.changelogSection.titleLevel2}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-neutral-400 text-base md:text-lg font-light max-w-xl mx-auto"
          >
            {t.changelogSection.desc}
          </motion.p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/30 before:to-transparent">
          {loading && releases.length === 0 ? (
            <div className="flex justify-center items-center py-20 text-neutral-500 relative z-10">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
            </div>
          ) : (
            displayItems
              .slice(0, visibleCount)
              .map((release, i) => (
                <ReleaseItem
                  key={release.id}
                  release={release}
                  index={i}
                  formatDate={formatDate}
                  t={t}
                />
              ))
          )}
        </div>

        {displayItems.length > visibleCount && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center relative z-10"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono transition-colors flex items-center gap-2"
            >
              <ChevronDown className="w-4 h-4" />
              {t.changelogSection.loadMore || 'Load more releases'}
            </button>
          </motion.div>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/lantongxue/winssh/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <span>{t.changelogSection.viewAllOnGithub}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
