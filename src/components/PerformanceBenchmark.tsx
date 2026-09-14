import { motion, useReducedMotion } from 'motion/react'
import {
  Zap,
  Cpu,
  Clock,
  Gauge,
  Flame,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Layers
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function PerformanceBenchmark() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()

  return (
    <section id="benchmarks" className="py-24 px-4 sm:px-6 md:px-8 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[850px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium tracking-wide uppercase mb-4">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.benchmarks.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {t.benchmarks.titleLevel1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              {t.benchmarks.titleLevel2}
            </span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg font-light max-w-3xl mx-auto">
            {t.benchmarks.desc}
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {/* Stat 1: 120 FPS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">
              120+ <span className="text-cyan-400 text-xl font-mono">FPS</span>
            </div>
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2">
              8.3ms Frame Budget
            </div>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              Native GPU render pipeline eliminates frame drops during heavy terminal outputs.
            </p>
          </motion.div>

          {/* Stat 2: -89% Memory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">
              ~42 <span className="text-emerald-400 text-xl font-mono">MB</span>
            </div>
            <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mb-2">
              -89% Memory Usage
            </div>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              Pure Rust memory safety without Chromium rendering multi-process bloat.
            </p>
          </motion.div>

          {/* Stat 3: Startup Speed */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">
              &lt; 85 <span className="text-cyan-400 text-xl font-mono">ms</span>
            </div>
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2">
              Instant Cold Start
            </div>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              Opens instantly compared to 2.8s wait time for Electron runtime initialization.
            </p>
          </motion.div>

          {/* Stat 4: Stream Tailing */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/30">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">
              100k <span className="text-cyan-400 text-lg font-mono">lines/s</span>
            </div>
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2">
              Alacritty VT Core
            </div>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              Tail gigabytes of Kubernetes logs without window freezing or garbage collection spikes.
            </p>
          </motion.div>
        </div>

        {/* Why 8.3ms Frame Budget Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-indigo-950/40 border border-cyan-500/30 relative overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4" />
                <span>{t.benchmarks.whyFpsTitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                Strict 8.3ms Render Budget Per Frame
              </h3>
              <p className="text-neutral-300 text-sm font-light leading-relaxed">
                {t.benchmarks.whyFpsDesc}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs">
              <div className="text-center">
                <div className="text-[10px] text-neutral-500 uppercase">Legacy Electron</div>
                <div className="text-lg font-bold text-red-400">16.6 ~ 50ms</div>
                <div className="text-[10px] text-neutral-400">Frequent Drops</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-[10px] text-cyan-400 uppercase font-bold">WinSSH Pro (Rust)</div>
                <div className="text-lg font-bold text-emerald-400">&lt; 8.3ms</div>
                <div className="text-[10px] text-emerald-400">120 FPS Fluid</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Benchmark Comparison Table */}
        <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <th className="p-4 sm:p-5 font-semibold">{t.benchmarks.headers.metric}</th>
                  <th className="p-4 sm:p-5 font-bold text-cyan-400 bg-cyan-500/10 border-x border-cyan-500/20">
                    {t.benchmarks.headers.winsshPro}
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-neutral-400">
                    {t.benchmarks.headers.oldWinssh}
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-neutral-400">
                    {t.benchmarks.headers.traditional}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300 font-light">
                {t.benchmarks.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{row.metric}</span>
                    </td>
                    <td className="p-4 sm:p-5 bg-cyan-500/5 border-x border-cyan-500/15 font-mono text-cyan-300 font-semibold">
                      <div className="flex items-center justify-between gap-2">
                        <span>{row.pro}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                          {row.proBadge}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400 font-mono">{row.old}</td>
                    <td className="p-4 sm:p-5 text-neutral-500 font-mono">{row.trad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
