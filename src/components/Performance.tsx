import { Gauge } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import type { Platform } from '../lib/github'
import { OsIcon, Reveal, SectionHeading } from './ui'

const GPU_APIS: { platform: Platform; name: string; api: string }[] = [
  { platform: 'macos', name: 'macOS', api: 'Metal' },
  { platform: 'windows', name: 'Windows', api: 'DirectX' },
  { platform: 'linux', name: 'Linux', api: 'Vulkan' }
]

const STACK = ['Rust', 'GPUI', 'alacritty_terminal', 'russh', 'Tokio', 'SQLite']

const FRAMES = Array.from({ length: 120 }, (_, index) => index)

function FrameRow({ bright }: { bright?: boolean }) {
  return (
    <div className="flex h-full items-end gap-[2px] sm:gap-[3px]">
      {FRAMES.map((frame) => (
        <span
          key={frame}
          className={`flex-1 rounded-full ${frame % 10 === 0 ? 'h-full' : 'h-3/5'} ${
            bright ? 'bg-gradient-to-t from-sky-500 to-violet-400' : 'bg-white/[0.08]'
          }`}
        />
      ))}
    </div>
  )
}

export function Performance() {
  const { t } = useLanguage()

  return (
    <section id="performance" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(14,40,86,0.7),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.performance.eyebrow}
          title={t.performance.title}
          desc={t.performance.desc}
        />

        <Reveal delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 sm:p-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end">
              <div className="shrink-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-gradient-brand text-[7rem] font-semibold leading-none tracking-[-0.06em] sm:text-[9rem]">
                    120
                  </span>
                  <span className="font-mono text-xl font-medium text-slate-400">FPS</span>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center justify-between font-mono text-xs text-slate-500">
                  <span>0 ms</span>
                  <span className="text-slate-300">
                    {t.performance.second} · {t.performance.frames}
                  </span>
                  <span>1000 ms</span>
                </div>
                <div className="relative h-14 sm:h-16" aria-hidden>
                  <FrameRow />
                  <div className="absolute inset-0 animate-fill">
                    <FrameRow bright />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span className="inline-block h-3 w-[3px] rounded-full bg-sky-400" />
                  {t.performance.frame}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
              <h3 className="text-sm font-medium text-slate-300">{t.performance.gpuTitle}</h3>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {GPU_APIS.map((item) => (
                  <div
                    key={item.platform}
                    className="rounded-2xl border border-white/[0.06] bg-ink-900/60 p-4 sm:p-5"
                  >
                    <OsIcon platform={item.platform} className="size-5 text-slate-400" />
                    <div className="mt-6 text-lg font-semibold tracking-tight text-white sm:text-2xl">
                      {item.api}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
              <h3 className="text-sm font-medium text-slate-300">{t.performance.stackTitle}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {STACK.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto flex items-start gap-2.5 pt-8 text-sm leading-relaxed text-slate-400">
                <Gauge className="mt-0.5 size-4 shrink-0 text-sky-400" />
                {t.performance.fpsTip}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
