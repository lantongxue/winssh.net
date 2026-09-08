import { motion } from 'motion/react'
import { Github, Star, Zap } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { LanguageToggle } from './LanguageToggle'
import { useEffect, useState } from 'react'

export function Navbar() {
  const { t } = useLanguage()
  const [stars, setStars] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch('/api/v1/repo')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch((e) => console.log('Error fetching stars', e))
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Brand Logo & Name */}
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="relative">
          <img src="/logo.png" alt="WinSSH Pro Logo" className="w-8 h-8 object-contain transition-transform group-hover:scale-105" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-black" />
        </div>
        <div className="flex items-center gap-1.5 font-display">
          <span className="font-bold text-xl tracking-tight text-white">WinSSH</span>
          <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-gradient-to-r from-blue-500 to-cyan-400 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)]">
            PRO
          </span>
        </div>
      </a>

      {/* Nav Navigation Links */}
      <div className="hidden lg:flex items-center gap-7 text-xs font-medium text-neutral-400">
        <a href="#showcase" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          {t.nav.showcase}
        </a>
        <a href="#benchmarks" className="hover:text-white transition-colors">
          {t.nav.performance}
        </a>
        <a href="#features" className="hover:text-white transition-colors">
          {t.nav.features}
        </a>
        <a href="#architecture" className="hover:text-white transition-colors">
          {t.nav.architecture}
        </a>
        <a href="#sync" className="hover:text-white transition-colors">
          {t.nav.sync}
        </a>
        <a href="#download" className="hover:text-white transition-colors">
          {t.nav.download}
        </a>
        <a href="#changelog" className="hover:text-white transition-colors">
          {t.nav.changelog}
        </a>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <a
          href="https://github.com/lantongxue/winssh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs rounded-full transition-all"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">GitHub</span>
          {stars !== null && (
            <div className="flex items-center gap-1 sm:ml-1 sm:pl-2 sm:border-l border-white/20 text-yellow-400">
              <Star className="w-3 h-3 fill-yellow-400" />
              <span>{stars}</span>
            </div>
          )}
        </a>
        <a
          href="#download"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
        >
          <span>{t.nav.download}</span>
        </a>
      </div>
    </motion.nav>
  )
}
