import { motion } from 'motion/react'
import {
  Cpu,
  FolderSync,
  Activity,
  ShieldCheck,
  Sparkles,
  Network,
  Zap,
  KeyRound,
  FileCode,
  Layers
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Features() {
  const { t } = useLanguage()

  const icons = [
    <Zap className="w-6 h-6 text-cyan-400" />,
    <Sparkles className="w-6 h-6 text-indigo-400" />,
    <Activity className="w-6 h-6 text-emerald-400" />,
    <FolderSync className="w-6 h-6 text-purple-400" />,
    <ShieldCheck className="w-6 h-6 text-amber-400" />,
    <Network className="w-6 h-6 text-blue-400" />
  ]

  const glows = [
    'from-cyan-500/20 to-blue-500/0',
    'from-indigo-500/20 to-purple-500/0',
    'from-emerald-500/20 to-teal-500/0',
    'from-purple-500/20 to-pink-500/0',
    'from-amber-500/20 to-orange-500/0',
    'from-blue-500/20 to-cyan-500/0'
  ]

  return (
    <section id="features" className="py-28 px-4 sm:px-6 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium tracking-wide uppercase mb-4">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.features.badge}</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            {t.features.titleLevel1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              {t.features.titleLevel2}
            </span>
          </motion.h2>
          <p className="text-neutral-400 text-base md:text-lg font-light max-w-2xl mx-auto mt-4">
            {t.features.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.features.items.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle hover radial gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glows[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    {icons[i]}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed font-light text-sm">
                  {feature.desc}
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center gap-1.5 text-xs text-cyan-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Native Rust Engine</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
