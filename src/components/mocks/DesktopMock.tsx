import {
  ClipboardCheck,
  Expand,
  Keyboard,
  Maximize,
  Monitor,
  ScreenShare,
  SquareTerminal
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { AppWindow } from '../ui'

const COPY = {
  zh: {
    session: 'RDP · 1920×1080 · 32 位色',
    fit: '适应窗口',
    clipboard: '已同步剪贴板 · 2 个文件',
    window: '构建日志 — PowerShell'
  },
  en: {
    session: 'RDP · 1920×1080 · 32-bit',
    fit: 'Fit window',
    clipboard: 'Clipboard synced · 2 files',
    window: 'Build log — PowerShell'
  }
}

const BUILD_LOG = [
  ['PS C:\\build> ', 'msbuild App.sln /p:Configuration=Release'],
  ['', '  Restoring packages for App.csproj...'],
  ['', '  App -> C:\\build\\bin\\Release\\App.dll'],
  ['', '  Tests: 248 passed, 0 failed'],
  ['', 'Build succeeded.'],
  ['PS C:\\build> ', '']
]

export function DesktopMock() {
  const { lang } = useLanguage()
  const copy = COPY[lang]

  return (
    <AppWindow
      title={
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1.5 px-2.5 py-1">
            <SquareTerminal className="size-3" />
            prod-web-01
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1 text-slate-200">
            <Monitor className="size-3 text-violet-300" />
            win-build-02
          </span>
          <span className="hidden items-center gap-1.5 px-2.5 py-1 sm:flex">
            <ScreenShare className="size-3" />
            lab-vnc
          </span>
        </div>
      }
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-3 py-1.5 text-[11px] text-slate-400">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {copy.session}
          <span className="hidden font-mono text-slate-500 sm:inline">· 12 ms</span>
        </span>
        <span className="flex items-center gap-1" aria-hidden>
          <span className="flex items-center gap-1 rounded bg-white/[0.06] px-1.5 py-0.5 text-slate-200">
            <Expand className="size-3" />
            {copy.fit}
          </span>
          <span className="rounded px-1.5 py-0.5 font-mono">1:1</span>
          <Maximize className="mx-1 size-3" />
          <span className="flex items-center gap-1 rounded px-1.5 py-0.5">
            <Keyboard className="size-3" />
            Ctrl+Alt+Del
          </span>
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(120%_90%_at_20%_10%,#1e3a8a_0%,#312e81_38%,#0f172a_75%)]">
        <div
          aria-hidden
          className="absolute -right-16 -top-10 size-72 rounded-full bg-sky-400/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 left-10 size-72 rounded-full bg-fuchsia-500/20 blur-3xl"
        />

        <div className="absolute left-[7%] top-[9%] w-[64%] overflow-hidden rounded-md border border-white/15 bg-[#0c1a33]/95 shadow-2xl">
          <div className="flex items-center justify-between bg-white/[0.06] px-2.5 py-1 text-[10px] text-slate-300">
            <span>{copy.window}</span>
            <span className="tracking-[0.3em] text-slate-500">—▢✕</span>
          </div>
          <div className="space-y-0.5 p-2.5 font-mono text-[9.5px] leading-snug text-slate-200 sm:text-[10.5px]">
            {BUILD_LOG.map(([promptText, text], index) => (
              <div key={index} className="whitespace-pre">
                <span className="text-sky-300">{promptText}</span>
                <span className={text === 'Build succeeded.' ? 'text-emerald-300' : ''}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-[5%] top-[44%] flex items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-[11px] text-white shadow-xl backdrop-blur-md">
          <ClipboardCheck className="size-4 text-emerald-300" />
          {copy.clipboard}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-[9%] items-center justify-center gap-1.5 border-t border-white/10 bg-black/45 backdrop-blur-md">
          {[
            'bg-sky-400/80',
            'bg-amber-300/80',
            'bg-emerald-400/80',
            'bg-violet-400/80',
            'bg-slate-300/70'
          ].map((color) => (
            <span key={color} className={`size-3 rounded-[3px] sm:size-3.5 ${color}`} />
          ))}
          <span className="absolute right-3 font-mono text-[10px] text-slate-200">14:02</span>
        </div>
      </div>
    </AppWindow>
  )
}
