import { useLanguage } from '../i18n/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      aria-label={t.nav.language}
      title={t.nav.language}
      className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-slate-500 transition-colors hover:bg-white/[0.06]"
    >
      <span className={lang === 'zh' ? 'text-white' : ''}>中</span>
      <span className="text-slate-700">/</span>
      <span className={lang === 'en' ? 'text-white' : ''}>EN</span>
    </button>
  )
}
