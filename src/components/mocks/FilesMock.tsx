import { useInView, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Check,
  File,
  FileCode,
  Folder,
  FolderSync,
  HardDrive,
  Pause,
  Server,
  X
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { AppWindow } from '../ui'

interface Entry {
  name: string
  dir?: boolean
  code?: boolean
  meta: string
}

const LOCAL: Entry[] = [
  { name: 'assets', dir: true, meta: '—' },
  { name: 'index.html', code: true, meta: '4.2 KB' },
  { name: 'favicon.ico', meta: '15 KB' },
  { name: 'robots.txt', meta: '68 B' },
  { name: 'sitemap.xml', code: true, meta: '1.3 KB' }
]

const REMOTE: Entry[] = [
  { name: '..', dir: true, meta: '' },
  { name: 'assets', dir: true, meta: 'drwxr-xr-x' },
  { name: 'index.html', code: true, meta: '-rw-r--r--' },
  { name: '50x.html', code: true, meta: '-rw-r--r--' },
  { name: 'robots.txt', meta: '-rw-r--r--' }
]

const COPY = {
  zh: {
    title: 'prod-web-01 — SFTP',
    follow: '跟随终端目录',
    local: '本地',
    remote: '远程',
    queue: '传输队列',
    files: '文件',
    done: '已完成'
  },
  en: {
    title: 'prod-web-01 — SFTP',
    follow: 'Follow terminal cwd',
    local: 'Local',
    remote: 'Remote',
    queue: 'Transfers',
    files: 'files',
    done: 'Done'
  }
}

function Pane({
  icon,
  label,
  path,
  entries,
  selected,
  dropTarget
}: {
  icon: ReactNode
  label: string
  path: string
  entries: Entry[]
  selected?: string
  dropTarget?: boolean
}) {
  return (
    <div
      className={`min-w-0 ${dropTarget ? 'bg-sky-400/[0.04] ring-1 ring-inset ring-sky-400/30' : ''}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2 text-[11px]">
        {icon}
        <span className="text-slate-300">{label}</span>
        <span className="truncate font-mono text-slate-500">{path}</span>
      </div>
      <ul className="py-1 text-[11.5px]">
        {entries.map((entry) => (
          <li
            key={entry.name}
            className={`flex items-center gap-2 px-3 py-[5px] ${entry.name === selected ? 'bg-sky-500/15 text-white' : 'text-slate-300'}`}
          >
            {entry.dir ? (
              <Folder className="size-3.5 shrink-0 text-amber-300/80" />
            ) : entry.code ? (
              <FileCode className="size-3.5 shrink-0 text-sky-300/70" />
            ) : (
              <File className="size-3.5 shrink-0 text-slate-500" />
            )}
            <span className="min-w-0 flex-1 truncate">{entry.name}</span>
            <span className="shrink-0 font-mono text-[10.5px] text-slate-500">{entry.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FilesMock() {
  const { lang } = useLanguage()
  const copy = COPY[lang]
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [progress, setProgress] = useState(18)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const id = window.setInterval(() => setProgress((value) => (value >= 48 ? 18 : value + 1)), 160)
    return () => window.clearInterval(id)
  }, [inView, reduceMotion])

  return (
    <div ref={ref}>
      <AppWindow title={copy.title}>
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2 text-[11px]">
          <span className="flex items-center gap-1.5 rounded-md border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-sky-200">
            <FolderSync className="size-3.5" />
            {copy.follow}
            <Check className="size-3" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-md border border-white/[0.06] bg-black/20 px-2 py-1 font-mono text-slate-400">
            /var/www/html
          </span>
        </div>

        <div className="relative grid grid-cols-2 divide-x divide-white/[0.06]">
          <Pane
            icon={<HardDrive className="size-3.5 text-slate-500" />}
            label={copy.local}
            path="~/site/dist"
            entries={LOCAL}
            selected="assets"
          />
          <Pane
            icon={<Server className="size-3.5 text-emerald-400" />}
            label={copy.remote}
            path="/var/www/html"
            entries={REMOTE}
            dropTarget
          />
          <div
            aria-hidden
            className="absolute left-[calc(50%+1.75rem)] top-[38px] flex items-center gap-1.5 rounded-md border border-sky-400/40 bg-[#1b2433] px-2 py-1 text-[11px] text-sky-100 shadow-xl"
          >
            <Folder className="size-3.5 text-amber-300/80" />
            assets
            <ArrowRight className="size-3 text-sky-300" />
          </div>
        </div>

        <div className="border-t border-white/[0.06] bg-black/20 px-3 py-2.5">
          <div className="mb-2 text-[11px] font-medium text-slate-400">{copy.queue}</div>
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center gap-2.5">
              <Folder className="size-3.5 shrink-0 text-amber-300/80" />
              <span className="w-24 shrink-0 truncate text-slate-200">assets/</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-500 transition-[width] duration-150"
                  style={{ width: `${(progress / 48) * 100}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-right font-mono text-slate-500">
                {progress} / 48 {copy.files}
              </span>
              <Pause className="size-3.5 text-slate-500" />
              <X className="size-3.5 text-slate-500" />
            </div>
            <div className="flex items-center gap-2.5">
              <FileCode className="size-3.5 shrink-0 text-sky-300/70" />
              <span className="w-24 shrink-0 truncate text-slate-200">index.html</span>
              <div className="h-1 flex-1 rounded-full bg-emerald-400/60" />
              <span className="flex w-24 shrink-0 items-center justify-end gap-1 text-emerald-300">
                <Check className="size-3" />
                {copy.done}
              </span>
              <span className="size-3.5" />
              <span className="size-3.5" />
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  )
}
