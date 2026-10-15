import { useInView, useReducedMotion } from 'motion/react'
import { Columns2, Rows2, Search } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SCHEMES, type Scheme } from '../../content/schemes'
import { useLanguage } from '../../i18n/LanguageContext'
import { AppWindow } from '../ui'

/** 一段带颜色的文字：第二项是 ANSI 色号，缺省为前景色 */
type Seg = [string, number?]
type Line = Seg[]

const prompt = (cmd: string): Line => [
  ['deploy@prod-web-01', 2],
  [':'],
  ['~/app', 4],
  ['$ '],
  [cmd]
]

const LEFT: Line[] = [
  prompt('git log --oneline -4'),
  [
    ['a1c9e3f', 3],
    [' ('],
    ['HEAD -> ', 6],
    ['main', 2],
    [', '],
    ['origin/main', 1],
    [') fix: cache key per locale']
  ],
  [['7d2b0c4', 3], [' feat: add /healthz endpoint']],
  [['5e81a90', 3], [' perf: stream large responses']],
  [['c03f7d2', 3], [' chore: bump dependencies']],
  prompt('ls'),
  [
    ['Dockerfile  '],
    ['dist/', 12],
    ['  '],
    ['node_modules/', 12],
    ['  package.json  '],
    ['src/', 12]
  ],
  prompt('systemctl status nginx | head -3'),
  [['●', 10], [' nginx.service - A high performance web server']],
  [['   Loaded: loaded (/lib/systemd/system/nginx.service; '], ['enabled', 10], [')']],
  [['   Active: '], ['active (running)', 10], [' since Thu 2026-10-15 09:14 CST']]
]

const PATHS = [
  '/api/orders',
  '/api/health',
  '/static/app.js',
  '/api/users/me',
  '/login',
  '/api/search?q=rust',
  '/favicon.ico'
]
const METHODS = ['GET', 'GET', 'GET', 'POST', 'GET', 'PUT']
const STATUSES: [number, number][] = [
  [200, 2],
  [200, 2],
  [200, 2],
  [304, 6],
  [200, 2],
  [404, 3],
  [201, 2],
  [500, 1]
]

function logLine(n: number): Line {
  const seconds = 11 + n
  const time = `14:${String(2 + (Math.floor(seconds / 60) % 58)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  const [status, color] = STATUSES[(n * 5 + 3) % STATUSES.length]
  const method = METHODS[(n * 7) % METHODS.length]
  const path = PATHS[(n * 3 + 1) % PATHS.length]
  const ms = 2 + ((n * 37) % 90)
  return [
    [time + ' ', 8],
    [method.padEnd(5), 6],
    [path.padEnd(19).slice(0, 19)],
    [' '],
    [String(status), color],
    [` ${ms}ms`, 8]
  ]
}

function TermLine({
  line,
  scheme,
  children
}: {
  line: Line
  scheme: Scheme
  children?: ReactNode
}) {
  return (
    <div className="whitespace-pre">
      {line.map(([text, color], index) => (
        <span key={index} style={color === undefined ? undefined : { color: scheme.ansi[color] }}>
          {text}
        </span>
      ))}
      {children}
    </div>
  )
}

function Cursor({ scheme }: { scheme: Scheme }) {
  return (
    <span
      className="inline-block h-[1.15em] w-[0.6em] translate-y-[0.2em] animate-blink"
      style={{ background: scheme.cursor ?? scheme.foreground }}
    />
  )
}

export function TerminalMock() {
  const { t, lang } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [scheme, setScheme] = useState<Scheme>(SCHEMES[4])
  const [tick, setTick] = useState(24)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })

  useEffect(() => {
    if (!inView || reduceMotion) return
    const id = window.setInterval(() => setTick((value) => value + 1), 420)
    return () => window.clearInterval(id)
  }, [inView, reduceMotion])

  const logs = Array.from({ length: 13 }, (_, index) => logLine(tick - 12 + index))
  const divider = `${scheme.foreground}22`

  return (
    <div ref={ref}>
      <AppWindow
        title={
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1 text-slate-200">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              prod-web-01
            </span>
            <span className="px-2.5 py-1">{lang === 'zh' ? '本地 · zsh' : 'Local · zsh'}</span>
          </div>
        }
        toolbar={
          <div className="hidden items-center gap-2.5 text-slate-500 sm:flex" aria-hidden>
            <Search className="size-3.5" />
            <Rows2 className="size-3.5" />
            <Columns2 className="size-3.5 text-sky-400" />
          </div>
        }
      >
        <div
          className="grid h-[19rem] grid-cols-1 font-mono text-[11px] leading-[1.65] transition-colors duration-300 sm:h-[20rem] sm:grid-cols-2 sm:text-[11.5px]"
          style={{ background: scheme.background, color: scheme.foreground }}
        >
          <div className="overflow-hidden p-3.5">
            {LEFT.map((line, index) => (
              <TermLine key={index} line={line} scheme={scheme} />
            ))}
            <TermLine line={prompt('')} scheme={scheme}>
              <Cursor scheme={scheme} />
            </TermLine>
          </div>
          <div
            className="hidden flex-col overflow-hidden border-l p-3.5 sm:flex"
            style={{ borderColor: divider }}
          >
            <TermLine line={prompt('tail -f logs/access.log')} scheme={scheme} />
            <div className="mt-auto">
              {logs.map((line, index) => (
                <TermLine key={tick - 12 + index} line={line} scheme={scheme} />
              ))}
            </div>
          </div>
        </div>
      </AppWindow>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4 text-xs">
          <span className="font-medium text-slate-300">{t.features.schemeLabel}</span>
          <span className="text-slate-500">{t.features.schemeHint}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SCHEMES.map((item) => {
            const active = item.id === scheme.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setScheme(item)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-lg border py-1.5 pl-1.5 pr-2.5 text-xs transition-colors ${
                  active
                    ? 'border-sky-400/50 bg-sky-400/10 text-white'
                    : 'border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-white/15 hover:text-slate-200'
                }`}
              >
                <span
                  aria-hidden
                  className="flex size-5 items-center justify-center gap-[2px] rounded ring-1 ring-white/10"
                  style={{ background: item.background }}
                >
                  {[1, 2, 4].map((color) => (
                    <span
                      key={color}
                      className="size-[3px] rounded-full"
                      style={{ background: item.ansi[color] }}
                    />
                  ))}
                </span>
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
