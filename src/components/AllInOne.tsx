import {
  Cable,
  Cloud,
  FolderSync,
  FolderUp,
  Globe,
  Monitor,
  Router,
  ScreenShare,
  Terminal,
  Waypoints,
  type LucideIcon
} from 'lucide-react'
import { useState } from 'react'
import icon from '../assets/brand/icon-256.webp'
import { useLanguage } from '../i18n/LanguageContext'
import type { Dict } from '../i18n/translations'
import { Reveal, SectionHeading } from './ui'

type GroupKey = 'shell' | 'files' | 'desktop' | 'network'
type ProtocolKey = keyof Dict['protocols']

const GROUP_COLOR: Record<GroupKey, { dot: string; text: string; stroke: string }> = {
  shell: { dot: 'bg-sky-400', text: 'text-sky-300', stroke: '#38bdf8' },
  files: { dot: 'bg-blue-400', text: 'text-blue-300', stroke: '#60a5fa' },
  desktop: { dot: 'bg-violet-400', text: 'text-violet-300', stroke: '#a78bfa' },
  network: { dot: 'bg-fuchsia-400', text: 'text-fuchsia-300', stroke: '#e879f9' }
}

// 标题写的是「十种连接」，环上只放应用里的十种主机类型；本地终端与 WSL 只在分组卡片里出现
const NODES: { key: ProtocolKey; group: GroupKey; Icon: LucideIcon }[] = [
  { key: 'ssh', group: 'shell', Icon: Terminal },
  { key: 'telnet', group: 'shell', Icon: Router },
  { key: 'serial', group: 'shell', Icon: Cable },
  { key: 'sftp', group: 'files', Icon: FolderSync },
  { key: 'ftp', group: 'files', Icon: FolderUp },
  { key: 'webdav', group: 'files', Icon: Globe },
  { key: 's3', group: 'files', Icon: Cloud },
  { key: 'rdp', group: 'desktop', Icon: Monitor },
  { key: 'vnc', group: 'desktop', Icon: ScreenShare },
  { key: 'easytier', group: 'network', Icon: Waypoints }
]

const RX = 43
const RY = 40

function nodePosition(index: number) {
  const angle = (index / NODES.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / NODES.length
  return { x: 50 + RX * Math.cos(angle), y: 50 + RY * Math.sin(angle) }
}

export function AllInOne() {
  const { t } = useLanguage()
  const [active, setActive] = useState<GroupKey | null>(null)

  const dimmed = (group: GroupKey) => active !== null && active !== group

  return (
    <section id="connections" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.allInOne.eyebrow}
          title={t.allInOne.title}
          desc={t.allInOne.desc}
        />

        <Reveal
          className="relative mx-auto mt-16 hidden aspect-[16/9] max-w-5xl md:block"
          delay={0.1}
        >
          <svg
            aria-hidden
            className="absolute inset-0 size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {NODES.map((node, index) => {
              const { x, y } = nodePosition(index)
              const color = GROUP_COLOR[node.group].stroke
              return (
                <g
                  key={node.key}
                  className={`transition-opacity duration-300 ${dimmed(node.group) ? 'opacity-15' : 'opacity-100'}`}
                >
                  <line
                    x1={x}
                    y1={y}
                    x2={50}
                    y2={50}
                    stroke={color}
                    strokeOpacity={0.14}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1={x}
                    y1={y}
                    x2={50}
                    y2={50}
                    stroke={color}
                    strokeOpacity={0.85}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeDasharray="3 37"
                    vectorEffect="non-scaling-stroke"
                    className="animate-flow"
                    style={{ animationDelay: `${-index * 0.37}s` }}
                  />
                </g>
              )
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              aria-hidden
              className="absolute -inset-16 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),transparent)]"
            />
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.2rem] border border-sky-400/15"
            />
            <div
              aria-hidden
              className="absolute -inset-12 rounded-[3rem] border border-violet-400/10"
            />
            <img
              src={icon}
              alt="WinSSH Pro"
              width={112}
              height={112}
              className="relative size-28 rounded-[1.6rem] shadow-[0_20px_60px_-10px_rgba(59,130,246,0.6)]"
            />
          </div>

          {NODES.map((node, index) => {
            const { x, y } = nodePosition(index)
            const color = GROUP_COLOR[node.group]
            return (
              <div
                key={node.key}
                onMouseEnter={() => setActive(node.group)}
                onMouseLeave={() => setActive(null)}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-ink-900/90 py-2 pl-2.5 pr-3.5 text-sm text-slate-200 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur transition-opacity duration-300 ${dimmed(node.group) ? 'opacity-30' : 'opacity-100'}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <node.Icon className={`size-4 ${color.text}`} strokeWidth={1.75} />
                {t.protocols[node.key]}
              </div>
            )
          })}
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {t.allInOne.groups.map((group, index) => {
            const key = group.key as GroupKey
            return (
              <Reveal key={group.key} delay={index * 0.06}>
                <div
                  onMouseEnter={() => setActive(key)}
                  onMouseLeave={() => setActive(null)}
                  className={`h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-[border-color,background-color,opacity] duration-300 hover:border-white/15 hover:bg-white/[0.04] ${dimmed(key) ? 'lg:opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`size-2 rounded-full ${GROUP_COLOR[key].dot}`} />
                    <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{group.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
