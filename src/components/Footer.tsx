import { Github } from 'lucide-react'
import icon from '../assets/brand/icon-256.webp'
import { fmt } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import { ISSUES_URL, RELEASES_URL, REPO_URL } from '../lib/github'

export function Footer() {
  const { t, lang } = useLanguage()

  const groups = [
    {
      title: t.footer.product,
      links: [
        { label: t.nav.connections, href: '#connections' },
        { label: t.nav.performance, href: '#performance' },
        { label: t.nav.features, href: '#features' },
        { label: t.nav.download, href: '#download' },
        { label: t.nav.changelog, href: '#changelog' }
      ]
    },
    {
      title: t.footer.community,
      links: [
        { label: t.footer.repo, href: REPO_URL, external: true },
        { label: t.footer.releases, href: RELEASES_URL, external: true },
        { label: t.footer.issues, href: ISSUES_URL, external: true }
      ]
    }
  ]

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-5 pb-10 pt-20 sm:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <a href="#top" className="flex items-center gap-3">
              <img src={icon} alt="" width={36} height={36} className="size-9 rounded-[9px]" />
              <span className="text-lg font-semibold tracking-tight text-white">WinSSH Pro</span>
            </a>
            <p
              className={
                lang === 'zh'
                  ? 'mt-6 font-wordmark text-3xl font-black tracking-[0.12em] text-gradient-ceramic'
                  : 'mt-6 text-2xl font-semibold tracking-tight text-gradient-ceramic'
              }
            >
              {t.footer.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">{t.footer.desc}</p>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-slate-300">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...('external' in link
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-sm text-slate-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-slate-600 sm:flex-row sm:items-center">
          <p>{fmt(t.footer.copyright, { year: new Date().getFullYear() })}</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-500 transition-colors hover:text-white"
          >
            <Github className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
