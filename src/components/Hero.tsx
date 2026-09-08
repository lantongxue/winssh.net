import { motion } from 'motion/react'
import { Download, Sparkles, Zap, ArrowDown, ChevronRight, Terminal, ShieldCheck, Cpu } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { t, lang } = useLanguage()

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Background Glow & Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Fine Grid Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_35%,#000_65%,transparent_100%)] z-0"
        />

        {/* Ambient Radial Gradient Orbs */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full mix-blend-screen opacity-80"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(37,99,235,0.15) 45%, transparent 75%)'
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(168,85,247,0.12) 50%, transparent 75%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-8 hover:border-cyan-500/50 transition-colors cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-medium text-cyan-200 tracking-wide">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.08]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400">
              {t.hero.title[0]}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-[gradient_8s_ease_infinite] bg-[length:200%_200%]">
              {t.hero.title[1]}
            </span>
            <span className="inline-block ml-2 md:ml-3 w-3 md:w-5 lg:w-6 h-[0.75em] bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-[1px] align-baseline" />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-neutral-300 text-base sm:text-lg md:text-xl max-w-3xl font-light leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#download"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>{t.hero.ctaDownload}</span>
              <span className="text-xs px-2 py-0.5 bg-black/20 rounded-md font-mono">v3.0</span>
            </a>

            <a
              href="#showcase"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{t.hero.ctaDemo}</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </a>
          </motion.div>

          {/* Quick Technology Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl"
          >
            {t.hero.chips.map((chip, index) => (
              <div
                key={index}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono flex items-center gap-1.5 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{chip}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
