import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Server,
  Zap,
  Sparkles,
  Activity,
  FolderSync,
  Cpu,
  HardDrive,
  Network,
  Send,
  Play,
  Copy,
  Check,
  SplitSquareVertical,
  Maximize2,
  Minimize2,
  X,
  Bot,
  User,
  Clock,
  ShieldCheck,
  KeyRound,
  FileCode,
  Folder,
  ArrowUpDown,
  RefreshCw,
  Search,
  Sliders,
  Radio,
  ChevronRight,
  ChevronDown,
  Database,
  Plus,
  ChevronLeft,
  MoreVertical,
  Laptop,
  Layers,
  ArrowRight,
  FileText,
  Eye,
  SlidersHorizontal,
  Code,
  ExternalLink,
  Trash2,
  CheckCircle2,
  HelpCircle,
  FolderOpen,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  Home,
  FilePlus,
  FolderPlus,
  Columns2,
  Square,
  Rows2
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

type MonitorTabType = 'metrics' | 'processes' | 'diagnostics' | 'settings'

interface ProcessItem {
  pid: number
  user: string
  command: string
  cpu: string
  mem: string
}

interface TerminalLine {
  type: 'system' | 'connected' | 'banner' | 'prompt' | 'output'
  text: string
}

export function PrototypeShowcase() {
  const { t } = useLanguage()

  // Panels states (adaptive default based on screen width)
  const [isSftpOpen, setIsSftpOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )
  const [isMonitorOpen, setIsMonitorOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1280 : true
  )
  const [syncDirActive, setSyncDirActive] = useState(false)
  const [activeTab, setActiveTab] = useState<'64.90.***.***' | 'welcome'>('64.90.***.***')
  const [filterTab, setFilterTab] = useState<'all' | 'recent' | 'prod'>('all')
  const [isGroupExpanded, setIsGroupExpanded] = useState(true)

  // Split window layout state: 'single' (Square) | 'horizontal' (Rows2) | 'vertical' (Columns2)
  const [splitMode, setSplitMode] = useState<'single' | 'horizontal' | 'vertical'>('single')
  const [pane2InputVal, setPane2InputVal] = useState('')
  const [pane2History, setPane2History] = useState<TerminalLine[]>([
    { type: 'connected', text: '✓ [分屏会话 #2] 已建立与 64.90.***.*** 的安全 SSH 通道 (pts/2)' },
    { type: 'banner', text: 'Linux prod-node-02 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC x86_64' },
    { type: 'prompt', text: 'root@prod-node-02:~# journalctl -u nginx -n 3 --no-pager' },
    { type: 'output', text: '[15:20:01] 200 GET /api/v1/health (127.0.0.1) 0.8ms\n[15:20:04] 200 POST /api/v1/tunnel/sync (10.0.4.12) 1.2ms\n[15:20:07] 200 GET /metrics (10.0.4.1) 1.5ms' }
  ])

  // Monitor panel sub-tab state
  const [monitorTab, setMonitorTab] = useState<MonitorTabType>('metrics')
  const [procSortBy, setProcSortBy] = useState<'cpu' | 'mem'>('cpu')
  const [procFilter, setProcFilter] = useState('')

  // Selection states in SFTP (screenshot shows remote .claude.json selected)
  const [selectedLocalFile, setSelectedLocalFile] = useState<string | null>(null)
  const [selectedRemoteFile, setSelectedRemoteFile] = useState<string | null>('.claude.json')

  // SFTP Toolbar & View states matching design
  const [remotePath, setRemotePath] = useState('/root')
  const [sftpFilter, setSftpFilter] = useState('')
  const [isDualPane, setIsDualPane] = useState(true)
  const [showHiddenFiles, setShowHiddenFiles] = useState(true)
  const [isSftpMaximized, setIsSftpMaximized] = useState(false)
  const [isPathCopied, setIsPathCopied] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [remoteFilesList, setRemoteFilesList] = useState([
    { name: '📄 .#bashrc', isDir: false, size: '32 B', perms: 'lrwxrwxrwx', owner: '0', mtime: '2026-08-20', hidden: true, key: '.#bashrc' },
    { name: '📄 .bash_history', isDir: false, size: '27.1 KB', perms: '-rw-------', owner: '0', mtime: '今日', hidden: true, key: '.bash_history' },
    { name: '📄 .bashrc', isDir: false, size: '891 B', perms: '-rw-r--r--', owner: '0', mtime: '15 天前', hidden: true, key: '.bashrc' },
    { name: '📄 .claude.json', isDir: false, size: '4.6 KB', perms: '-rw-------', owner: '0', mtime: '3 天前', hidden: true, key: '.claude.json' },
    { name: '📄 .gitconfig', isDir: false, size: '181 B', perms: '-rw-r--r--', owner: '0', mtime: '2026-08-26', hidden: true, key: '.gitconfig' },
    { name: '📄 .lesshst', isDir: false, size: '20 B', perms: '-rw-------', owner: '0', mtime: '今日', hidden: true, key: '.lesshst' },
    { name: '📄 .profile', isDir: false, size: '132 B', perms: '-rw-r--r--', owner: '0', mtime: '2026-07-04', hidden: true, key: '.profile' },
  ])

  const [localFilesList, setLocalFilesList] = useState([
    { name: '📁 ..', isDir: true, size: '-', mtime: '-', hidden: false, key: '..' },
    { name: '📁 Hayaku', isDir: true, size: '-', mtime: '4 天前', hidden: false, key: 'Hayaku' },
    { name: '📁 星际穿越续 (PV)', isDir: true, size: '-', mtime: '2026-07-21 23:13', hidden: false, key: '星际穿越续' },
    { name: '📄 _.(SkySound.cc).mp3', isDir: false, size: '10.6 MB', mtime: '2026-07-27 23:40', hidden: false, key: 'SkySound' },
    { name: '📄 .DS_Store', isDir: false, size: '8 KB', mtime: '3 天前', hidden: true, key: '.DS_Store' },
    { name: '📄 1.mp4', isDir: false, size: '4.7 MB', mtime: '2026-07-22 23:42', hidden: false, key: '1.mp4' },
  ])

  const handleCopyPath = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(remotePath)
    }
    setIsPathCopied(true)
    setTimeout(() => setIsPathCopied(false), 1500)
  }

  const handleRefreshSftp = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 600)
  }

  const handleGoPath = () => {
    if (!remotePath.startsWith('/')) {
      setRemotePath('/' + remotePath)
    }
  }

  const handleGoParentDir = () => {
    if (remotePath === '/' || remotePath === '') return
    const parts = remotePath.split('/').filter(Boolean)
    parts.pop()
    setRemotePath(parts.length > 0 ? '/' + parts.join('/') : '/')
  }

  const handleGoHomeDir = () => {
    setRemotePath('/root')
  }

  const handleNewFile = () => {
    const filename = `new_file_${remoteFilesList.length + 1}.txt`
    setRemoteFilesList(prev => [
      { name: `📄 ${filename}`, isDir: false, size: '0 B', perms: '-rw-r--r--', owner: '0', mtime: '刚刚', hidden: false, key: filename },
      ...prev
    ])
  }

  const handleNewFolder = () => {
    const foldername = `new_folder_${remoteFilesList.length + 1}`
    setRemoteFilesList(prev => [
      { name: `📁 ${foldername}`, isDir: true, size: '-', perms: 'drwxr-xr-x', owner: '0', mtime: '刚刚', hidden: false, key: foldername },
      ...prev
    ])
  }

  // Real-time telemetry metrics matching screenshot
  const [cpuVal, setCpuVal] = useState(1.6)
  const [memVal, setMemVal] = useState(32)
  const [diskVal, setDiskVal] = useState(48)
  const [rttLatency, setRttLatency] = useState(393)
  const [netInVal, setNetInVal] = useState(1)
  const [netOutVal, setNetOutVal] = useState(2)

  // Terminal input & history
  const [inputVal, setInputVal] = useState('')
  const terminalEndRef = useRef<HTMLDivElement>(null)

  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: 'connected',
      text: '✓ 已连接到 64.90.***.*** (root@64.90.***.***:22, Ubuntu)'
    },
    {
      type: 'banner',
      text: `Linux localhost 6.12.101+deb13-cloud-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.12.101-1 (2026-08-05) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Sep  8 23:29:26 2026 from 113.248.***.***`
    }
  ])

  // Mock Process List for Monitor Processes Tab
  const processList: ProcessItem[] = [
    { pid: 1, user: 'root', command: '/sbin/init', cpu: '0.0%', mem: '0.2%' },
    { pid: 618, user: 'root', command: '/lib/systemd/systemd-journald', cpu: '0.1%', mem: '0.5%' },
    { pid: 742, user: 'root', command: '/usr/sbin/sshd -D', cpu: '0.1%', mem: '0.3%' },
    { pid: 1204, user: 'root', command: 'sshd: root@pts/0', cpu: '0.2%', mem: '0.4%' },
    { pid: 1289, user: 'root', command: '-bash', cpu: '0.0%', mem: '0.2%' },
    { pid: 1540, user: 'root', command: 'containerd --config /etc/containerd/config.toml', cpu: '0.8%', mem: '1.4%' },
    { pid: 1820, user: 'www-data', command: 'nginx: worker process', cpu: '0.4%', mem: '0.8%' },
    { pid: 2190, user: 'postgres', command: 'postgres: checkpointer', cpu: '0.1%', mem: '0.9%' },
    { pid: 3102, user: 'root', command: 'python3 /opt/monitor-agent.py', cpu: '0.2%', mem: '0.6%' }
  ]

  // Subtle live metric jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuVal((prev) => {
        const delta = (Math.random() - 0.48) * 0.4
        return parseFloat(Math.max(1.0, Math.min(6.5, prev + delta)).toFixed(1))
      })
      setRttLatency(Math.floor(390 + Math.random() * 8))
      setNetInVal(Math.floor(1 + Math.random() * 2))
      setNetOutVal(Math.floor(2 + Math.random() * 3))
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const handleRunCommand = (cmd: string) => {
    if (!cmd.trim()) return

    let reply = ''
    if (cmd === 'neofetch') {
      reply = `       _,met$$$$$gg.          root@localhost
    ,g$$$$$$$$$$$$$$$P.       --------------
  ,g$$P"     """Y$$.".        OS: Debian GNU/Linux 13 (trixie) x86_64
 ,$$P'              \`$$$.     Host: KVM Cloud Compute Node
',$$P       ,ggs.     \`$$b:   Kernel: 6.12.101+deb13-cloud-amd64
\`d$$'     ,$P"'   .    $$$    Uptime: 12 days, 12 hours, 40 mins
 $$P      d$'     ,    $$P    Packages: 492 (dpkg)
 $$:      $$.   -    ,d$$'    Shell: bash 5.2.32
 $$;      Y$b._   _,d$P'      Terminal: WinSSH Pro (Native GPUI + Alacritty)
 Y$$.    \`."Y$$$$P"'          CPU: AMD EPYC-Milan Processor (2) @ 2.449GHz
 \`$$b      "-.__              Memory: 1228MiB / 3918MiB (32%)`
    } else if (cmd === 'docker ps') {
      reply = `CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS        PORTS                    NAMES
4c8e7b2a1109   nginx:alpine          "/docker-entrypoint.…"   2 days ago     Up 2 days     0.0.0.0:80->80/tcp       web-ingress
9f182d439a01   redis:7-alpine        "docker-entrypoint.s…"   5 days ago     Up 5 days     127.0.0.1:6379->6379/tcp redis-cache`
    } else if (cmd === 'free -h') {
      reply = `               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       1.2Gi       1.4Gi        12Mi       1.2Gi       2.4Gi
Swap:          2.0Gi          0B       2.0Gi`
    } else if (cmd === 'ls -la') {
      reply = `total 68
drwx------ 5 root root 4096 Sep  8 23:29 .
drwxr-xr-x 1 root root 4096 Aug  5 00:12 ..
-rw------- 1 root root 27120 Sep  8 23:29 .bash_history
-rw-r--r-- 1 root root   891 Aug  5 00:12 .bashrc
-rw------- 1 root root  4608 Aug 28 14:12 .claude.json
-rw-r--r-- 1 root root   181 Aug 26 19:40 .gitconfig
-rw------- 1 root root    20 Sep  8 23:29 .lesshst
-rw-r--r-- 1 root root   132 Aug  5 00:12 .profile
-rw------- 1 root root 10420 Sep  8 21:10 .viminfo`
    } else {
      reply = `[64.90.***.***] Executed in 2.4ms with exit status 0.`
    }

    setHistory((prev) => [
      ...prev,
      { type: 'prompt', text: `root@localhost:~# ${cmd}` },
      { type: 'output', text: reply }
    ])
    setInputVal('')
    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleRunPane2Command = (cmd: string) => {
    if (!cmd.trim()) return

    let reply = ''
    if (cmd === 'uptime') {
      reply = ' 15:24:02 up 14 days,  3:12,  2 users,  load average: 0.12, 0.15, 0.18'
    } else if (cmd.includes('uname')) {
      reply = 'Linux prod-node-02 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC x86_64'
    } else if (cmd === 'top' || cmd === 'htop') {
      reply = `top - 15:24:10 up 14 days,  3:12,  2 users,  load average: 0.10, 0.14, 0.17
Tasks: 142 total,   1 running, 141 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.8 us,  1.2 sy,  0.0 ni, 96.8 id,  0.1 wa,  0.0 hi,  0.1 si
MiB Mem :  15824.2 total,   8420.1 free,   4210.5 used,   3193.6 buff/cache`
    } else {
      reply = `[64.90.***.*** pts/2] 执行完成，退出码 0`
    }

    setPane2History((prev) => [
      ...prev,
      { type: 'prompt', text: `root@prod-node-02:~# ${cmd}` },
      { type: 'output', text: reply }
    ])
    setPane2InputVal('')
  }

  return (
    <section id="showcase" className="py-24 px-2 sm:px-4 md:px-8 relative z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[1250px] h-[550px] bg-cyan-600/10 blur-[180px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* 100% Faithful Interactive Desktop Prototype */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-[#2b2b30] bg-[#121215] shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden font-sans select-none">
            {/* 1. Window Top Chrome / Title Bar */}
            <div className="h-10 bg-[#18181c] border-b border-[#25252a] flex items-center justify-between px-4 select-none">
              {/* Traffic Lights & App Title */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                </div>
                <span className="text-xs font-semibold text-neutral-200 tracking-wide ml-1">
                  WinSSH Pro
                </span>
              </div>

              {/* Centered Command Palette Search Bar */}
              <div
                className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-[#202025] border border-[#2d2d34] text-neutral-400 text-xs w-72 justify-between cursor-default"
              >
                <div className="flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="text-[11px]">搜索主机、视图与动作</span>
                </div>
                <span className="text-[10px] font-mono px-1 rounded bg-[#2a2a30] text-neutral-400 border border-white/5">
                  ⌘K
                </span>
              </div>

              {/* Local Shell Button */}
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#202025] hover:bg-[#282830] border border-[#2d2d34] text-neutral-300 text-xs font-mono transition-colors"
                >
                  <span className="text-cyan-400 font-bold">&gt;_</span>
                  <span>本地 Shell</span>
                </button>
              </div>
            </div>

            {/* 2. Main Desktop Viewport: Activity Bar + Host Sidebar + Main Body */}
            <div className="flex h-[580px] sm:h-[660px] lg:h-[740px] overflow-hidden bg-[#0c0c0e]">
              {/* Activity Bar (最左侧窄栏) */}
              <div className="w-11 bg-[#151518] border-r border-[#222226] flex flex-col items-center py-3 justify-between shrink-0 z-20">
                <div className="flex flex-col items-center gap-4 w-full">
                  {/* Top Host Toggle Icon (cyan outline in screenshot) */}
                  <button
                    title="主机资源管理器"
                    className="w-7 h-7 rounded-md border border-cyan-400/80 bg-cyan-500/10 text-cyan-400 flex items-center justify-center transition-all shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                  >
                    <div className="w-3.5 h-3.5 rounded border border-cyan-400 flex flex-col justify-between p-0.5">
                      <div className="w-full h-0.5 bg-cyan-400 rounded-sm" />
                      <div className="w-full h-0.5 bg-cyan-400/60 rounded-sm" />
                    </div>
                  </button>

                  {/* Code / Snippets </> */}
                  <div
                    title="代码与脚本片段"
                    className="w-7 h-7 rounded-md text-neutral-500 flex items-center justify-center font-mono text-xs"
                  >
                    &lt;/&gt;
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  {/* AI Copilot Icon */}
                  <div
                    title="DevOps AI 助手"
                    className="w-7 h-7 rounded-md flex items-center justify-center text-neutral-500"
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>

                  {/* Settings Gear */}
                  <button
                    onClick={() => setMonitorTab('settings')}
                    title="设置"
                    className="w-7 h-7 rounded-md text-neutral-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Host Sidebar (主机侧边栏, 移动端自动折叠保障终端操作空间) */}
              <div className="hidden md:flex w-52 lg:w-64 bg-[#151518] border-r border-[#222226] flex-col shrink-0">
                {/* Header */}
                <div className="h-10 px-3 border-b border-[#222226] flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200">主机</span>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <button
                      className="hover:text-white transition-colors"
                      title="添加主机"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-white transition-colors" title="折叠侧边栏">
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Search Box */}
                <div className="p-2 border-b border-[#222226]">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#1a1a1f] border border-[#27272e] text-xs text-neutral-400">
                    <Search className="w-3 h-3 text-neutral-500 shrink-0" />
                    <input
                      type="text"
                      placeholder="按名称、地址、标签或分组搜索主机"
                      className="bg-transparent border-none text-[11px] text-white focus:outline-none placeholder-neutral-500 w-full"
                    />
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="px-2 py-2 flex items-center gap-2 text-xs border-b border-[#222226]">
                  <button
                    onClick={() => setFilterTab('all')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      filterTab === 'all'
                        ? 'bg-[#27272d] text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    全部 (1)
                  </button>
                  <button
                    onClick={() => setFilterTab('recent')}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                      filterTab === 'recent'
                        ? 'bg-[#27272d] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    最近
                  </button>
                  <button
                    onClick={() => setFilterTab('prod')}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                      filterTab === 'prod'
                        ? 'bg-[#27272d] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    生产环境
                  </button>
                </div>

                {/* Host Tree */}
                <div className="flex-1 p-2 space-y-1.5 overflow-y-auto">
                  {/* Group header */}
                  <div
                    onClick={() => setIsGroupExpanded(!isGroupExpanded)}
                    className="flex items-center justify-between px-2 py-1 text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isGroupExpanded ? '' : '-rotate-90'
                        }`}
                      />
                      <Folder className="w-3.5 h-3.5 text-amber-500/80" />
                      <span className="text-neutral-300 font-medium">生产环境</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">1</span>
                  </div>

                  {/* Host Card: 64.90.***.*** with Ubuntu Icon */}
                  {isGroupExpanded && (
                    <div
                      onClick={() => setActiveTab('64.90.***.***')}
                      className="p-2.5 rounded-lg border border-[#1668dc] bg-[#162030] cursor-pointer relative shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] inline-block shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                          <span className="text-xs font-bold text-white font-mono">
                            64.90.***.***
                          </span>
                        </div>
                        <MoreVertical className="w-3.5 h-3.5 text-neutral-400 hover:text-white" />
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono mb-2 ml-4">
                        root@64.90.***.***
                      </div>
                      <div className="ml-4 flex items-center gap-1">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-neutral-300 font-mono">
                          <img src="/icons/os/ubuntu.svg" alt="Ubuntu" className="w-3 h-3" />
                          <span>Ubuntu</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Blue Button: + 新建主机 */}
                <div className="p-2.5 border-t border-[#222226]">
                  <button
                    className="w-full py-2 px-3 rounded-lg bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>新建主机</span>
                  </button>
                </div>
              </div>

              {/* Center Workspace (Tabs + Terminal + SFTP) */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#08080a]">
                {/* 3. Main Tab Bar */}
                <div className="h-9 bg-[#151518] border-b border-[#222226] flex items-center px-1">
                  <div
                    onClick={() => setActiveTab('welcome')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium cursor-pointer border-r border-[#222226] ${
                      activeTab === 'welcome'
                        ? 'bg-[#08080a] text-white border-t-2 border-cyan-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    <span>欢迎</span>
                  </div>

                  <div
                    onClick={() => setActiveTab('64.90.***.***')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono cursor-pointer border-r border-[#222226] ${
                      activeTab === '64.90.***.***'
                        ? 'bg-[#08080a] text-white border-t-2 border-cyan-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                    <span className="font-bold">64.90.***.***</span>
                    <button className="text-neutral-500 hover:text-white ml-1 text-xs">×</button>
                  </div>
                </div>

                {/* 4. Session Action Header Toolbar */}
                <div className="h-9 bg-[#131316] border-b border-[#222226] px-3 flex items-center justify-between text-xs">
                  {/* Left: Active connection indicator */}
                  <div className="flex items-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    <span className="font-bold text-neutral-200">root@64.90.***.***</span>
                    <span className="text-neutral-500">|</span>
                    <span className="text-neutral-500 hover:text-white cursor-pointer">_</span>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    {/* Split window icons */}
                    <div className="hidden sm:flex items-center gap-1.5 mr-1">
                      <button
                        type="button"
                        onClick={() => setSplitMode('single')}
                        className={`h-6 w-6 flex items-center justify-center rounded-[5px] transition-all cursor-pointer ${
                          splitMode === 'single'
                            ? 'border border-[#254d73] bg-[#0e1724]/90 text-[#3f78b3] shadow-[0_0_8px_rgba(63,120,179,0.15)]'
                            : 'border border-transparent text-[#636262] hover:text-neutral-200 hover:bg-white/5'
                        }`}
                        title="单屏视图"
                      >
                        <Square className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSplitMode('horizontal')}
                        className={`h-6 w-6 flex items-center justify-center rounded-[5px] transition-all cursor-pointer ${
                          splitMode === 'horizontal'
                            ? 'border border-[#254d73] bg-[#0e1724]/90 text-[#3f78b3] shadow-[0_0_8px_rgba(63,120,179,0.15)]'
                            : 'border border-transparent text-[#636262] hover:text-neutral-200 hover:bg-white/5'
                        }`}
                        title="水平分屏 (上下)"
                      >
                        <Rows2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSplitMode('vertical')}
                        className={`h-6 w-6 flex items-center justify-center rounded-[5px] transition-all cursor-pointer ${
                          splitMode === 'vertical'
                            ? 'border border-[#254d73] bg-[#0e1724]/90 text-[#3f78b3] shadow-[0_0_8px_rgba(63,120,179,0.15)]'
                            : 'border border-transparent text-[#636262] hover:text-neutral-200 hover:bg-white/5'
                        }`}
                        title="垂直分屏 (左右)"
                      >
                        <Columns2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="px-2 py-0.5 rounded text-[11px] text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
                    >
                      端口转发
                    </button>

                    {/* SFTP Panel Button (highlighted green when open!) */}
                    <button
                      onClick={() => setIsSftpOpen(!isSftpOpen)}
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        isSftpOpen
                          ? 'border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : 'text-neutral-300 hover:bg-white/5 border border-white/5'
                      }`}
                    >
                      <FolderSync className="w-3 h-3" />
                      <span>SFTP 面板</span>
                    </button>

                    {/* Resource Monitor Button (highlighted green when open!) */}
                    <button
                      onClick={() => setIsMonitorOpen(!isMonitorOpen)}
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        isMonitorOpen
                          ? 'border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : 'text-neutral-300 hover:bg-white/5 border border-white/5'
                      }`}
                    >
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span>资源监控</span>
                    </button>

                    <button className="p-1 text-neutral-400 hover:text-white">
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() =>
                        setHistory([
                          {
                            type: 'connected',
                            text: '✓ 已连接到 64.90.***.*** (root@64.90.***.***:22, Ubuntu)'
                          }
                        ])
                      }
                      className="p-1 text-neutral-400 hover:text-white"
                      title="清空终端"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 5. Terminal Viewport */}
                <div className={`flex-1 min-h-0 overflow-hidden ${
                  splitMode === 'vertical' ? 'flex flex-row' : 'flex flex-col'
                }`}>
                  {/* Primary Terminal Pane */}
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-xs select-text bg-[#070709] leading-relaxed text-neutral-200">
                    {history.map((line, idx) => (
                      <div key={idx} className="mb-2">
                        {line.type === 'connected' && (
                          <div className="text-emerald-400 font-semibold mb-1">
                            {line.text}
                          </div>
                        )}
                        {line.type === 'banner' && (
                          <pre className="text-neutral-300 whitespace-pre-wrap font-mono">
                            {line.text}
                          </pre>
                        )}
                        {line.type === 'prompt' && (
                          <div className="text-neutral-100 font-bold mt-2">
                            {line.text}
                          </div>
                        )}
                        {line.type === 'output' && (
                          <pre className="text-neutral-300 whitespace-pre-wrap font-mono mt-0.5">
                            {line.text}
                          </pre>
                        )}
                      </div>
                    ))}

                    {/* Active Terminal Input Line */}
                    <div className="flex items-center gap-1.5 mt-1 font-mono">
                      <span className="text-neutral-100 font-bold shrink-0">root@localhost:~#</span>
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRunCommand(inputVal || 'free -h')
                        }}
                        placeholder="在此键入命令（如 neofetch、docker ps、free -h）..."
                        className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs placeholder-neutral-700"
                      />
                      <span className="w-2 h-4 bg-white animate-[pulse_0.8s_infinite] inline-block -ml-1 align-middle" />
                    </div>
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Secondary Split Pane (when horizontal or vertical split is active) */}
                  {splitMode !== 'single' && (
                    <div className={`flex-1 overflow-y-auto p-4 font-mono text-xs select-text bg-[#09090d] leading-relaxed text-neutral-200 ${
                      splitMode === 'vertical' ? 'border-l border-[#222226]' : 'border-t border-[#222226]'
                    }`}>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px] select-none">
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-neutral-300 font-semibold">分屏会话 #2 (root@64.90.***.***)</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono">pts/2</span>
                      </div>
                      {pane2History.map((line, idx) => (
                        <div key={idx} className="mb-2">
                          {line.type === 'connected' && (
                            <div className="text-cyan-400 font-semibold mb-1">
                              {line.text}
                            </div>
                          )}
                          {line.type === 'banner' && (
                            <pre className="text-neutral-400 whitespace-pre-wrap font-mono">
                              {line.text}
                            </pre>
                          )}
                          {line.type === 'prompt' && (
                            <div className="text-neutral-100 font-bold mt-2">
                              {line.text}
                            </div>
                          )}
                          {line.type === 'output' && (
                            <pre className="text-neutral-300 whitespace-pre-wrap font-mono mt-0.5">
                              {line.text}
                            </pre>
                          )}
                        </div>
                      ))}
                      <div className="flex items-center gap-1.5 mt-1 font-mono">
                        <span className="text-neutral-100 font-bold shrink-0">root@prod-node-02:~#</span>
                        <input
                          type="text"
                          value={pane2InputVal}
                          onChange={(e) => setPane2InputVal(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleRunPane2Command(pane2InputVal || 'uptime')
                          }}
                          placeholder="键入分屏命令（如 uptime、uname -a、top）..."
                          className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs placeholder-neutral-700"
                        />
                        <span className="w-2 h-4 bg-cyan-400 animate-[pulse_0.8s_infinite] inline-block -ml-1 align-middle" />
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Status Strip (Between Terminal & SFTP) */}
                <div className="h-7 bg-[#111114] border-t border-b border-[#202025] px-3 flex items-center justify-between text-[11px] font-mono select-none">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-neutral-400">RTT</span>
                      <span className="text-[#f2585d] font-bold">{rttLatency}ms</span>
                    </div>
                    <span className="text-neutral-600">|</span>
                    <div className="flex items-center gap-1">
                      <span className="text-neutral-400">CPU</span>
                      <span className="text-neutral-200 font-bold">2%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-neutral-400">MEM</span>
                      <span className="text-neutral-200 font-bold">{memVal}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-neutral-400">DISK</span>
                      <span className="text-neutral-200 font-bold">{diskVal}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-300">
                      <span>↓ 1.0 KB/s</span>
                      <span>↑ 1.9 KB/s</span>
                    </div>
                  </div>

                  <div className="text-neutral-500 font-mono text-[10px]">
                    {splitMode === 'vertical'
                      ? isMonitorOpen ? '60×30 | 60×30' : '83×30 | 83×30'
                      : splitMode === 'horizontal'
                      ? isMonitorOpen ? '120×15 | 120×15' : '166×15 | 166×15'
                      : isMonitorOpen ? '120×30' : '166×30'}
                  </div>
                </div>

                {/* 7. Bottom SFTP Panel (Dual-Pane File Manager) */}
                <AnimatePresence>
                  {isSftpOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: isSftpMaximized ? 420 : 260, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-[#222226] bg-[#121215] flex flex-col select-none overflow-hidden"
                    >
                      {/* SFTP Toolbar */}
                      <div className="h-9 bg-[#111114] border-b border-[#202025] px-3 flex items-center gap-2 text-xs font-mono select-none overflow-x-auto no-scrollbar">
                        {/* 1. Host Capsule Badge */}
                        <div className="h-7 px-2.5 flex items-center gap-1.5 bg-[#111114] border border-[#2a2a30] rounded text-xs select-none shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-semibold text-emerald-400 font-mono text-[11px]">64.90.***.***</span>
                          <span className="text-neutral-400 font-mono text-[10px]">SFTP</span>
                        </div>

                        {/* 2. Sync Directory Toggle */}
                        <button
                          type="button"
                          onClick={() => setSyncDirActive(!syncDirActive)}
                          className="h-7 px-1 flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer select-none shrink-0"
                          title="切换目录自动同步"
                        >
                          <FolderSync className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span className="text-[11px] font-sans">同步目录: {syncDirActive ? '开' : '关'}</span>
                        </button>

                        {/* 3. Path Input Box */}
                        <div className="flex-1 min-w-[120px] h-7 bg-[#111114] border border-[#2a2a30] rounded px-2.5 flex items-center">
                          <input
                            type="text"
                            value={remotePath}
                            onChange={(e) => setRemotePath(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleGoPath()
                            }}
                            placeholder="/root"
                            className="w-full bg-transparent border-none text-neutral-200 font-mono text-xs focus:outline-none placeholder-neutral-600"
                          />
                        </div>

                        {/* 4. Go Button */}
                        <button
                          type="button"
                          onClick={handleGoPath}
                          className="h-7 px-3 bg-[#0066cc] hover:bg-[#0055b3] active:bg-[#004d99] text-white rounded text-xs font-sans font-medium shrink-0 transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                        >
                          前往
                        </button>

                        {/* 5. Copy Path */}
                        <button
                          type="button"
                          onClick={handleCopyPath}
                          className="h-7 w-7 flex items-center justify-center rounded border border-[#2a2a30] bg-[#111114] text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors shrink-0 cursor-pointer"
                          title={isPathCopied ? '已复制路径' : '复制路径'}
                        >
                          {isPathCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        {/* 6. Refresh */}
                        <button
                          type="button"
                          onClick={handleRefreshSftp}
                          className="h-7 w-7 flex items-center justify-center rounded border border-[#2a2a30] bg-[#111114] text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors shrink-0 cursor-pointer"
                          title="刷新"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
                        </button>

                        {/* 7. Search/Filter Input */}
                        <div className="h-7 w-28 sm:w-36 md:w-44 bg-[#111114] border border-[#2a2a30] rounded px-2 flex items-center shrink-0">
                          <input
                            type="text"
                            placeholder="过滤文件名..."
                            value={sftpFilter}
                            onChange={(e) => setSftpFilter(e.target.value)}
                            className="bg-transparent border-none text-neutral-200 placeholder-neutral-500 focus:outline-none text-[11px] w-full font-sans"
                          />
                        </div>

                        {/* 8. Parent Directory */}
                        <button
                          type="button"
                          onClick={handleGoParentDir}
                          className="h-7 w-7 flex items-center justify-center rounded border border-[#2a2a30] bg-[#111114] text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors shrink-0 cursor-pointer"
                          title="上级目录"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>

                        {/* 9. Home Directory */}
                        <button
                          type="button"
                          onClick={handleGoHomeDir}
                          className="h-7 w-7 flex items-center justify-center rounded border border-[#2a2a30] bg-[#111114] text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors shrink-0 cursor-pointer"
                          title="主目录"
                        >
                          <Home className="w-3.5 h-3.5" />
                        </button>

                        {/* 10. New File */}
                        <button
                          type="button"
                          onClick={handleNewFile}
                          className="h-7 w-7 flex items-center justify-center rounded border border-[#2a2a30] bg-[#111114] text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors shrink-0 cursor-pointer"
                          title="新建文件"
                        >
                          <FilePlus className="w-3.5 h-3.5" />
                        </button>

                        {/* 11. New Folder */}
                        <button
                          type="button"
                          onClick={handleNewFolder}
                          className="h-7 w-7 flex items-center justify-center rounded border border-[#2a2a30] bg-[#111114] text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors shrink-0 cursor-pointer"
                          title="新建文件夹"
                        >
                          <FolderPlus className="w-3.5 h-3.5" />
                        </button>

                        {/* 12. Dual-Pane Toggle */}
                        <button
                          type="button"
                          onClick={() => setIsDualPane(!isDualPane)}
                          className={`h-7 w-7 flex items-center justify-center rounded border bg-[#111114] transition-colors shrink-0 cursor-pointer ${
                            isDualPane ? 'border-neutral-500 text-neutral-200' : 'border-[#2a2a30] text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={isDualPane ? '切换至单栏' : '切换至双栏'}
                        >
                          <Columns2 className="w-3.5 h-3.5" />
                        </button>

                        {/* 13. Show/Hide Hidden Files */}
                        <button
                          type="button"
                          onClick={() => setShowHiddenFiles(!showHiddenFiles)}
                          className={`h-7 w-7 flex items-center justify-center rounded border bg-[#111114] transition-colors shrink-0 cursor-pointer ${
                            showHiddenFiles ? 'border-neutral-500 text-neutral-200' : 'border-[#2a2a30] text-neutral-500 hover:text-neutral-300'
                          }`}
                          title={showHiddenFiles ? '隐藏点文件' : '显示隐藏文件'}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* 14. Maximize / Restore */}
                        <button
                          type="button"
                          onClick={() => setIsSftpMaximized(!isSftpMaximized)}
                          className={`h-7 w-7 flex items-center justify-center rounded border bg-[#111114] transition-colors shrink-0 cursor-pointer ${
                            isSftpMaximized ? 'border-blue-500/60 text-blue-400' : 'border-[#2a2a30] text-neutral-400 hover:text-white hover:border-neutral-600'
                          }`}
                          title={isSftpMaximized ? '还原高度' : '最大化高度'}
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>

                        {/* 15. Close SFTP */}
                        <button
                          type="button"
                          onClick={() => setIsSftpOpen(false)}
                          className="h-7 w-7 flex items-center justify-center rounded border border-[#2a2a30] bg-[#111114] text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors shrink-0 cursor-pointer"
                          title="关闭 SFTP 面板"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Dual-Pane File Tables */}
                      <div className="flex-1 flex overflow-hidden text-[11px] font-mono">
                        {/* Left Pane: Local Workstation */}
                        {isDualPane && (
                          <div className="flex-1 border-r border-[#222226] flex flex-col min-w-0">
                            {/* Left pane header */}
                            <div className="h-6 bg-[#151518] px-2.5 flex items-center justify-between text-[10px] text-neutral-400 border-b border-[#222226]">
                              <div className="flex items-center gap-2 truncate">
                                <Laptop className="w-3 h-3 text-cyan-400" />
                                <span className="font-semibold text-neutral-200">本地工作站</span>
                                <span className="text-amber-400 flex items-center gap-0.5 cursor-pointer">
                                  ⚡ 常用 ▾
                                </span>
                                <span className="text-neutral-500 truncate">
                                  / &gt; Users &gt; kali &gt; Downloads
                                </span>
                              </div>
                            </div>

                            {/* Table rows */}
                            <div className="flex-1 overflow-y-auto p-1 text-neutral-300">
                              <table className="w-full text-left">
                                <thead>
                                  <tr className="text-neutral-500 text-[10px] border-b border-white/5">
                                    <th className="py-1 px-1.5 font-normal">名称 ↕</th>
                                    <th className="py-1 px-1.5 font-normal">大小 ↕</th>
                                    <th className="py-1 px-1.5 font-normal">修改时间 ↕</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {localFilesList
                                    .filter(item => {
                                      if (!showHiddenFiles && item.hidden) return false
                                      if (sftpFilter && !item.name.toLowerCase().includes(sftpFilter.toLowerCase())) return false
                                      return true
                                    })
                                    .map(file => (
                                      <tr
                                        key={file.key}
                                        onClick={() => setSelectedLocalFile(selectedLocalFile === file.key ? null : file.key)}
                                        className={`cursor-pointer ${
                                          selectedLocalFile === file.key
                                            ? 'bg-blue-600/30 text-white'
                                            : 'hover:bg-white/5'
                                        }`}
                                      >
                                        <td className={`py-1 px-1.5 flex items-center gap-1.5 ${file.hidden ? 'text-neutral-500' : ''}`}>
                                          {file.name}
                                        </td>
                                        <td className="py-1 px-1.5 text-neutral-500">{file.size}</td>
                                        <td className="py-1 px-1.5 text-neutral-500">{file.mtime}</td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Right Pane: Remote Host /root */}
                        <div className="flex-1 flex flex-col min-w-0">
                          {/* Right pane header */}
                          <div className="h-6 bg-[#151518] px-2.5 flex items-center justify-between text-[10px] text-neutral-400 border-b border-[#222226]">
                            <div className="flex items-center gap-2 truncate">
                              <Server className="w-3 h-3 text-emerald-400" />
                              <span className="font-semibold text-neutral-200">
                                {remotePath === '/root' ? '/ > root' : remotePath}
                              </span>
                            </div>
                            <span className="text-neutral-500 font-mono">
                              {remoteFilesList.filter(item => {
                                if (!showHiddenFiles && item.hidden) return false
                                if (sftpFilter && !item.name.toLowerCase().includes(sftpFilter.toLowerCase())) return false
                                return true
                              }).length}{' '}
                              项
                            </span>
                          </div>

                          {/* Table rows */}
                          <div className="flex-1 overflow-y-auto p-1 text-neutral-300">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="text-neutral-500 text-[10px] border-b border-white/5">
                                  <th className="py-1 px-1.5 font-normal">名称 ↕</th>
                                  <th className="py-1 px-1.5 font-normal">大小 ↕</th>
                                  <th className="py-1 px-1.5 font-normal">权限 ↕</th>
                                  <th className="py-1 px-1.5 font-normal">所属 ↕</th>
                                  <th className="py-1 px-1.5 font-normal">修改时间 ↕</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {remoteFilesList
                                  .filter(item => {
                                    if (!showHiddenFiles && item.hidden) return false
                                    if (sftpFilter && !item.name.toLowerCase().includes(sftpFilter.toLowerCase())) return false
                                    return true
                                  })
                                  .map(file => (
                                    <tr
                                      key={file.key}
                                      onClick={() => setSelectedRemoteFile(selectedRemoteFile === file.key ? null : file.key)}
                                      className={`cursor-pointer ${
                                        selectedRemoteFile === file.key
                                          ? 'bg-blue-600/30 text-white'
                                          : 'hover:bg-white/5'
                                      }`}
                                    >
                                      <td className={`py-1 px-1.5 flex items-center gap-1.5 ${
                                        selectedRemoteFile === file.key
                                          ? 'text-neutral-200 font-medium'
                                          : file.hidden
                                          ? 'text-neutral-300'
                                          : 'text-neutral-200'
                                      }`}>
                                        {file.name}
                                      </td>
                                      <td className="py-1 px-1.5 text-neutral-400">{file.size}</td>
                                      <td className="py-1 px-1.5 text-neutral-500">{file.perms}</td>
                                      <td className="py-1 px-1.5 text-neutral-500">{file.owner}</td>
                                      <td className="py-1 px-1.5 text-neutral-500">{file.mtime}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Selection Status (matching screenshot: 远端已选 1 项 (4.6 KB)) */}
                      <div className="h-6 bg-[#101013] border-t border-[#222226] px-3 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <div>
                          {selectedRemoteFile && !selectedLocalFile && `远端已选 1 项 (4.6 KB)`}
                          {selectedLocalFile && !selectedRemoteFile && `本地已选 1 项`}
                          {selectedLocalFile && selectedRemoteFile && `本地已选 1 项 · 远端已选 1 项 (4.6 KB)`}
                          {!selectedLocalFile && !selectedRemoteFile && `未选择文件`}
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400 hover:text-white cursor-pointer">
                          <span>🗘 传输 (0)</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 8. The Real WinSSH Pro Monitor Panel (Right Side Dock) */}
              <AnimatePresence>
                {isMonitorOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width:
                        typeof window !== 'undefined' && window.innerWidth < 640
                          ? Math.max(260, window.innerWidth - 64)
                          : 330,
                      opacity: 1
                    }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#151518] border-l border-[#222226] flex flex-col select-none overflow-hidden shrink-0 z-20"
                  >
                    {/* Monitor Header (with green dot, Activity icon, host name, latency, refresh, close) */}
                    <div className="h-8 bg-[#18181c] border-b border-[#25252a] px-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-mono font-semibold text-white text-[11px] truncate">
                          64.90.***.*** (64.90.***.***)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                        <span className="text-neutral-500">{rttLatency}ms</span>
                        <button
                          onClick={() => {
                            setCpuVal(parseFloat((1.4 + Math.random() * 0.6).toFixed(1)))
                          }}
                          className="text-neutral-400 hover:text-white transition-colors"
                          title="立刻刷新"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                        <button className="text-neutral-400 hover:text-white">
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setIsMonitorOpen(false)}
                          className="text-neutral-400 hover:text-white"
                          title="关闭监控面板"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Uptime & Load Banner */}
                    <div className="px-3 py-1.5 bg-[#121215] border-b border-[#222226] flex items-center justify-between text-[11px] font-mono">
                      <div className="text-neutral-300">
                        Uptime: 12 days, 12 hours, 40 mins
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">Load:</span>
                        <span className="text-[#4EC9B0] font-semibold">0.04 0.03 0.00</span>
                      </div>
                    </div>

                    {/* Sub-Tabs Bar: 指标 / 进程 (134) / 诊断 / 设置 */}
                    <div className="h-8 bg-[#151518] border-b border-[#222226] flex items-center px-1 text-xs">
                      <button
                        onClick={() => setMonitorTab('metrics')}
                        className={`flex-1 h-full flex items-center justify-center gap-1.5 text-[11px] font-medium transition-colors border-b-2 ${
                          monitorTab === 'metrics'
                            ? 'border-cyan-400 text-cyan-400 font-semibold bg-white/5'
                            : 'border-transparent text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Activity className="w-3 h-3" />
                        <span>指标</span>
                      </button>

                      <button
                        onClick={() => setMonitorTab('processes')}
                        className={`flex-1 h-full flex items-center justify-center gap-1.5 text-[11px] font-medium transition-colors border-b-2 ${
                          monitorTab === 'processes'
                            ? 'border-cyan-400 text-cyan-400 font-semibold bg-white/5'
                            : 'border-transparent text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Cpu className="w-3 h-3" />
                        <span>进程 (134)</span>
                      </button>

                      <button
                        onClick={() => setMonitorTab('diagnostics')}
                        className={`flex-1 h-full flex items-center justify-center gap-1.5 text-[11px] font-medium transition-colors border-b-2 ${
                          monitorTab === 'diagnostics'
                            ? 'border-cyan-400 text-cyan-400 font-semibold bg-white/5'
                            : 'border-transparent text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Zap className="w-3 h-3" />
                        <span>诊断</span>
                      </button>

                      <button
                        onClick={() => setMonitorTab('settings')}
                        className={`w-8 h-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors border-b-2 ${
                          monitorTab === 'settings'
                            ? 'border-cyan-400 text-cyan-400 bg-white/5'
                            : 'border-transparent'
                        }`}
                        title="监控设置"
                      >
                        <Sliders className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Tab 1 Content: Metrics (4 Cards exactly matching the screenshot!) */}
                    {monitorTab === 'metrics' && (
                      <div className="flex-1 p-2 space-y-2 overflow-y-auto font-sans">
                        {/* 1. CPU Usage Card */}
                        <div className="p-2.5 rounded-lg bg-[#111114] border border-[#222226]">
                          <div className="flex items-center justify-between text-xs font-semibold text-white mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5 text-[#569CD6]" />
                              <span>CPU Usage</span>
                            </div>
                            <span className="font-mono text-[#569CD6] font-bold">
                              {cpuVal}%
                            </span>
                          </div>

                          {/* Smooth curved SVG Area Chart */}
                          <div className="h-10 w-full overflow-hidden rounded relative">
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 280 44"
                              preserveAspectRatio="none"
                            >
                              <defs>
                                <linearGradient id="cpuAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#569CD6" stopOpacity="0.45" />
                                  <stop offset="100%" stopColor="#569CD6" stopOpacity="0.02" />
                                </linearGradient>
                              </defs>
                              {/* Shaded Area */}
                              <path
                                d="M 0,26 Q 35,22 70,24 T 140,20 T 210,22 T 245,34 T 280,24 L 280,44 L 0,44 Z"
                                fill="url(#cpuAreaGrad)"
                              />
                              {/* Stroke line */}
                              <path
                                d="M 0,26 Q 35,22 70,24 T 140,20 T 210,22 T 245,34 T 280,24"
                                fill="none"
                                stroke="#569CD6"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* 2. RAM Usage Card */}
                        <div className="p-2.5 rounded-lg bg-[#111114] border border-[#222226]">
                          <div className="flex items-center justify-between text-xs font-semibold text-white mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Database className="w-3.5 h-3.5 text-[#4EC9B0]" />
                              <span>RAM Usage</span>
                            </div>
                            <span className="font-mono text-[#4EC9B0] font-bold">
                              {memVal}%
                            </span>
                          </div>

                          {/* Smooth Teal Gradient Block */}
                          <div className="w-full h-7 bg-[#152322] rounded overflow-hidden p-0.5 border border-[#1b3430]">
                            <div
                              className="h-full rounded bg-gradient-to-r from-[#215d52] via-[#359784] to-[#4EC9B0] transition-all duration-500"
                              style={{ width: `${memVal}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 mt-1.5">
                            <span>1.2 GB</span>
                            <span>4 GB</span>
                          </div>
                        </div>

                        {/* 3. Disk / Root Card */}
                        <div className="p-2.5 rounded-lg bg-[#111114] border border-[#222226]">
                          <div className="flex items-center justify-between text-xs font-semibold text-white mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <HardDrive className="w-3.5 h-3.5 text-[#CE9178]" />
                              <span>Disk / Root</span>
                            </div>
                            <span className="font-mono text-[#CE9178] font-bold">
                              {diskVal}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-1.5 bg-[#251f1c] rounded-full overflow-hidden mt-2">
                            <div
                              className="h-full bg-[#CE9178] rounded-full transition-all duration-500"
                              style={{ width: `${diskVal}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 mt-1.5">
                            <span>23.6 GB</span>
                            <span>49 GB</span>
                          </div>
                        </div>

                        {/* 4. Network I/O Card */}
                        <div className="p-2.5 rounded-lg bg-[#111114] border border-[#222226]">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2">
                            <Network className="w-3.5 h-3.5 text-[#C586C0]" />
                            <span>Network I/O</span>
                          </div>

                          <div className="space-y-1 font-mono text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-400 text-[11px]">▲ Out:</span>
                              <span className="text-[#C586C0] font-bold">{netOutVal} KB/s</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-400 text-[11px]">▼ In:</span>
                              <span className="text-[#4EC9B0] font-bold">{netInVal} KB/s</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2 Content: Processes (134) */}
                    {monitorTab === 'processes' && (
                      <div className="flex-1 p-2 flex flex-col min-h-0 text-xs font-mono">
                        {/* Process Search Toolbar & Sort Buttons */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded bg-[#101013] border border-[#2a2a32] text-[11px]">
                            <Search className="w-3 h-3 text-neutral-500" />
                            <input
                              type="text"
                              value={procFilter}
                              onChange={(e) => setProcFilter(e.target.value)}
                              placeholder="过滤进程..."
                              className="bg-transparent border-none text-white focus:outline-none w-full"
                            />
                          </div>

                          <div className="flex items-center bg-[#151518] p-0.5 rounded border border-[#222226] text-[10px]">
                            <button
                              onClick={() => setProcSortBy('cpu')}
                              className={`px-1.5 py-0.5 rounded ${
                                procSortBy === 'cpu'
                                  ? 'bg-[#0066cc] text-white font-bold'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              CPU
                            </button>
                            <button
                              onClick={() => setProcSortBy('mem')}
                              className={`px-1.5 py-0.5 rounded ${
                                procSortBy === 'mem'
                                  ? 'bg-[#0066cc] text-white font-bold'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              MEM
                            </button>
                          </div>
                        </div>

                        {/* Process Virtual Rows */}
                        <div className="flex-1 overflow-y-auto rounded bg-[#101013] border border-[#222226] divide-y divide-white/5">
                          {processList
                            .filter((p) => p.command.toLowerCase().includes(procFilter.toLowerCase()))
                            .map((proc) => (
                              <div
                                key={proc.pid}
                                className="p-1.5 hover:bg-white/5 flex items-center justify-between text-[11px]"
                              >
                                <div className="flex items-center gap-1.5 truncate min-w-0">
                                  <span className="text-[#569CD6] font-bold">{proc.pid}</span>
                                  <span className="text-neutral-500">({proc.user})</span>
                                  <span className="text-neutral-200 truncate">{proc.command}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 text-[10px]">
                                  <span className="text-cyan-400">{proc.cpu}</span>
                                  <span className="text-neutral-400">{proc.mem}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 3 Content: Diagnostics */}
                    {monitorTab === 'diagnostics' && (
                      <div className="flex-1 p-2 space-y-2 overflow-y-auto text-xs">
                        <div className="text-[11px] text-neutral-400 mb-1">
                          点击直接在终端执行原生排障诊断命令：
                        </div>
                        {[
                          { title: 'Top 5 内存消耗进程', cmd: 'ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head -n 6' },
                          { title: '网络连接状态统计', cmd: 'ss -s' },
                          { title: '系统错误日志最后 20 行', cmd: 'journalctl -p err -n 20 --no-pager' },
                          { title: '磁盘读写与虚拟内存压力', cmd: 'vmstat 1 3' },
                          { title: '查看监听中的 TCP 端口', cmd: 'ss -tulpn' }
                        ].map((diag, i) => (
                          <div
                            key={i}
                            onClick={() => handleRunCommand(diag.cmd)}
                            className="p-2.5 rounded-lg bg-[#111114] hover:bg-[#1a1a20] border border-[#222226] hover:border-cyan-500/40 cursor-pointer transition-all group"
                          >
                            <div className="flex items-center justify-between text-neutral-200 font-medium mb-1">
                              <span>{diag.title}</span>
                              <Play className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <code className="text-[10px] text-neutral-400 font-mono block truncate">
                              {diag.cmd}
                            </code>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 4 Content: Settings */}
                    {monitorTab === 'settings' && (
                      <div className="flex-1 p-3 space-y-4 text-xs font-sans">
                        <div className="text-neutral-200 font-semibold border-b border-white/10 pb-2">
                          监控采集节奏设置
                        </div>
                        <div>
                          <label className="text-neutral-400 block mb-1.5 text-[11px]">
                            面板采集周期 (秒)
                          </label>
                          <input
                            type="number"
                            defaultValue={2}
                            className="w-full px-2.5 py-1.5 bg-[#101013] border border-[#2a2a32] rounded text-white font-mono"
                          />
                          <p className="text-[10px] text-neutral-500 mt-1">
                            面板展开时从 /proc 读取实时资源波形的时间间隔。
                          </p>
                        </div>
                        <div>
                          <label className="text-neutral-400 block mb-1.5 text-[11px]">
                            状态栏采集周期 (秒)
                          </label>
                          <input
                            type="number"
                            defaultValue={1}
                            className="w-full px-2.5 py-1.5 bg-[#101013] border border-[#2a2a32] rounded text-white font-mono"
                          />
                          <p className="text-[10px] text-neutral-500 mt-1">
                            终端底栏轻量采集 RTT、CPU 与网络消耗的频率。
                          </p>
                        </div>
                        <button
                          onClick={() => setMonitorTab('metrics')}
                          className="w-full py-1.5 bg-[#0066cc] hover:bg-[#0055b3] text-white rounded font-medium text-xs transition-colors"
                        >
                          保存设置
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
      </div>
    </section>
  )
}
