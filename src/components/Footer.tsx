import { useLanguage } from '../i18n/LanguageContext'
import { Github, Zap, Terminal, Heart } from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#08080a] backdrop-blur-lg pt-20 pb-12 px-4 sm:px-6 md:px-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="WinSSH Pro Logo" className="w-7 h-7 object-contain" />
            <div className="flex items-center gap-1.5 font-display">
              <span className="font-bold text-lg tracking-tight text-white">WinSSH</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded bg-cyan-400 text-black">
                PRO
              </span>
            </div>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
            {t.footer.desc}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Rust + GPUI 120 FPS Architecture</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 sm:gap-20">
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold mb-1">
              {t.footer.product}
            </h4>
            <a
              href="#showcase"
              className="text-neutral-400 text-xs hover:text-cyan-400 transition-colors"
            >
              {t.footer.demo}
            </a>
            <a
              href="#benchmarks"
              className="text-neutral-400 text-xs hover:text-cyan-400 transition-colors"
            >
              {t.footer.benchmarks}
            </a>
            <a
              href="#download"
              className="text-neutral-400 text-xs hover:text-cyan-400 transition-colors"
            >
              {t.footer.dl}
            </a>
            <a
              href="#changelog"
              className="text-neutral-400 text-xs hover:text-cyan-400 transition-colors"
            >
              {t.footer.changelog}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold mb-1">
              {t.footer.resources}
            </h4>
            <a
              href="https://github.com/lantongxue/winssh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 text-xs hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>{t.footer.github}</span>
            </a>
            <a
              href="https://github.com/lantongxue/winssh/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 text-xs hover:text-cyan-400 transition-colors"
            >
              {t.footer.community}
            </a>
            <a
              href="https://github.com/lantongxue/winssh#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 text-xs hover:text-cyan-400 transition-colors"
            >
              {t.footer.docs}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold mb-1">
              {t.footer.legal}
            </h4>
            <span className="text-neutral-500 text-xs">MIT License</span>
            <span className="text-neutral-500 text-xs">Open Source & Free</span>
            <span className="text-neutral-500 text-xs">Zero Telemetry</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
        <p>{t.footer.copyright.replace('{year}', year.toString())}</p>
        <div className="flex items-center gap-2 text-cyan-400">
          <span>{t.footer.slogan}</span>
        </div>
      </div>
    </footer>
  )
}
