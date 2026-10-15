import { ArrowLeftRight, Copy, Laptop, Server, HardDrive, Monitor } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { AppWindow } from '../ui'

const COPY = {
  zh: {
    title: 'EasyTier · home-lab',
    status: '已入网 · 4 个节点',
    self: '本机',
    direct: '直连',
    relay: '中继',
    headers: ['节点', '虚拟 IP', '路径', '延迟', '丢包'],
    forward: '端口转发',
    conns: '2 个连接',
    copyCmd: '复制命令'
  },
  en: {
    title: 'EasyTier · home-lab',
    status: 'Joined · 4 peers',
    self: 'This device',
    direct: 'Direct',
    relay: 'Relay',
    headers: ['Peer', 'Virtual IP', 'Path', 'Latency', 'Loss'],
    forward: 'Port forwarding',
    conns: '2 connections',
    copyCmd: 'Copy command'
  }
}

interface Peer {
  id: string
  name?: string
  ip: string
  relay?: boolean
  latency: string
  loss: string
  x: number
  y: number
  Icon: LucideIcon
}

const PEERS: Peer[] = [
  {
    id: 'nas',
    name: 'nas-home',
    ip: '10.144.0.2',
    latency: '3 ms',
    loss: '0%',
    x: 52,
    y: 20,
    Icon: HardDrive
  },
  {
    id: 'office',
    name: 'office-ws',
    ip: '10.144.0.3',
    latency: '18 ms',
    loss: '0%',
    x: 84,
    y: 50,
    Icon: Monitor
  },
  {
    id: 'cloud',
    name: 'cloud-hk',
    ip: '10.144.0.4',
    relay: true,
    latency: '46 ms',
    loss: '0.2%',
    x: 52,
    y: 80,
    Icon: Server
  }
]

const SELF = { x: 16, y: 50 }

export function MeshMock() {
  const { lang } = useLanguage()
  const copy = COPY[lang]

  return (
    <AppWindow
      title={copy.title}
      toolbar={
        <span className="hidden items-center gap-1.5 text-[10.5px] text-emerald-300 sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {copy.status}
        </span>
      }
    >
      <div className="relative aspect-[2.6/1] border-b border-white/[0.06] bg-[radial-gradient(rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:16px_16px]">
        <svg
          aria-hidden
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {PEERS.map((peer) => (
            <line
              key={peer.id}
              x1={SELF.x}
              y1={SELF.y}
              x2={peer.x}
              y2={peer.y}
              stroke={peer.relay ? '#a78bfa' : '#38bdf8'}
              strokeOpacity={peer.relay ? 0.7 : 0.8}
              strokeWidth={1.5}
              strokeDasharray={peer.relay ? '4 5' : '3 37'}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className={peer.relay ? undefined : 'animate-flow'}
            />
          ))}
          {PEERS.filter((peer) => !peer.relay).map((peer) => (
            <line
              key={`${peer.id}-base`}
              x1={SELF.x}
              y1={SELF.y}
              x2={peer.x}
              y2={peer.y}
              stroke="#38bdf8"
              strokeOpacity={0.2}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${SELF.x}%`, top: `${SELF.y}%` }}
        >
          <span className="flex size-10 items-center justify-center rounded-xl border border-sky-400/40 bg-[#10243a] shadow-[0_0_30px_-4px_rgba(56,189,248,0.6)]">
            <Laptop className="size-5 text-sky-200" />
          </span>
          <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 text-center leading-tight">
            <span className="block whitespace-nowrap text-[10.5px] text-slate-200">
              {copy.self}
            </span>
            <span className="block font-mono text-[10px] text-slate-500">10.144.0.1</span>
          </span>
        </div>

        {PEERS.map((peer) => (
          <div
            key={peer.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${peer.x}%`, top: `${peer.y}%` }}
          >
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#17181b]/95 py-1.5 pl-1.5 pr-2.5 shadow-lg">
              <span
                className={`flex size-6 items-center justify-center rounded-md ${peer.relay ? 'bg-violet-500/15 text-violet-200' : 'bg-sky-500/15 text-sky-200'}`}
              >
                <peer.Icon className="size-3.5" />
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-[10.5px] text-slate-200">
                  {peer.name}
                </span>
                <span className="block whitespace-nowrap font-mono text-[9.5px] text-slate-500">
                  {peer.relay ? copy.relay : copy.direct} · {peer.latency}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <table className="w-full text-left text-[11px]">
        <thead className="text-slate-500">
          <tr>
            {copy.headers.map((header, index) => (
              <th key={header} className={`px-3 py-2 font-normal ${index > 2 ? 'text-right' : ''}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {PEERS.map((peer) => (
            <tr key={peer.id} className="border-t border-white/[0.05]">
              <td className="px-3 py-1.5">{peer.name}</td>
              <td className="px-3 py-1.5 font-mono text-slate-400">{peer.ip}</td>
              <td className="px-3 py-1.5">
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${peer.relay ? 'bg-violet-500/15 text-violet-200' : 'bg-sky-500/15 text-sky-200'}`}
                >
                  {peer.relay ? copy.relay : copy.direct}
                </span>
              </td>
              <td className="px-3 py-1.5 text-right font-mono tabular-nums">{peer.latency}</td>
              <td className="px-3 py-1.5 text-right font-mono tabular-nums text-slate-400">
                {peer.loss}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-white/[0.06] bg-black/20 p-3">
        <div className="mb-2 text-[11px] font-medium text-slate-400">{copy.forward}</div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-[11px]">
          <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] text-emerald-200">
            -L
          </span>
          <span className="flex items-center gap-1.5 font-mono text-slate-200">
            127.0.0.1:3306
            <ArrowLeftRight className="size-3 text-slate-500" />
            10.0.0.12:3306
          </span>
          <span className="text-slate-500">MySQL</span>
          <span className="ml-auto font-mono text-slate-400">↑ 1.2 MB ↓ 8.4 MB · {copy.conns}</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Copy className="size-3" />
            {copy.copyCmd}
          </span>
        </div>
      </div>
    </AppWindow>
  )
}
