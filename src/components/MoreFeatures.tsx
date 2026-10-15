import {
  ArchiveRestore,
  Braces,
  Command,
  Fingerprint,
  KeyRound,
  Languages,
  PanelTop,
  Server,
  Vault,
  type LucideIcon
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal, SectionHeading } from './ui'

const ICONS: Record<string, LucideIcon> = {
  vault: Vault,
  key: KeyRound,
  backup: ArchiveRestore,
  fingerprint: Fingerprint,
  command: Command,
  snippet: Braces,
  hosts: Server,
  tray: PanelTop,
  language: Languages
}

export function MoreFeatures() {
  const { t } = useLanguage()

  return (
    <section id="details" className="relative pb-28 sm:pb-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.more.eyebrow} title={t.more.title} />
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {t.more.items.map((item, index) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.icon} delay={(index % 3) * 0.05} className="bg-ink-950">
                <div className="group h-full bg-white/[0.015] p-7 transition-colors hover:bg-white/[0.035] sm:p-8">
                  <Icon
                    className="size-5 text-sky-400 transition-colors group-hover:text-sky-300"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-6 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
