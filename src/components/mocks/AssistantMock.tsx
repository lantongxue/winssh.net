import { Bot, Check, ImagePlus, Play, Send, Sparkles, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { AppWindow } from '../ui'

const COPY = {
  zh: {
    title: 'AI 助手 · prod-web-01',
    ask: '磁盘快满了，帮我看看是什么占的空间',
    step1: '先看一下根分区的使用情况。',
    step2: '根分区已用 96%。接着按目录统计 /var 下的占用：',
    ran: '已执行',
    approve: '执行',
    reject: '拒绝',
    waiting: '等待你确认',
    placeholder: '描述你要做的事，或粘贴截图…'
  },
  en: {
    title: 'AI assistant · prod-web-01',
    ask: 'The disk is almost full. What’s taking up the space?',
    step1: 'Let me check usage on the root filesystem first.',
    step2: 'Root is 96% full. Next, sizing the directories under /var:',
    ran: 'Ran',
    approve: 'Run',
    reject: 'Reject',
    waiting: 'Waiting for approval',
    placeholder: 'Describe a task, or paste a screenshot…'
  }
}

export function AssistantMock() {
  const { lang } = useLanguage()
  const copy = COPY[lang]

  return (
    <AppWindow
      title={copy.title}
      toolbar={
        <span className="hidden items-center gap-1.5 rounded-md border border-white/[0.08] px-2 py-0.5 text-[10.5px] text-slate-400 sm:flex">
          <Sparkles className="size-3 text-violet-300" />
          DeepSeek
        </span>
      }
    >
      <div className="space-y-4 p-4 text-[12.5px] leading-relaxed">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-blue-600/90 px-3.5 py-2 text-white">
            {copy.ask}
          </div>
        </div>

        <div className="flex gap-2.5">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500">
            <Bot className="size-3.5 text-white" />
          </span>
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-slate-200">{copy.step1}</p>

            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black/30">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-1.5 font-mono text-[11px]">
                <span className="text-slate-200">
                  <span className="text-slate-500">$ </span>df -h /
                </span>
                <span className="flex items-center gap-1 font-sans text-emerald-300">
                  <Check className="size-3" />
                  {copy.ran}
                </span>
              </div>
              <pre className="overflow-hidden px-3 py-2 font-mono text-[10.5px] leading-snug text-slate-400">
                {`Filesystem  Size  Used Avail Use% Mounted on
/dev/vda1    49G   47G  2.1G  96% /`}
              </pre>
            </div>

            <p className="text-slate-200">{copy.step2}</p>

            <div className="overflow-hidden rounded-lg border border-sky-400/40 bg-sky-400/[0.06] shadow-[0_0_0_4px_rgba(56,189,248,0.06)]">
              <div className="border-b border-sky-400/20 px-3 py-2 font-mono text-[11px] text-slate-100">
                <span className="text-slate-500">$ </span>du -xh /var --max-depth=1 | sort -rh |
                head -5
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 text-[11px]">
                <span className="text-sky-200/80">{copy.waiting}</span>
                <span className="flex gap-1.5">
                  <span className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-400">
                    <X className="size-3" />
                    {copy.reject}
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-sky-500 px-2.5 py-1 font-medium text-white">
                    <Play className="size-3 fill-current" />
                    {copy.approve}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] p-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-[12px] text-slate-500">
          <span className="flex-1 truncate">{copy.placeholder}</span>
          <ImagePlus className="size-4" />
          <span className="flex size-6 items-center justify-center rounded-md bg-white/[0.08] text-slate-300">
            <Send className="size-3.5" />
          </span>
        </div>
      </div>
    </AppWindow>
  )
}
