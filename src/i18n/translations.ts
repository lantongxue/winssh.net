// 官网只描述 winssh-pro 源码里已经落地的能力；尚未实现或不对外介绍的功能不要写进来。

const zh = {
  meta: {
    title: 'WinSSH Pro — 集大成者 · 原生跨平台 SSH 与远程连接工作台',
    description:
      'WinSSH Pro 用 Rust 打造：SSH、SFTP、FTP、S3、WebDAV、RDP、VNC、Telnet、串口与 EasyTier 组网，加上资源监控与 AI 助手，集于一个原生应用。120 FPS GPU 渲染，免费开源，支持 Windows、macOS 与 Linux。'
  },
  nav: {
    connections: '连接',
    performance: '性能',
    features: '功能',
    download: '下载',
    changelog: '更新日志',
    github: 'GitHub',
    downloadCta: '免费下载',
    menu: '菜单',
    language: 'Switch to English'
  },
  hero: {
    kicker: 'All in One. All Native.',
    title: ['集大成者'],
    desc: [
      '终端、文件、远程桌面、组网与 AI 助手，收于一个原生应用。',
      'Rust 打造，120 FPS 渲染，Windows、macOS、Linux 全平台可用。'
    ],
    ctaDownload: '下载 {os} 版',
    ctaDownloadGeneric: '免费下载',
    ctaGithub: 'GitHub 源码',
    released: '{version} 现已发布',
    comingSoon: '首个正式版即将发布',
    meta: '免费开源 · x64 与 ARM64 原生构建',
    screenshotAlt: 'WinSSH Pro 界面：主机列表、SSH 终端、资源监控与 SFTP 文件面板'
  },
  protocols: {
    ssh: 'SSH',
    sftp: 'SFTP',
    ftp: 'FTP',
    s3: 'S3',
    webdav: 'WebDAV',
    rdp: 'RDP',
    vnc: 'VNC',
    telnet: 'Telnet',
    serial: '串口',
    easytier: 'EasyTier',
    local: '本地终端',
    wsl: 'WSL'
  },
  allInOne: {
    eyebrow: '集于一身',
    title: '十种连接，一个窗口。',
    desc: '从 Linux 服务器到 Windows 桌面，从对象存储到串口设备，每一种连接都在同一个主机列表里管理，在同一排标签页里打开。',
    groups: [
      {
        key: 'shell',
        title: '终端',
        desc: '远程与本地 Shell，跑在同一套终端内核上。',
        items: ['SSH', 'Telnet', '串口', '本地终端', 'WSL']
      },
      {
        key: 'files',
        title: '文件',
        desc: '服务器、网盘与对象存储，用同一个文件面板浏览。',
        items: ['SFTP', 'FTP / FTPS', 'WebDAV', 'S3']
      },
      {
        key: 'desktop',
        title: '桌面',
        desc: 'Windows 与 Linux 图形桌面，直接在标签页里操作。',
        items: ['RDP', 'VNC']
      },
      {
        key: 'network',
        title: '网络',
        desc: '组网、转发与代理，让难连的主机也能连上。',
        items: ['EasyTier 组网', '端口转发', 'SOCKS5 代理']
      }
    ]
  },
  performance: {
    eyebrow: '原生性能',
    title: ['每秒 120 帧，', '每帧 8.3 毫秒。'],
    desc: 'WinSSH Pro 用 Rust 编写，界面基于 Zed 团队开源的 GPUI 框架，由 GPU 直接绘制。没有浏览器内核，也没有 DOM；渲染以 120 FPS 为目标，每一帧只有 8.3 毫秒的预算。',
    second: '1 秒',
    frames: '120 帧',
    frame: '每帧 8.3 ms',
    gpuTitle: '各平台原生图形接口',
    stackTitle: '构建于',
    fpsTip: '想亲眼看看？在「设置 → 通用」中打开帧率监视器。'
  },
  features: {
    eyebrow: '功能',
    title: '不止是全，更要好用。',
    desc: '每一种能力都按专业工具的标准打磨，而不是凑数的附属功能。',
    chapters: {
      terminal: {
        tag: '终端',
        title: '终端，本该如此顺滑。',
        desc: '基于 alacritty 终端内核，界面由 GPU 逐帧绘制。日志刷屏、大段输出，输入依然跟手。',
        points: [
          '左右或上下分屏，第二个窗格复用同一条 SSH 连接',
          '10 套精调配色：Dracula、Nord、Tokyo Night、Catppuccin 等',
          '识别 Shell 提示符，按主机保存命令历史，一键重发',
          '终端内搜索，支持正则与大小写匹配',
          '内置 ZMODEM，终端里直接 rz / sz 收发文件',
          '本地终端与 WSL 发行版，和远程会话并排打开'
        ]
      },
      files: {
        tag: '文件',
        title: '文件，就在终端旁边。',
        desc: 'SFTP 面板停靠在终端下方，本地与远程双栏对照。终端 cd 到哪里，文件列表就跟到哪里。',
        points: [
          '双栏之间拖拽传输，也能直接从系统文件管理器拖入',
          '跟随终端当前目录，不用再手动找路径',
          '传输队列支持整目录传输，可随时暂停、继续、取消',
          '双击即可编辑远程文件，约 35 种语言语法高亮',
          '图形化修改权限，八进制输入与常用预设',
          'FTP / FTPS、WebDAV、S3 也可作为独立文件主机打开，S3 内置 AWS、阿里云 OSS、腾讯云 COS、七牛云 Kodo、MinIO 预设'
        ]
      },
      desktop: {
        tag: '远程桌面',
        title: '远程桌面，也在同一排标签页。',
        desc: '内置 RDP 与 VNC 客户端。连一台 Windows 服务器，和连一台 Linux 主机一样简单。',
        points: [
          'RDP 支持 NLA 与 TLS，可按网络状况选择画质档位',
          '剪贴板双向同步，RDP 下文件也能直接复制粘贴',
          '远程分辨率随窗口自适应，支持全屏、适应窗口与 1:1 显示',
          'VNC 支持 Tight / ZRLE 编码，最高 60 帧',
          '剪贴板可选 GBK、Big5、Shift_JIS 等字符集',
          '一键发送 Ctrl+Alt+Del，标签页实时显示延迟与吞吐'
        ]
      },
      monitor: {
        tag: '监控',
        title: '服务器状态，一眼看清。',
        desc: '连上即开始采集，服务器上无需安装任何代理程序。CPU、内存、磁盘、网络实时刷新，适用于 Linux 主机。',
        points: [
          'CPU、内存与 Swap、根分区、网络收发、系统负载与运行时长',
          '完整进程列表，支持筛选与一键结束进程',
          '诊断面板：top、df、netstat、journalctl 等常用命令一键发送到终端',
          '采样间隔可按主机单独设置',
          '面板收起后，状态栏仍持续显示关键指标'
        ]
      },
      assistant: {
        tag: 'AI 助手',
        title: '一个懂服务器的 AI 助手。',
        desc: '说出你想做什么，助手会规划步骤，在当前会话里执行命令、读取输出，一步步把问题查清。每条命令都先经你确认。',
        points: [
          '兼容 OpenAI 与 Anthropic 接口，内置 OpenAI、Claude、DeepSeek、智谱 GLM、通义千问预设',
          '支持自定义接口地址，接入你自己的模型服务',
          '在当前 SSH 会话中执行命令并读取结果',
          '默认逐条确认，也可切换为全自动模式',
          '截图直接粘贴，让视觉模型帮你看报错',
          '对话记录只保存在本机'
        ]
      },
      network: {
        tag: '组网与转发',
        title: '没有公网 IP，也能连上。',
        desc: '内置 EasyTier 组网：家里的 NAS、公司的工作站、云上的服务器，组成一张虚拟局域网。能打洞就直连，打不通就中继。',
        points: [
          'P2P 组网：虚拟 IP、NAT 穿透、子网代理',
          '无需管理员权限的 SOCKS5 模式，也可使用虚拟网卡',
          '节点状态一目了然：直连或中继、延迟、丢包、流量',
          '主机可设为「经组网」连接，打开时自动入网',
          '端口转发：本地 -L、远程 -R、动态 SOCKS5 -D，连接后自动启用',
          '每条规则实时显示流量与连接数，可一键复制等效 ssh 命令'
        ]
      }
    },
    schemeLabel: '终端配色',
    schemeHint: '点击切换，均为应用内置配色'
  },
  more: {
    eyebrow: '细节',
    title: '还有很多细节。',
    items: [
      {
        icon: 'vault',
        title: '凭据库',
        desc: '密码、SSH 密钥与 API 令牌集中管理，支持分组、标签与星标，新建主机时一键填入。'
      },
      {
        icon: 'key',
        title: '密钥与密码生成',
        desc: '生成 Ed25519、RSA-4096、ECDSA P-384 密钥，以及带强度提示的随机密码。'
      },
      {
        icon: 'backup',
        title: '加密备份',
        desc: '定时备份到 WebDAV 或 S3，可选 AES-256-GCM 加密，保留多份快照，随时恢复。'
      },
      {
        icon: 'fingerprint',
        title: '主机指纹校验',
        desc: '首次连接展示 SHA-256 指纹，确认后记住；受信主机可集中查看与管理。'
      },
      {
        icon: 'command',
        title: '命令面板',
        desc: '⌘K / Ctrl+K 搜索主机、切换视图、执行动作，手不离键盘。'
      },
      {
        icon: 'snippet',
        title: '代码片段',
        desc: '用 {{参数}} 写好常用命令，发送前填空；内置 Docker、Nginx、MySQL 等模板。'
      },
      {
        icon: 'hosts',
        title: '主机管理',
        desc: '分组、标签、按协议筛选、拖拽排序；卡片上实时显示在线状态与延迟。'
      },
      {
        icon: 'tray',
        title: '托盘常驻',
        desc: '关闭窗口即收进托盘，会话不断开；重复启动会直接唤起已有窗口。'
      },
      {
        icon: 'language',
        title: '双语与主题',
        desc: '中文与 English 界面，深浅色跟随系统，也可手动切换。'
      }
    ]
  },
  download: {
    eyebrow: '下载',
    title: '免费下载，开箱即用。',
    desc: '支持 Windows、macOS 与 Linux，每个平台都提供 x64 与 ARM64 原生版本。',
    recommended: '为你推荐',
    other: '全部平台',
    kinds: {
      installer: '安装程序',
      portable: '免安装版',
      dmg: '磁盘映像',
      deb: 'Debian / Ubuntu',
      rpm: 'Fedora / RHEL',
      archive: '压缩包'
    },
    arch: {
      x64: 'x64',
      arm64: 'ARM64',
      macArm64: 'Apple 芯片',
      macX64: 'Intel 芯片'
    },
    requirements: {
      windows: 'Windows 10 / 11',
      macos: 'macOS 10.15 及以上',
      linux: 'deb / rpm 发行版'
    },
    macTip: '首次打开若被系统拦截，请前往「系统设置 → 隐私与安全性」，点按「仍要打开」。',
    loading: '正在获取最新版本…',
    error: '暂时无法获取版本信息，请前往 GitHub 下载。',
    empty: {
      title: '首个正式版即将发布',
      desc: '安装包发布到 GitHub Releases 后会自动出现在这里。先去 Star 一下，第一时间获得更新通知。',
      cta: '前往 GitHub'
    },
    releaseNotes: '发行说明',
    publishedOn: '{date} 发布',
    noAsset: '该平台暂无安装包'
  },
  changelog: {
    eyebrow: '更新日志',
    title: '一直在变好。',
    desc: '每一个版本的变化，都记录在这里。',
    empty: '还没有发布记录，首个版本即将到来。',
    error: '暂时无法获取更新日志。',
    viewAll: '在 GitHub 查看全部版本',
    expand: '展开全部',
    collapse: '收起',
    latest: '最新',
    prerelease: '预览版'
  },
  footer: {
    tagline: '集大成者',
    desc: '原生跨平台的 SSH 与远程连接工作台。',
    product: '产品',
    community: '社区',
    repo: '源代码',
    issues: '问题反馈',
    releases: '发行版本',
    copyright: '© {year} WinSSH Pro 贡献者',
    backToTop: '回到顶部'
  }
}

export type Dict = typeof zh

const en: Dict = {
  meta: {
    title:
      'WinSSH Pro — All in One. All Native. · The native cross-platform SSH & remote workspace',
    description:
      'WinSSH Pro is built in Rust: SSH, SFTP, FTP, S3, WebDAV, RDP, VNC, Telnet, serial and EasyTier mesh networking, plus server monitoring and an AI assistant, in one native app. 120 FPS GPU rendering. Free and open source for Windows, macOS and Linux.'
  },
  nav: {
    connections: 'Connections',
    performance: 'Performance',
    features: 'Features',
    download: 'Download',
    changelog: 'Changelog',
    github: 'GitHub',
    downloadCta: 'Download',
    menu: 'Menu',
    language: '切换到中文'
  },
  hero: {
    kicker: '集大成者',
    title: ['All in One.', 'All Native.'],
    desc: [
      'Terminal, files, remote desktops, mesh networking and an AI assistant, gathered into one native app.',
      'Built in Rust, rendered at 120 FPS, on Windows, macOS and Linux.'
    ],
    ctaDownload: 'Download for {os}',
    ctaDownloadGeneric: 'Download free',
    ctaGithub: 'View on GitHub',
    released: '{version} is out',
    comingSoon: 'First release coming soon',
    meta: 'Free & open source · native x64 and ARM64 builds',
    screenshotAlt: 'WinSSH Pro: host list, SSH terminal, resource monitor and SFTP file panel'
  },
  protocols: {
    ssh: 'SSH',
    sftp: 'SFTP',
    ftp: 'FTP',
    s3: 'S3',
    webdav: 'WebDAV',
    rdp: 'RDP',
    vnc: 'VNC',
    telnet: 'Telnet',
    serial: 'Serial',
    easytier: 'EasyTier',
    local: 'Local shell',
    wsl: 'WSL'
  },
  allInOne: {
    eyebrow: 'All in one',
    title: 'Ten protocols. One window.',
    desc: 'From Linux servers to Windows desktops, from object storage to serial consoles, every connection lives in the same host list and opens in the same row of tabs.',
    groups: [
      {
        key: 'shell',
        title: 'Shells',
        desc: 'Remote and local shells on the same terminal core.',
        items: ['SSH', 'Telnet', 'Serial', 'Local shell', 'WSL']
      },
      {
        key: 'files',
        title: 'Files',
        desc: 'Servers, network drives and object storage in one file panel.',
        items: ['SFTP', 'FTP / FTPS', 'WebDAV', 'S3']
      },
      {
        key: 'desktop',
        title: 'Desktops',
        desc: 'Windows and Linux desktops, right inside a tab.',
        items: ['RDP', 'VNC']
      },
      {
        key: 'network',
        title: 'Networks',
        desc: 'Mesh, forwarding and proxies for the hosts that are hard to reach.',
        items: ['EasyTier mesh', 'Port forwarding', 'SOCKS5 proxy']
      }
    ]
  },
  performance: {
    eyebrow: 'Native performance',
    title: ['120 frames a second.', '8.3 ms a frame.'],
    desc: 'WinSSH Pro is written in Rust on GPUI, the open-source UI framework from the Zed team, and drawn directly by your GPU. No browser engine, no DOM. Rendering targets 120 FPS, which leaves each frame a budget of 8.3 ms.',
    second: '1 second',
    frames: '120 frames',
    frame: '8.3 ms per frame',
    gpuTitle: 'Native graphics on every platform',
    stackTitle: 'Built on',
    fpsTip: 'See it for yourself: turn on the frame-rate monitor in Settings → General.'
  },
  features: {
    eyebrow: 'Features',
    title: 'Complete is the start. Polished is the point.',
    desc: 'Every capability is held to the standard of a dedicated professional tool, not tacked on to fill a checklist.',
    chapters: {
      terminal: {
        tag: 'Terminal',
        title: 'A terminal that keeps up.',
        desc: 'Built on the alacritty terminal core and drawn frame by frame on the GPU. Floods of logs scroll by while your keystrokes stay instant.',
        points: [
          'Side-by-side or stacked splits; the second pane reuses the same SSH connection',
          '10 tuned color schemes: Dracula, Nord, Tokyo Night, Catppuccin and more',
          'Prompt-aware command history saved per host, re-run in one click',
          'In-terminal search with regex and case matching',
          'Built-in ZMODEM: rz / sz files right inside the terminal',
          'Local shells and WSL distros open right next to remote sessions'
        ]
      },
      files: {
        tag: 'Files',
        title: 'Files, right beside the shell.',
        desc: 'The SFTP panel docks under the terminal with local and remote side by side. Wherever you cd, the file list follows.',
        points: [
          'Drag between panes, or straight in from your OS file manager',
          'Follow the terminal’s working directory; no more hunting for paths',
          'A transfer queue for whole folders, with pause, resume and cancel',
          'Double-click to edit remote files, with highlighting for ~35 languages',
          'Visual chmod with octal input and common presets',
          'Open FTP / FTPS, WebDAV and S3 as file hosts too, with presets for AWS, Alibaba Cloud OSS, Tencent COS, Qiniu Kodo and MinIO'
        ]
      },
      desktop: {
        tag: 'Remote desktop',
        title: 'Remote desktops, in the same tabs.',
        desc: 'Built-in RDP and VNC clients. Reaching a Windows server is as easy as reaching a Linux box.',
        points: [
          'RDP with NLA and TLS, plus quality presets for every network',
          'Two-way clipboard, including files over RDP',
          'Remote resolution follows the window: fullscreen, fit-to-window or 1:1',
          'VNC with Tight / ZRLE encodings at up to 60 fps',
          'Clipboard charsets including GBK, Big5 and Shift_JIS',
          'One-click Ctrl+Alt+Del; live latency and throughput in every tab'
        ]
      },
      monitor: {
        tag: 'Monitoring',
        title: 'Server health at a glance.',
        desc: 'Metrics start flowing the moment you connect, with nothing to install on the server. CPU, memory, disk and network update live on Linux hosts.',
        points: [
          'CPU, memory and swap, root disk, network I/O, load average and uptime',
          'A full process list with filtering and one-click kill',
          'A diagnostics tab that sends top, df, netstat, journalctl and more to the terminal',
          'Per-host sampling intervals',
          'Collapse the panel and the status bar keeps the key numbers in view'
        ]
      },
      assistant: {
        tag: 'AI assistant',
        title: 'An AI assistant that knows your servers.',
        desc: 'Describe what you need. The assistant plans the steps, runs commands in your current session, reads the output and works the problem through, asking before every command.',
        points: [
          'OpenAI- and Anthropic-compatible, with presets for OpenAI, Claude, DeepSeek, Zhipu GLM and Qwen',
          'Custom endpoints for your own model service',
          'Runs commands in the active SSH session and reads the results',
          'Approve each command, or switch to fully automatic mode',
          'Paste screenshots and let a vision model read the error',
          'Conversations stay on your machine'
        ]
      },
      network: {
        tag: 'Networking',
        title: 'No public IP? Still connected.',
        desc: 'Built-in EasyTier mesh networking turns your home NAS, office workstation and cloud servers into one virtual LAN: direct when NAT allows, relayed when it doesn’t.',
        points: [
          'P2P mesh with virtual IPs, NAT traversal and subnet proxy',
          'A SOCKS5 mode that needs no admin rights, or a full virtual NIC',
          'Live peer status: direct or relayed, latency, loss and traffic',
          'Route any host through the mesh; it joins automatically on connect',
          'Port forwarding: local -L, remote -R and dynamic SOCKS5 -D, started on connect',
          'Per-rule traffic and connection counters, plus copy-as-ssh-command'
        ]
      }
    },
    schemeLabel: 'Color scheme',
    schemeHint: 'Click to switch. All ship with the app.'
  },
  more: {
    eyebrow: 'Details',
    title: 'And all the details.',
    items: [
      {
        icon: 'vault',
        title: 'Credential vault',
        desc: 'Passwords, SSH keys and API tokens in one place: grouped, tagged, starred, and one click away from any host form.'
      },
      {
        icon: 'key',
        title: 'Key & password generator',
        desc: 'Generate Ed25519, RSA-4096 and ECDSA P-384 keys, plus strong passwords with a strength meter.'
      },
      {
        icon: 'backup',
        title: 'Encrypted backups',
        desc: 'Scheduled backups to WebDAV or S3 with optional AES-256-GCM encryption, multiple snapshots and easy restore.'
      },
      {
        icon: 'fingerprint',
        title: 'Host key verification',
        desc: 'See the SHA-256 fingerprint on first connect, then it’s remembered. Review trusted hosts in one place.'
      },
      {
        icon: 'command',
        title: 'Command palette',
        desc: '⌘K / Ctrl+K to find hosts, switch views and run actions without leaving the keyboard.'
      },
      {
        icon: 'snippet',
        title: 'Snippets',
        desc: 'Save commands with {{placeholders}} and fill them in before sending. Docker, Nginx and MySQL templates included.'
      },
      {
        icon: 'hosts',
        title: 'Host management',
        desc: 'Groups, tags, protocol filters and drag-to-reorder, with live status and latency on every card.'
      },
      {
        icon: 'tray',
        title: 'Lives in the tray',
        desc: 'Close the window and it tucks into the tray with sessions intact. Launch it again and the existing window comes forward.'
      },
      {
        icon: 'language',
        title: 'Bilingual, light & dark',
        desc: 'Chinese and English UI, with light and dark themes that follow your system.'
      }
    ]
  },
  download: {
    eyebrow: 'Download',
    title: 'Free to download. Ready to go.',
    desc: 'Available for Windows, macOS and Linux, with native x64 and ARM64 builds for every platform.',
    recommended: 'Recommended for you',
    other: 'All platforms',
    kinds: {
      installer: 'Installer',
      portable: 'Portable',
      dmg: 'Disk image',
      deb: 'Debian / Ubuntu',
      rpm: 'Fedora / RHEL',
      archive: 'Archive'
    },
    arch: {
      x64: 'x64',
      arm64: 'ARM64',
      macArm64: 'Apple silicon',
      macX64: 'Intel'
    },
    requirements: {
      windows: 'Windows 10 / 11',
      macos: 'macOS 10.15 or later',
      linux: 'deb / rpm distributions'
    },
    macTip:
      'If macOS blocks the first launch, open System Settings → Privacy & Security and click “Open Anyway”.',
    loading: 'Fetching the latest release…',
    error: 'Couldn’t load release info right now. Please download from GitHub.',
    empty: {
      title: 'First release coming soon',
      desc: 'Installers will show up here as soon as they’re published on GitHub Releases. Star the repo to hear about it first.',
      cta: 'Go to GitHub'
    },
    releaseNotes: 'Release notes',
    publishedOn: 'Released {date}',
    noAsset: 'No build for this platform yet'
  },
  changelog: {
    eyebrow: 'Changelog',
    title: 'Always getting better.',
    desc: 'Every release, and what changed.',
    empty: 'No releases yet. The first one is on its way.',
    error: 'Couldn’t load the changelog right now.',
    viewAll: 'See all releases on GitHub',
    expand: 'Show all',
    collapse: 'Show less',
    latest: 'Latest',
    prerelease: 'Pre-release'
  },
  footer: {
    tagline: 'All in One. All Native.',
    desc: 'The native, cross-platform SSH and remote workspace.',
    product: 'Product',
    community: 'Community',
    repo: 'Source code',
    issues: 'Issues',
    releases: 'Releases',
    copyright: '© {year} WinSSH Pro contributors',
    backToTop: 'Back to top'
  }
}

export const translations = { zh, en }

export function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match))
}
