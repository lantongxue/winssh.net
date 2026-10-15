import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll
} from 'motion/react'
import { Github, Menu, Star, X } from 'lucide-react'
import { useState } from 'react'
import icon from '../assets/brand/icon-256.webp'
import { useLanguage } from '../i18n/LanguageContext'
import { REPO_URL, useStars } from '../lib/github'
import { LanguageToggle } from './LanguageToggle'

export function Navbar() {
  const { t } = useLanguage()
  const stars = useStars()
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const past = latest > 24
    setScrolled((prev) => (prev !== past ? past : prev))
  })

  const links = [
    { href: '#connections', label: t.nav.connections },
    { href: '#performance', label: t.nav.performance },
    { href: '#features', label: t.nav.features },
    { href: '#download', label: t.nav.download },
    { href: '#changelog', label: t.nav.changelog }
  ]

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={icon} alt="" width={28} height={28} className="size-7 rounded-[7px]" />
          <span className="text-[15px] font-semibold tracking-tight text-white">WinSSH Pro</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-slate-400 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] sm:flex"
          >
            <Github className="size-3.5" />
            <span>{t.nav.github}</span>
            {stars.status === 'ready' && (
              <span className="flex items-center gap-1 border-l border-white/10 pl-2 text-slate-300">
                <Star className="size-3 fill-amber-300 text-amber-300" />
                {stars.data.toLocaleString()}
              </span>
            )}
          </a>
          <a
            href="#download"
            className="hidden h-8 items-center rounded-full bg-white px-4 text-xs font-semibold text-ink-950 transition-colors hover:bg-sky-100 sm:flex"
          >
            {t.nav.downloadCta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={t.nav.menu}
            className="flex size-9 items-center justify-center rounded-full text-slate-300 hover:bg-white/[0.06] lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] lg:hidden"
          >
            <div className="flex flex-col px-5 py-3 sm:px-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-slate-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 text-base text-slate-300 hover:text-white"
              >
                <Github className="size-4" />
                {t.nav.github}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
