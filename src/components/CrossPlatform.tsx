import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Cloud, HardDrive, Laptop, Lock, ShieldCheck, Terminal, Monitor, Apple } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function CrossPlatform() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const { t } = useLanguage()
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section id="sync" ref={containerRef} className="py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[1000px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium tracking-wide uppercase mb-4">
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.sync.badge}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {t.sync.titleLevel1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {t.sync.titleLevel2}
              </span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed mb-8">
              {t.sync.desc}
            </p>

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-4 text-neutral-300 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Full Native Desktop Support</div>
                  <div className="text-neutral-400 text-xs font-light">{t.sync.desktop}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-300 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Private WebDAV Synchronization</div>
                  <div className="text-neutral-400 text-xs font-light">{t.sync.webdav}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-300 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Zero-Knowledge Client Encryption</div>
                  <div className="text-neutral-400 text-xs font-light">{t.sync.encrypted}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Sync Animation Graphic */}
        <motion.div
          style={{ scale, opacity }}
          className="flex-1 relative w-full max-w-[540px]"
        >
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-6 flex flex-col items-center justify-center backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* Simulated Desktop Nodes in Sync */}
            <div className="relative z-10 w-full flex items-center justify-between px-4">
              {/* Node 1: MacBook */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-neutral-200 shadow-xl mb-2">
                  <Apple className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-mono text-neutral-300">macOS M3/M4</span>
                <span className="text-[9px] font-mono text-cyan-400">ARM64 Native</span>
              </div>

              {/* Data Sync Line 1 */}
              <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/30 via-cyan-400 to-cyan-500/30 mx-2 relative overflow-hidden">
                <motion.div
                  animate={{ x: [-20, 120] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                  className="w-8 h-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                />
              </div>

              {/* Central Vault Core */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-cyan-400/40 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-2 relative">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-2 animate-ping" />
                  <Cloud className="w-8 h-8 text-cyan-300" />
                </div>
                <span className="text-[11px] font-mono text-white font-semibold">WebDAV Vault</span>
                <span className="text-[9px] font-mono text-neutral-400">E2E Encrypted</span>
              </div>

              {/* Data Sync Line 2 */}
              <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-500/30 via-purple-400 to-purple-500/30 mx-2 relative overflow-hidden">
                <motion.div
                  animate={{ x: [120, -20] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                  className="w-8 h-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]"
                />
              </div>

              {/* Node 2: Windows / Linux */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-neutral-200 shadow-xl mb-2">
                  <Monitor className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-mono text-neutral-300">Windows / Linux</span>
                <span className="text-[9px] font-mono text-emerald-400">x86_64 Direct GPU</span>
              </div>
            </div>

            {/* Security Guarantee Pill */}
            <div className="relative z-10 mt-8 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AES-256-GCM Zero-Knowledge Key Envelope</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
