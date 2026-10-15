import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import type { Platform } from '../lib/github'

export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-sky-400/90">
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'center'
}: {
  eyebrow: string
  title: string | string[]
  desc?: string
  align?: 'center' | 'left'
}) {
  const lines = Array.isArray(title) ? title : [title]
  const centered = align === 'center'
  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
        {lines.map((line, index) => (
          <span
            key={line}
            className={
              index === lines.length - 1 && lines.length > 1 ? 'block text-gradient-brand' : 'block'
            }
          >
            {line}
          </span>
        ))}
      </h2>
      {desc && (
        <p
          className={`mt-6 text-base leading-relaxed text-slate-400 sm:text-lg ${centered ? 'mx-auto max-w-2xl text-balance' : 'text-pretty'}`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  )
}

const OS_ICON: Record<Platform, string> = {
  windows: '/icons/os/windows.svg',
  macos: '/icons/os/macos.svg',
  linux: '/icons/os/linux.svg'
}

/** 用 mask 渲染单色系统图标，颜色跟随 currentColor */
export function OsIcon({
  platform,
  className = 'size-5'
}: {
  platform: Platform
  className?: string
}) {
  const url = `url(${OS_ICON[platform]})`
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center'
      }}
    />
  )
}

/** 应用窗口外框：给代码绘制的界面示意图套上一致的窗口质感 */
export function AppWindow({
  title,
  children,
  className = '',
  toolbar
}: {
  title?: ReactNode
  children: ReactNode
  className?: string
  toolbar?: ReactNode
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#111214] shadow-[0_30px_80px_-20px_rgba(2,6,23,0.9),0_0_0_1px_rgba(255,255,255,0.02)] ${className}`}
    >
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.06] bg-[#17181b] px-3.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        {title && <div className="min-w-0 flex-1 truncate text-[11px] text-slate-400">{title}</div>}
        {toolbar}
      </div>
      {children}
    </div>
  )
}
