import { motion, useReducedMotion } from 'motion/react'
import {
  Layers,
  Cpu,
  Terminal,
  ShieldCheck,
  Zap,
  Box,
  Binary,
  Lock,
  ArrowRight
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Architecture() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()

  const icons = [
    <Layers className="w-5 h-5 text-cyan-400" />,
    <Terminal className="w-5 h-5 text-cyan-400" />,
    <Zap className="w-5 h-5 text-cyan-400" />,
    <ShieldCheck className="w-5 h-5 text-cyan-400" />
  ]

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[900px] h-[350px] bg-cyan-600/10 blur-[160px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {t.architecture.titleLevel1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              {t.architecture.titleLevel2}
            </span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg font-light max-w-3xl mx-auto">
            {t.architecture.desc}
          </p>
        </div>

        {/* 4 Architecture Pillars */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {t.architecture.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 flex items-center justify-center mb-6 border border-cyan-500/30 group-hover:scale-105 transition-transform">
                  {icons[i]}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">
                  {card.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed font-light text-sm mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-cyan-300 font-medium">{card.tech}</span>
                <span className="text-neutral-600">Pure Rust</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Native Rust vs Old Stack Pipeline Diagram */}
        <div className="p-8 rounded-3xl bg-[#111114] border border-white/10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 text-center">
            Evolution: Legacy Electron Stack vs WinSSH Pro Native Architecture
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Old stack */}
            <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 text-xs font-mono">
              <div className="text-red-400 font-bold mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Old WinSSH Stack (Legacy)</span>
              </div>
              <div className="space-y-2 text-neutral-400">
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  Electron / Chromium (Heavy DOM + V8 JIT + Renderer IPC)
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  xterm.js Canvas / WebGL (Browser composite layer latency)
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  Node.js runtime & ssh2 JS bindings (Garbage collection pauses)
                </div>
                <div className="p-2.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                  Result: ~420MB RAM, 60fps limit, 2.8s cold start
                </div>
              </div>
            </div>

            {/* New Native Rust stack */}
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs font-mono">
              <div className="text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>WinSSH Pro 3.0 (Native Rust)</span>
              </div>
              <div className="space-y-2 text-neutral-200">
                <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>GPUI & gpui-kit</span>
                  <span className="text-cyan-400">Metal / Vulkan Direct GPU</span>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>alacritty_terminal VT Core</span>
                  <span className="text-emerald-400">Sub-ms PTY latency</span>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>Tokio Async + russh</span>
                  <span className="text-purple-400">aws-lc-rs AES-NI</span>
                </div>
                <div className="p-2.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                  Result: ~42MB RAM, 120+ FPS, &lt;85ms cold start
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
