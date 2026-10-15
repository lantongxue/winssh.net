import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, type Dict } from './translations'

export type Language = 'zh' | 'en'

const STORAGE_KEY = 'winssh.lang'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function initialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'zh' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(initialLanguage)
  const t = translations[lang]

  const setLang = (next: Language) => {
    localStorage.setItem(STORAGE_KEY, next)
    setLangState(next)
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
