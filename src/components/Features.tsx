import { Check } from 'lucide-react'
import type { ComponentType } from 'react'
import { CHAPTERS, type ChapterKey } from '../content/chapters'
import { screenshots, type Crop, type Shot } from '../content/screenshots'
import { useLanguage } from '../i18n/LanguageContext'
import { AssistantMock } from './mocks/AssistantMock'
import { DesktopMock } from './mocks/DesktopMock'
import { FilesMock } from './mocks/FilesMock'
import { MeshMock } from './mocks/MeshMock'
import { TerminalMock } from './mocks/TerminalMock'
import { Reveal, SectionHeading } from './ui'

// 没有登记实机截图的章节，用代码绘制的界面示意图顶上
const MOCKS: Partial<Record<ChapterKey, ComponentType>> = {
  terminal: TerminalMock,
  files: FilesMock,
  desktop: DesktopMock,
  assistant: AssistantMock,
  network: MeshMock
}

function Screenshot({ shot, alt }: { shot: Shot & { crop?: Crop }; alt: string }) {
  const crop = shot.crop ?? { x: 0, y: 0, w: 1, h: 1 }
  const ratio = (crop.w * shot.width) / (crop.h * shot.height)
  return (
    <div
      className="relative mx-auto overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(2,6,23,0.9)]"
      // 高度上限 36rem，按比例反推宽度，竖长的取景框也不会撑得过高
      style={{ aspectRatio: ratio, width: `min(100%, ${36 * ratio}rem)` }}
    >
      <img
        src={shot.src}
        alt={alt}
        loading="lazy"
        width={shot.width}
        height={shot.height}
        className="absolute max-w-none"
        style={{
          width: `${100 / crop.w}%`,
          left: `${(-crop.x / crop.w) * 100}%`,
          top: `${(-crop.y / crop.h) * 100}%`
        }}
      />
    </div>
  )
}

export function Features() {
  const { t, lang } = useLanguage()

  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          desc={t.features.desc}
        />

        <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-40">
          {CHAPTERS.map(({ key, Icon }, index) => {
            const chapter = t.features.chapters[key]
            const shot = screenshots.chapters[key]?.[lang]
            const Mock = MOCKS[key]
            const flipped = index % 2 === 1
            return (
              <article key={key} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-5 ${flipped ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-2.5 text-sm font-medium text-sky-300">
                    <span className="flex size-8 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-400/10">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    {chapter.tag}
                  </div>
                  <h3 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-5 text-pretty text-base leading-relaxed text-slate-400">
                    {chapter.desc}
                  </p>
                  <ul className="mt-8 space-y-3.5">
                    {chapter.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[15px] leading-relaxed text-slate-300"
                      >
                        <Check
                          className="mt-[0.3em] size-4 shrink-0 text-sky-400"
                          strokeWidth={2.25}
                        />
                        <span className="text-pretty">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  delay={0.1}
                  className={`relative min-w-0 lg:col-span-7 ${flipped ? 'lg:order-1' : ''}`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(59,130,246,0.16),transparent)] blur-2xl"
                  />
                  {shot ? <Screenshot shot={shot} alt={chapter.title} /> : Mock ? <Mock /> : null}
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
