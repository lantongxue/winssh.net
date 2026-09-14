import { motion, useReducedMotion } from 'motion/react'
import { Download } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden pt-24 pb-12">
      {/* Background Glow & Fine Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_35%,#000_65%,transparent_100%)] z-0" />

        {/* Ambient Radial Gradient Orbs with controlled Cyan/Blue tone */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full mix-blend-screen opacity-70"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(2,132,199,0.12) 40%, transparent 70%)'
          }}
        />
      </div>

      {/* Main Hero Stack (Disciplined: Max 4 text elements) */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Element 1: Eyebrow Badge */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6 hover:border-cyan-500/50 transition-colors cursor-default"
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${reduceMotion ? '' : 'animate-ping'}`} />
            <span className="text-xs font-mono font-medium text-cyan-200 tracking-wide">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Element 2: Headline (Strictly max 2 lines) */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold tracking-tight leading-[1.15]"
          >
            <span className="text-white block sm:whitespace-nowrap">
              {t.hero.title[0]}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 inline-block sm:whitespace-nowrap">
              {t.hero.title[1]}
              <span className={`inline-block ml-2 md:ml-3 w-2 md:w-3 lg:w-3.5 h-[0.72em] bg-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.8)] rounded-[1px] align-baseline ${reduceMotion ? '' : 'animate-pulse'}`} />
            </span>
          </motion.h1>

          {/* Element 3: Subtext (Concise < 20 words) */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-neutral-300 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>

          {/* Element 4: CTA */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center"
          >
            <a
              href="#download"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>{t.hero.ctaDownload}</span>
              <span className="text-[11px] px-1.5 py-0.5 bg-black/15 rounded font-mono font-bold">v3.0</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Technical Metric Strip (Separated from hero stack, grounded at section bottom) */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-6"
      >
        <div className="py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-neutral-400">
          {t.hero.chips.map((chip, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-neutral-300">{chip}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
