import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDownToLine, ArrowRight, Github } from 'lucide-react'
import { useRef } from 'react'
import { fmt } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import {
  PLATFORM_NAMES,
  REPO_URL,
  buildsOf,
  latestRelease,
  recommendedBuild,
  useDetectedSystem,
  useReleases
} from '../lib/github'
import { screenshots } from '../content/screenshots'
import { EASE_OUT, OsIcon } from './ui'

export function Hero() {
  const { t, lang } = useLanguage()
  const reduceMotion = useReducedMotion()
  const releases = useReleases()
  const system = useDetectedSystem()

  const latest = releases.status === 'ready' ? latestRelease(releases.data) : null
  const build =
    latest && system ? recommendedBuild(buildsOf(latest), system.platform, system.arch) : null

  const status =
    releases.status === 'ready'
      ? latest
        ? fmt(t.hero.released, { version: latest.tag_name })
        : t.hero.comingSoon
      : null

  const shotRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: shotRef, offset: ['start end', 'start 0.35'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 16, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0.92, 1])

  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.9, delay, ease: EASE_OUT }
        }

  const shot = screenshots.overview[lang]

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18rem] h-[52rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(14,40,86,0.9),rgba(7,19,43,0.45)_55%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_20%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <motion.a
          {...enter(0)}
          href={latest ? '#changelog' : '#download'}
          className={`group inline-flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-3 pr-2.5 text-xs text-slate-300 backdrop-blur transition-colors hover:border-sky-400/30 hover:text-white ${status ? '' : 'invisible'}`}
        >
          <span className="size-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_2px_rgba(56,189,248,0.6)]" />
          <span>{status ?? t.hero.comingSoon}</span>
          <ArrowRight className="size-3.5 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-300" />
        </motion.a>

        <motion.div {...enter(0.08)} className="relative mt-10">
          {lang === 'zh' ? (
            <h1 className="relative font-wordmark text-[clamp(4.5rem,17vw,11.5rem)] font-black leading-none tracking-[0.06em]">
              <span
                aria-hidden
                className="absolute inset-0 select-none text-gradient-brand opacity-50 blur-2xl"
              >
                {t.hero.title[0]}
              </span>
              <span className="relative text-gradient-ceramic">{t.hero.title[0]}</span>
            </h1>
          ) : (
            <h1 className="relative text-[clamp(3.25rem,10vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <span className="block text-gradient-ceramic pb-[0.06em]">{t.hero.title[0]}</span>
              <span className="relative block pb-[0.08em]">
                <span
                  aria-hidden
                  className="absolute inset-0 select-none text-gradient-brand opacity-60 blur-2xl"
                >
                  {t.hero.title[1]}
                </span>
                <span className="relative text-gradient-brand">{t.hero.title[1]}</span>
              </span>
            </h1>
          )}
        </motion.div>

        <motion.p
          {...enter(0.16)}
          className={
            lang === 'zh'
              ? 'mt-7 font-mono text-xs uppercase tracking-[0.42em] text-slate-400 sm:text-sm'
              : 'mt-6 font-wordmark text-lg font-black tracking-[0.5em] text-slate-400'
          }
        >
          {t.hero.kicker}
        </motion.p>

        <motion.p
          {...enter(0.24)}
          className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-slate-300/90 sm:text-lg"
        >
          {t.hero.desc.map((sentence) => (
            <span key={sentence} className="sm:block">
              {sentence}{' '}
            </span>
          ))}
        </motion.p>

        <motion.div {...enter(0.32)} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={build ? build.asset.browser_download_url : '#download'}
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-sm font-semibold text-ink-950 shadow-[0_0_0_1px_rgba(255,255,255,0.4),0_10px_40px_-10px_rgba(56,189,248,0.7)] transition-[background-color,transform] hover:-translate-y-px hover:bg-sky-50"
          >
            {build ? (
              <OsIcon platform={build.platform} className="size-4" />
            ) : (
              <ArrowDownToLine className="size-4" />
            )}
            {build
              ? fmt(t.hero.ctaDownload, { os: PLATFORM_NAMES[build.platform] })
              : t.hero.ctaDownloadGeneric}
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm font-medium text-slate-200 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.07]"
          >
            <Github className="size-4" />
            {t.hero.ctaGithub}
          </a>
        </motion.div>

        <motion.div {...enter(0.4)} className="mt-6 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-2 text-slate-400">
            <OsIcon platform="windows" className="size-3.5" />
            <OsIcon platform="macos" className="size-3.5" />
            <OsIcon platform="linux" className="size-3.5" />
          </span>
          <span>{t.hero.meta}</span>
        </motion.div>
      </div>

      <div
        ref={shotRef}
        className="relative mx-auto mt-20 max-w-6xl px-5 [perspective:1600px] sm:mt-24 sm:px-8"
      >
        <div
          aria-hidden
          className="absolute inset-x-[8%] top-[6%] h-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),rgba(139,92,246,0.18)_60%,transparent)] blur-3xl"
        />
        <motion.div
          style={{ rotateX, scale, transformOrigin: 'center top' }}
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-[0_40px_120px_-30px_rgba(2,6,23,1)] ring-1 ring-white/[0.04] sm:rounded-2xl"
        >
          <img
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={t.hero.screenshotAlt}
            fetchPriority="high"
            className="block h-auto w-full"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]"
          />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
        />
      </div>
    </section>
  )
}
