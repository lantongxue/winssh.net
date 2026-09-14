import { motion, useReducedMotion } from 'motion/react'
import {
  Zap,
  Sparkles,
  Activity,
  FolderSync,
  ShieldCheck,
  Network,
  Cpu,
  Terminal,
  Lock,
  ArrowRight
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Features() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const items = t.features.items

  return (
    <section id="features" className="py-24 px-4 sm:px-6 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Eyebrow removed per taste skill restraint rule) */}
        <div className="text-center mb-16">
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            {t.features.titleLevel1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              {t.features.titleLevel2}
            </span>
          </motion.h2>
          <p className="text-neutral-400 text-base md:text-lg font-light max-w-2xl mx-auto mt-4">
            {t.features.desc}
          </p>
        </div>

        {/* Asymmetric Bento Grid (Strict cell count: exactly 6 items in 6 rhythmic slots) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Bento Cell 0 (Hero Tile - 120 FPS GPUI: 8 Columns) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 p-7 sm:p-9 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                  {items[0].tag}
                </span>
              </div>

              <h3 className="text-2xl font-display font-semibold mb-3 text-white">
                {items[0].title}
              </h3>
              <p className="text-neutral-400 leading-relaxed font-light text-sm max-w-2xl mb-8">
                {items[0].desc}
              </p>
            </div>

            {/* Visual Micro-Widget: Frame Budget Timeline */}
            <div className="relative z-10 p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-white font-semibold">8.33ms Budget</span>
                <span className="text-neutral-500">·</span>
                <span className="text-cyan-400 font-bold">120.0 FPS Target</span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Metal / DirectX 12 Direct Pipeline
              </div>
            </div>
          </motion.div>

          {/* Bento Cell 1 (DevOps AI Copilot: 4 Columns) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 p-7 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                  {items[1].tag}
                </span>
              </div>

              <h3 className="text-xl font-display font-semibold mb-3 text-white">
                {items[1].title}
              </h3>
              <p className="text-neutral-400 leading-relaxed font-light text-sm mb-6">
                {items[1].desc}
              </p>
            </div>

            {/* Visual Micro-Widget: Prompt Execution Pill */}
            <div className="relative z-10 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-cyan-300">
              <div className="flex items-center justify-between text-neutral-500 text-[10px] mb-1">
                <span>VERIFIED PROMPT</span>
                <span className="text-cyan-400">Ready</span>
              </div>
              <div className="truncate text-neutral-200">$ ps -eo pid,%cpu,cmd | head -n 5</div>
            </div>
          </motion.div>

          {/* Bento Cell 2 (Telemetry Hub: 4 Columns) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 p-7 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                  {items[2].tag}
                </span>
              </div>

              <h3 className="text-xl font-display font-semibold mb-3 text-white">
                {items[2].title}
              </h3>
              <p className="text-neutral-400 leading-relaxed font-light text-sm mb-6">
                {items[2].desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs flex items-center justify-between text-neutral-400">
              <span>CPU 3.4%</span>
              <span className="text-neutral-600">·</span>
              <span className="text-cyan-400 font-semibold">RAM 42MB</span>
              <span className="text-neutral-600">·</span>
              <span>NVMe 1.2GB/s</span>
            </div>
          </motion.div>

          {/* Bento Cell 3 (Bi-Directional SFTP: 4 Columns) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 p-7 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <FolderSync className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                  {items[3].tag}
                </span>
              </div>

              <h3 className="text-xl font-display font-semibold mb-3 text-white">
                {items[3].title}
              </h3>
              <p className="text-neutral-400 leading-relaxed font-light text-sm mb-6">
                {items[3].desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs flex items-center justify-between text-neutral-300">
              <span className="truncate max-w-[140px] text-neutral-400">cd /var/log</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-cyan-300 font-medium">Synced SFTP</span>
            </div>
          </motion.div>

          {/* Bento Cell 4 (Zero-Knowledge Vault: 4 Columns) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-4 p-7 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                  {items[4].tag}
                </span>
              </div>

              <h3 className="text-xl font-display font-semibold mb-3 text-white">
                {items[4].title}
              </h3>
              <p className="text-neutral-400 leading-relaxed font-light text-sm mb-6">
                {items[4].desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs flex items-center justify-between text-cyan-300">
              <span>AES-256-GCM</span>
              <span className="text-neutral-600">·</span>
              <span>Ed25519 Native</span>
              <span className="text-neutral-600">·</span>
              <span className="text-emerald-400 font-semibold">Local Vault</span>
            </div>
          </motion.div>

          {/* Bento Cell 5 (Snippets & Visual Tunnels: Full 12 Columns Landscape Bar) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-12 p-7 sm:p-8 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Network className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                  {items[5].tag}
                </span>
                <h3 className="text-xl font-display font-semibold text-white">
                  {items[5].title}
                </h3>
              </div>
              <p className="text-neutral-400 leading-relaxed font-light text-sm">
                {items[5].desc}
              </p>
            </div>

            {/* Visual Tunnel Pill Indicators */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-neutral-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Local :8080 &rarr; Remote :80</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-neutral-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-600" />
                <span>SOCKS5 Dynamic Proxy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
