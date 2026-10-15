import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion
} from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export function ScrollToTop() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldShow = latest > 900
    setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev))
  })

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border border-white/10 bg-ink-900/80 text-slate-300 shadow-2xl backdrop-blur-xl transition-colors hover:border-white/20 hover:text-white"
          aria-label={t.footer.backToTop}
        >
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
