export const translations = {
  en: {
    nav: {
      features: 'Features',
      showcase: 'Interactive Demo',
      performance: 'Benchmarks',
      architecture: 'Architecture',
      sync: 'Cross-Platform',
      download: 'Download Pro',
      changelog: 'Changelog'
    },
    hero: {
      badge: 'WinSSH Pro 3.0 Released · Native Rust + GPUI · 120+ FPS & DevOps AI',
      tagline: 'The Next-Gen Native SSH Intelligence Hub',
      title: ['120+ FPS Native Rust.', 'Intelligence in Every Keystroke.'],
      desc: 'Say goodbye to sluggish Electron wrappers. WinSSH Pro is re-engineered from the ground up with 100% pure Rust, GPUI, and Alacritty kernel. Enjoy a strict 8.3ms frame budget, 85% reduced memory usage, synchronized SFTP, and an infrastructure-aware DevOps AI Copilot.',
      ctaDownload: 'Download WinSSH Pro',
      ctaDemo: 'Explore Live UI Demo',
      github: 'GitHub',
      chips: [
        'Rust + GPUI 120 FPS',
        '8.3ms Frame Budget',
        '< 50MB Idle RAM',
        'DevOps AI Copilot',
        'CWD-Synced SFTP',
        'Hardware Crypto (aws-lc-rs)'
      ]
    },
    showcase: {
      badge: 'Interactive Prototype',
      titleLevel1: 'Reimagined from the inside out,',
      titleLevel2: 'crafted for modern DevOps.',
      desc: 'Experience the WinSSH Pro desktop interface directly in your browser. Switch views, inspect real-time server telemetry, trigger AI diagnostics, and explore synchronized SFTP.',
      tabs: {
        terminal: 'Terminal & Split',
        telemetry: 'Real-Time Telemetry',
        sftp: 'Bi-directional SFTP',
        copilot: 'DevOps AI Copilot',
        vault: 'Credential Vault'
      },
      status: {
        connected: 'Connected',
        latency: '14ms',
        fps: '120.0 FPS',
        frameTime: '8.3ms',
        unlocked: 'Vault Decrypted'
      },
      copilot: {
        title: 'DevOps AI Copilot',
        model: 'Gemini 2.5 Pro',
        targetHost: 'Prod-K8s-Master-01 (Ubuntu 24.04)',
        placeholder: 'Ask Copilot (e.g. diagnose high CPU or inspect slow Postgres queries)...',
        send: 'Send',
        runInSsh: 'Run in SSH',
        copied: 'Copied',
        copy: 'Copy',
        sampleQuery: 'Diagnose high CPU usage and active zombie processes on current node',
        sampleResponse:
          'Analysis of Prod-K8s-Master-01 telemetry indicates CPU spike driven by containerd worker thread. Here is the diagnostic pipeline command to inspect top cgroup consumers:',
        sampleCode: 'ps -eo pid,ppid,%cpu,%mem,cmd --sort=-%cpu | head -n 8\nsudo crictl stats',
        quickPrompts: [
          '🔍 Explain Logs',
          '🛡️ Audit Security',
          '🐳 Optimize Docker',
          '⚡ Sysctl Tuning'
        ]
      },
      terminal: {
        nodeInfo: 'root@Prod-K8s-Master-01',
        uptime: 'Uptime: 32 days, 10h | Kernel: 6.8.0-45-generic | Arch: x86_64',
        cmdPlaceholder: 'Type a command (or click quick chips below)...',
        quickCommands: ['neofetch', 'docker ps', 'kubectl get nodes', 'free -h', 'top -b -n 1']
      },
      telemetry: {
        cpuUsage: 'CPU Usage',
        memUsage: 'Memory (RAM)',
        diskUsage: 'Disk Storage',
        netTraffic: 'Network I/O',
        topProcesses: 'Top Active Processes',
        dockerContainers: 'Container Pods & Status'
      },
      sftp: {
        remotePath: 'Remote: /var/log/kubernetes',
        localPath: 'Local: ~/Downloads/cluster-dumps',
        transferSpeed: '128.4 MB/s',
        transferred: '2.4 GB / 3.0 GB (80%)',
        cwdSyncActive: 'Auto-tracking Terminal CWD'
      }
    },
    benchmarks: {
      badge: 'Uncompromising Performance',
      titleLevel1: 'The Native Rust Revolution,',
      titleLevel2: 'shattering Electron limits.',
      desc: 'We ditched the heavy web engine and rewrote WinSSH Pro with Rust and GPUI. The results speak for themselves: ultra-fluid 120 FPS, lightning startup, and razor-thin resource consumption.',
      whyFpsTitle: 'Why 8.3ms Frame Budget Matters',
      whyFpsDesc:
        'Standard 60fps terminals allow 16.6ms per frame, often dropping frames during heavy outputs (like `docker build` or high-throughput log tailing). WinSSH Pro maintains 120+ FPS with an 8.3ms frame budget, ensuring buttery-smooth scrolling without input latency.',
      headers: {
        metric: 'Benchmark Metric',
        winsshPro: 'WinSSH Pro (Rust + GPUI)',
        oldWinssh: 'Old WinSSH (Electron)',
        traditional: 'Legacy Clients (Xshell/Termius)'
      },
      rows: [
        {
          metric: 'Rendering Frame Rate',
          pro: '120+ FPS (Hardware GPU)',
          proBadge: '2x Smoother',
          old: '60 FPS (Capped)',
          trad: '30 - 60 FPS'
        },
        {
          metric: 'Frame Budget / Latency',
          pro: '8.3 ms (Strict Bound)',
          proBadge: 'Zero Lag',
          old: '16.6 ms - 50 ms+',
          trad: 'Variable (20 - 60 ms)'
        },
        {
          metric: 'Idle Memory Consumption',
          pro: '~42 MB (Pure Rust)',
          proBadge: '-89% RAM',
          old: '~420 MB (Chromium V8)',
          trad: '~180 - 320 MB'
        },
        {
          metric: 'Cold Startup Time',
          pro: '< 85 ms (Instant)',
          proBadge: '30x Faster',
          old: '~2,800 ms (Node + DOM)',
          trad: '~1,200 ms'
        },
        {
          metric: 'High-Volume Stream Tailing',
          pro: '100,000 lines/s zero freeze',
          proBadge: 'Alacritty Core',
          old: 'UI stuttering / GC spikes',
          trad: 'Buffer truncation'
        },
        {
          metric: 'Cryptographic Backend',
          pro: 'Hardware aws-lc-rs (AES-NI)',
          proBadge: 'Fastest',
          old: 'Node crypto (JS bridge)',
          trad: 'Standard OpenSSL'
        },
        {
          metric: 'AI Shell Intelligence',
          pro: 'Built-in DevOps AI Copilot',
          proBadge: 'Context Aware',
          old: 'None',
          trad: 'None or Paid Add-on'
        }
      ]
    },
    features: {
      badge: 'Engineered for Excellence',
      titleLevel1: 'Engineered for absolute speed,',
      titleLevel2: 'intelligence & control.',
      desc: 'WinSSH Pro brings together native systems engineering and modern cloud-native workflows into one cohesive, beautiful workspace.',
      items: [
        {
          tag: 'Rendering Engine',
          title: '120+ FPS Native GPUI Rendering',
          desc: 'Direct GPU hardware-accelerated pipeline built on Rust and GPUI. With an 8.3ms frame budget, text rendering and viewport redraws are effortlessly fluid under heavy terminal throughput.'
        },
        {
          tag: 'Intelligence',
          title: 'DevOps AI Copilot',
          desc: 'Context-aware infrastructure AI that inspects host OS, active user, shell history, and error logs. Converts natural language queries into verified bash scripts with one-click terminal execution.'
        },
        {
          tag: 'Real-Time Observability',
          title: 'Telemetry & Process / Container Hub',
          desc: 'Live side dashboard monitoring CPU, memory, NVMe disk, and network throughput. Includes a process manager with kill commands and Docker container status without installing heavy remote daemons.'
        },
        {
          tag: 'File Transfers',
          title: 'Bi-Directional SFTP & CWD Tracking',
          desc: 'Bottom drawer file manager that auto-follows your terminal directory changes (`cd /etc/nginx` syncs remote file view instantly). High-speed multi-threaded transfer queue with pause and resume.'
        },
        {
          tag: 'Security & Vault',
          title: 'Zero-Knowledge Credential Vault',
          desc: 'End-to-end AES-256-GCM encrypted vault for SSH keys (Ed25519, RSA 4096, ECDSA), passwords, and API tokens. Integrated key generator and one-click public key deployment to remote servers.'
        },
        {
          tag: 'DevOps Efficiency',
          title: 'Parametric Snippets & Visual Tunnels',
          desc: 'Curated library of parameterized DevOps snippets (Docker, K8s, Nginx, PostgreSQL, UFW). Visual management for Local, Remote, and SOCKS5 Dynamic SSH tunnels with live bandwidth graphs.'
        }
      ]
    },
    architecture: {
      badge: 'Under the Hood',
      titleLevel1: 'Pure Native Architecture,',
      titleLevel2: 'zero legacy baggage.',
      desc: 'How WinSSH Pro achieves unprecedented stability, speed, and safety by leveraging the modern Rust systems stack.',
      cards: [
        {
          title: 'GPUI & gpui-kit UI Framework',
          desc: 'Pioneered by Zed, GPUI bypasses the DOM completely and renders directly to Metal, DirectX 12, or Vulkan. Every visual element is computed with zero runtime overhead.',
          tech: 'GPUI · gpui-kit · Metal · Vulkan'
        },
        {
          title: 'Alacritty VT Terminal Kernel',
          desc: 'Zed-grade Alacritty terminal engine fork providing world-class VT parser compatibility, GPU glyph atlas caching, and sub-millisecond keyboard response times.',
          tech: 'alacritty_terminal · PTY · Unicode 15'
        },
        {
          title: 'Tokio Async + russh + aws-lc-rs',
          desc: 'Multi-threaded asynchronous event loop powered by Tokio. Cryptographic handshakes and SSH transport are backed by AWS-LC-RS with hardware AES-NI / ARM NEON acceleration.',
          tech: 'russh 0.63 · aws-lc-rs · Tokio'
        },
        {
          title: 'Embedded SeaORM & Local SQLite',
          desc: 'All connection profiles, groups, tags, and credential vaults are stored in an embedded SQLite database managed via SeaORM. Zero external server dependencies.',
          tech: 'SeaORM · SQLite · AES-256-GCM'
        }
      ]
    },
    sync: {
      badge: 'Decentralized & Private',
      titleLevel1: 'Secure Data Sync',
      titleLevel2: 'without vendor lock-in.',
      desc: 'Seamlessly backup and synchronize your connection profiles, key pairs, and custom configurations across all your desktop workstations using your own WebDAV server with zero-knowledge end-to-end encryption.',
      desktop: 'Available for Windows, macOS, and Linux',
      webdav: '100% private data sync via WebDAV or local export',
      encrypted: 'Zero-knowledge client-side encryption'
    },
    download: {
      badge: 'Get Started',
      titleLevel1: 'Upgrade to WinSSH Pro,',
      titleLevel2: 'experience the difference.',
      desc: 'Download the native WinSSH Pro binary for your platform. 100% free and open-source forever, with zero telemetry or paid walls.',
      versionLabel: 'Latest Stable: v3.0.0 Pro',
      modalMacTitle: 'Choose Mac Architecture',
      modalLinuxTitle: 'Choose Linux Package Format',
      modalMacAppleSilicon: 'Apple Silicon (M1/M2/M3/M4)',
      modalMacAppleSiliconDesc: 'Native ARM64 build for modern Apple Silicon Macs',
      modalMacIntel: 'Intel x86_64',
      modalMacIntelDesc: 'Optimized build for Intel-based Macs',
      modalLinuxDeb: 'Debian / Ubuntu (.deb)',
      modalLinuxDebDesc: 'For Debian, Ubuntu, Linux Mint, Pop!_OS',
      modalLinuxAppImage: 'Universal (.AppImage)',
      modalLinuxAppImageDesc: 'Standalone executable, runs on all Linux distributions',
      modalCancel: 'Cancel',
      platforms: {
        macos: {
          name: 'macOS',
          desc: 'macOS 11.0 Big Sur or later.',
          arch: 'Universal (Apple Silicon & Intel)',
          btn: 'Download for macOS'
        },
        windows: {
          name: 'Windows',
          desc: 'Windows 10 / 11 (64-bit).',
          arch: 'x64 Native Installer & Portable',
          btn: 'Download for Windows'
        },
        linux: {
          name: 'Linux',
          desc: 'Ubuntu, Debian, Fedora, Arch.',
          arch: '.deb / AppImage / Flatpak',
          btn: 'Download for Linux'
        }
      }
    },
    changelogSection: {
      badge: 'Changelog',
      titleLevel1: 'Release',
      titleLevel2: 'History.',
      desc: 'Explore our journey from early experimentation to the groundbreaking WinSSH Pro release.',
      showMore: 'Read full notes',
      showLess: 'Show less',
      loadMore: 'Load more releases',
      viewAllOnGithub: 'View all releases on GitHub',
      versions: [
        {
          version: 'v3.0.0 Pro',
          date: 'September 2026',
          isMajor: true,
          badge: 'Major Pro Release',
          changes: [
            '🚀 Full architectural rewrite: Replaced Electron with 100% pure Rust + GPUI + russh.',
            '⚡ 120+ FPS native hardware-accelerated rendering with a strict 8.3ms per-frame budget.',
            '🤖 Introduced DevOps AI Copilot with shell context awareness, natural language to bash, and error diagnostics.',
            '📊 Integrated real-time Host Telemetry panel (CPU/RAM/Disk/Network, Top processes, Docker containers).',
            '📁 Built-in Bi-Directional SFTP drawer with automatic Terminal CWD auto-tracking.',
            '🔐 Added Multi-tier Credential Vault with Ed25519/RSA-4096 key generator and AES-256-GCM encryption.',
            '📉 Reduced idle memory consumption from 420MB down to ~42MB (89% memory savings).',
            '⚡ Lightning cold startup: Launches in under 85ms on modern desktop systems.'
          ]
        },
        {
          version: 'v2.0.0',
          date: 'October 2023',
          isMajor: false,
          badge: 'Legacy Version',
          changes: [
            'Added cross-platform sync across macOS, Windows, and Linux via WebDAV.',
            'Introduced zero-knowledge encryption for connection profiles.',
            'WebGL terminal rendering overhaul.'
          ]
        },
        {
          version: 'v1.5.0',
          date: 'August 2023',
          isMajor: false,
          badge: 'Legacy Version',
          changes: [
            'Added multi-session management and host grouping.',
            'Improved auto-reconnect reliability and keepalive.',
            'Fixed connection drop issues under poor network conditions.'
          ]
        },
        {
          version: 'v1.0.0',
          date: 'May 2023',
          isMajor: false,
          badge: 'Legacy Version',
          changes: [
            'Initial public release of WinSSH.',
            'Basic SSH terminal emulation with custom themes.',
            'Public key authentication support.'
          ]
        }
      ]
    },
    footer: {
      desc: 'WinSSH Pro is a high-performance native Rust SSH client with built-in DevOps AI Copilot, 120+ FPS GPUI rendering, and real-time host telemetry. Designed for ops and developer geeks.',
      product: 'Product',
      dl: 'Download Pro',
      demo: 'Interactive Demo',
      benchmarks: 'Benchmarks',
      changelog: 'Changelog',
      resources: 'Resources',
      docs: 'Documentation',
      community: 'Community',
      github: 'GitHub',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: '© {year} WinSSH Pro. All rights reserved.',
      slogan: '120+ FPS Native Rust · Built for Absolute Speed.'
    }
  },
  zh: {
    nav: {
      features: '核心功能',
      showcase: '原型体验',
      performance: '性能对比',
      architecture: '技术架构',
      sync: '跨端同步',
      download: '下载 Pro 版',
      changelog: '更新日志'
    },
    hero: {
      badge: 'WinSSH Pro 3.0 重磅发布 · 原生 Rust + GPUI · 120+ FPS 与 DevOps AI',
      tagline: '下一代原生高性能 SSH 智能运维工作台',
      title: ['120+ FPS 极致原生流畅，', '赋能云原生与智能化运维。'],
      desc: '彻底告别臃肿卡顿的 Electron 包装壳！WinSSH Pro 采用 100% 纯 Rust、GPUI 与 Alacritty 终端内核全方位重构。单帧渲染严格压缩至 8.3ms，内存占用骤减 85%，深度集成基础设施感知的 DevOps AI 助手、实时全景监控与会话级联动 SFTP。',
      ctaDownload: '免费下载 WinSSH Pro',
      ctaDemo: '在线体验交互原型',
      github: 'GitHub 开源',
      chips: [
        'Rust + GPUI 120 FPS',
        '8.3ms 单帧预算',
        '< 50MB 极低内存',
        'DevOps AI 智能助手',
        '终端联动 SFTP',
        '硬件加速加密 (aws-lc-rs)'
      ]
    },
    showcase: {
      badge: '交互式产品原型演示',
      titleLevel1: '由内而外全面重塑，',
      titleLevel2: '为专业开发者与运维而生。',
      desc: '在网页端直接体验 WinSSH Pro 桌面端真实界面布局。随意切换视图、查看实时服务器资源监控波形、调用 AI Copilot 智能排障与联动文件管理。',
      tabs: {
        terminal: '终端与分屏',
        telemetry: '实时资源全景监控',
        sftp: '会话级联动 SFTP',
        copilot: 'DevOps AI 智能助手',
        vault: '安全凭据保险箱'
      },
      status: {
        connected: '已安全连接',
        latency: '14ms',
        fps: '120.0 FPS',
        frameTime: '8.3ms',
        unlocked: '保险箱已解锁'
      },
      copilot: {
        title: 'DevOps AI Copilot',
        model: 'Gemini 2.5 Pro',
        targetHost: 'Prod-K8s-Master-01 (Ubuntu 24.04)',
        placeholder: '向 Copilot 提问（例如：诊断 CPU 飙高原因、排查 Postgres 慢查询）...',
        send: '发送',
        runInSsh: '填入终端并执行',
        copied: '已复制',
        copy: '复制',
        sampleQuery: '诊断当前生产节点 CPU 飙高和僵尸进程原因，并提供排查命令',
        sampleResponse:
          '通过采集到的节点实时监控指标分析，CPU 飙高主要由 containerd 守护进程及容器工作线程引起。以下是快速查看 cgroup 消耗排行的诊断命令：',
        sampleCode: 'ps -eo pid,ppid,%cpu,%mem,cmd --sort=-%cpu | head -n 8\nsudo crictl stats',
        quickPrompts: [
          '🔍 解析系统日志',
          '🛡️ 审计安全防火墙',
          '🐳 清理无用 Docker 镜像',
          '⚡ 调优 Linux 内核网络'
        ]
      },
      terminal: {
        nodeInfo: 'root@Prod-K8s-Master-01',
        uptime: '运行时间: 32 天 10 小时 | 内核: 6.8.0-45-generic | 架构: x86_64',
        cmdPlaceholder: '输入命令（或点击下方快捷操作）...',
        quickCommands: ['neofetch', 'docker ps', 'kubectl get nodes', 'free -h', 'top -b -n 1']
      },
      telemetry: {
        cpuUsage: 'CPU 实时占用',
        memUsage: '内存使用率 (RAM)',
        diskUsage: '磁盘空间分布',
        netTraffic: '网络 I/O 速率',
        topProcesses: 'Top 活跃进程榜单',
        dockerContainers: 'Docker / K8s 容器状态'
      },
      sftp: {
        remotePath: '远端目录: /var/log/kubernetes',
        localPath: '本地目录: ~/Downloads/cluster-dumps',
        transferSpeed: '128.4 MB/s',
        transferred: '2.4 GB / 3.0 GB (80%)',
        cwdSyncActive: '终端 cd 目录自动联动已开启'
      }
    },
    benchmarks: {
      badge: '极致性能实测',
      titleLevel1: '原生 Rust 革命性飞跃，',
      titleLevel2: '全面碾压传统 Electron。',
      desc: '我们摒弃了陈旧笨重的浏览器运行时，全面采用 Rust 语言与 GPUI 渲染引擎。实测数据展现惊人的性能跃升：120+ FPS 极限丝滑、启动毫秒可达、内存占用断崖式下降。',
      whyFpsTitle: '为什么 8.3ms 单帧预算对极客至关重要？',
      whyFpsDesc:
        '传统 60 FPS 终端给每帧留有 16.6ms，在海量日志滚屏（如 tail -f、编译构建输出）时极易出现卡顿丢帧或输入延迟。WinSSH Pro 严格遵循 8.3ms 帧预算，每帧整棵 UI 树硬件级直绘，无论日志吞吐多大，打字与操作始终如丝般顺滑。',
      headers: {
        metric: '核心评测维度',
        winsshPro: 'WinSSH Pro (Rust + GPUI)',
        oldWinssh: '旧版 WinSSH (Electron)',
        traditional: '传统终端 (Xshell/Termius)'
      },
      rows: [
        {
          metric: '界面渲染帧率',
          pro: '120+ FPS (原生 GPU 直绘)',
          proBadge: '2倍流畅度',
          old: '60 FPS (浏览器上限)',
          trad: '30 - 60 FPS'
        },
        {
          metric: '单帧预算 / 输入延迟',
          pro: '8.3 ms (严格预算，零延迟)',
          proBadge: '零卡顿',
          old: '16.6 ms - 50 ms+',
          trad: '不稳定 (20 - 60 ms)'
        },
        {
          metric: '空闲常驻内存',
          pro: '~42 MB (纯 Rust 安全内存)',
          proBadge: '降低 89% 内存',
          old: '~420 MB (Chromium 多进程)',
          trad: '~180 - 320 MB'
        },
        {
          metric: '冷启动响应时间',
          pro: '< 85 ms (瞬时秒开)',
          proBadge: '提速 30 倍',
          old: '~2,800 ms (等待 DOM 挂载)',
          trad: '~1,200 ms'
        },
        {
          metric: '海量日志高速滚屏',
          pro: '10万行/秒 持续平滑无卡死',
          proBadge: 'Alacritty 内核',
          old: '界面冻结 / V8 GC 频繁卡顿',
          trad: '缓冲区截断 / 丢字'
        },
        {
          metric: '加密与传输后端',
          pro: '硬件加速 aws-lc-rs (AES-NI)',
          proBadge: '最高传输速率',
          old: 'Node.js 桥接加密',
          trad: '常规 OpenSSL'
        },
        {
          metric: '智能化运维辅助',
          pro: '内置深度基础设施 AI Copilot',
          proBadge: '上下文感知',
          old: '无',
          trad: '无或需昂贵付费插件'
        }
      ]
    },
    features: {
      badge: '重磅核心能力',
      titleLevel1: '生而强悍，',
      titleLevel2: '极速、智能与全能工作流。',
      desc: 'WinSSH Pro 将现代系统级工程底座与云原生运维场景紧密结合，打造体验极致顺手的终端神器。',
      items: [
        {
          tag: '渲染引擎',
          title: '120+ FPS 原生 GPUI 渲染引擎',
          desc: '基于 Rust 与 GPUI（Zed 编辑器底层框架）深度构建，直接与系统底层 Metal/DirectX/Vulkan GPU 对话。8.3ms 严苛单帧预算，告别输入迟滞与海量输出丢帧。'
        },
        {
          tag: '人工智能',
          title: 'DevOps AI 智能助手 (Copilot)',
          desc: '深度感知当前主机操作系统、登录用户、网络拓扑与终端报错。支持自然语言一键转 Shell/Docker/K8s 指令，自动诊断堆栈崩溃与日志异常，并在沙箱中安全验证。'
        },
        {
          tag: '全景运维监控',
          title: '实时资源监控与进程 / 容器控制台',
          desc: '无需在远端安装重量级探针，内置右侧全景面板实时呈现 CPU、内存、磁盘 I/O 及网络流量波动。内置 Top 活跃进程查杀与 Docker 容器一键启停。'
        },
        {
          tag: '文件交互',
          title: '会话级双向 SFTP 与终端目录联动',
          desc: '终端与底部 SFTP 面板同屏共存，终端中输入 cd 命令时远端文件管理器自动同步跟随跳转。支持断点续传、高速多线程传输队列与 Tree-sitter 35+ 语法高亮内置编辑器。'
        },
        {
          tag: '安全认证',
          title: '零知识企业级安全凭据保险箱',
          desc: '端到端 AES-256-GCM 强加密保险箱，统一纳管各类服务器账号密码、Ed25519 / RSA 4096 / ECDSA SSH 密钥对及 API Token，支持生物识别快速解锁与一键推送到公钥库。'
        },
        {
          tag: '极客效率',
          title: '参数化 DevOps 脚本库与可视化隧道',
          desc: '内置覆盖 Docker、K8s、Nginx、Postgres、防火墙的参数化命令片段（支持 {{port}}、{{domain}} 动态插值）。提供直观的本地、远程与 SOCKS5 动态端口转发隧道管理与流量监测。'
        }
      ]
    },
    architecture: {
      badge: '底层工程揭秘',
      titleLevel1: '纯原生硬核架构，',
      titleLevel2: '不妥协的工程美学。',
      desc: '探究 WinSSH Pro 是如何借助现代化 Rust 工业级技术栈，实现前所未有的高并发、低延迟与内存安全。',
      cards: [
        {
          title: 'GPUI 与 gpui-kit 现代桌面框架',
          desc: '全面摒弃 HTML/CSS 与 DOM 树，采用 Zed 经过实战检验的 GPUI 渲染器，直接将矢量文本与 UI 栅格化至 GPU 显存，每帧计算开销微秒级。',
          tech: 'GPUI · gpui-kit · Metal · Vulkan'
        },
        {
          title: 'Alacritty VT 终端虚拟化内核',
          desc: '集成工业级 Alacritty 终端解析内核，提供像素级精度的 ANSI/VT 序列转义解析、Unicode 15 宽字符支持与字形纹理缓存池。',
          tech: 'alacritty_terminal · PTY 模拟 · 零输入延迟'
        },
        {
          title: 'Tokio 异步运行时 + russh + aws-lc-rs',
          desc: '网络与 SSH2/SFTP 传输跑在 Tokio 异步多线程执行器上；加密底层启用亚马逊 AWS-LC-RS 密码库，利用 CPU 原生 AES-NI 指令集实现吞吐极限。',
          tech: 'russh 0.63 · aws-lc-rs · Tokio'
        },
        {
          title: '嵌入式 SeaORM 与本地 SQLite 存储',
          desc: '所有连接配置、标签组与安全凭据均由 SeaORM 驱动并固化在独立轻量的 SQLite 本地数据库中，无外部环境依赖，随开随用。',
          tech: 'SeaORM · SQLite · AES-256-GCM'
        }
      ]
    },
    sync: {
      badge: '私有无拘束',
      titleLevel1: '通过 WebDAV 实现',
      titleLevel2: '端到端私有数据同步。',
      desc: '在您的所有桌面设备（MacBook、Windows 工作站、Linux 笔电）之间无缝同步主机配置、密钥对和个性化参数。采用零知识客户端加密，数据完全归您私有。',
      desktop: '全面支持 macOS, Windows 与 Linux 原生桌面',
      webdav: '100% 私有化 WebDAV 同步，无任何第三方云收集',
      encrypted: '客户端本地零知识加密'
    },
    download: {
      badge: '立即体验',
      titleLevel1: '准备好升级至',
      titleLevel2: 'WinSSH Pro 体验了吗？',
      desc: '立即获取适用于您操作系统的原生 WinSSH Pro 客户端。完全免费且永久开源，无任何捆绑广告或付费陷阱。',
      versionLabel: '最新正式版: v3.0.0 Pro',
      modalMacTitle: '选择 Mac 处理器架构',
      modalLinuxTitle: '选择 Linux 安装包格式',
      modalMacAppleSilicon: 'Apple Silicon (M1/M2/M3/M4)',
      modalMacAppleSiliconDesc: '专为苹果自研 M 系列芯片深度优化的原生 ARM64 构建版本',
      modalMacIntel: 'Intel 处理器 (x86_64)',
      modalMacIntelDesc: '适用于搭载 Intel 处理器的经典 Mac 机型',
      modalLinuxDeb: 'Debian / Ubuntu (.deb)',
      modalLinuxDebDesc: '适用于 Debian, Ubuntu, Linux Mint, Pop!_OS',
      modalLinuxAppImage: '通用版 (.AppImage)',
      modalLinuxAppImageDesc: '免安装单文件绿色执行档，兼容主流 Linux 发行版',
      modalCancel: '取消',
      platforms: {
        macos: {
          name: 'macOS',
          desc: '需要 macOS 11.0 Big Sur 或更高版本。',
          arch: 'Universal (Apple Silicon & Intel)',
          btn: '下载 macOS 版'
        },
        windows: {
          name: 'Windows',
          desc: '需要 Windows 10 / 11 64位系统。',
          arch: 'x64 原生安装包与便携绿色版',
          btn: '下载 Windows 版'
        },
        linux: {
          name: 'Linux',
          desc: '已在 Ubuntu, Debian, Fedora, Arch 验证。',
          arch: '.deb / AppImage / Flatpak',
          btn: '下载 Linux 版'
        }
      }
    },
    changelogSection: {
      badge: '版本演进',
      titleLevel1: '版本',
      titleLevel2: '更新历史。',
      desc: '见证 WinSSH 从经典版到划时代 Pro 版本的全面进化之旅。',
      showMore: '展开完整日志',
      showLess: '收起',
      loadMore: '加载更多版本',
      viewAllOnGithub: '在 GitHub 上查看全部 Releases',
      versions: [
        {
          version: 'v3.0.0 Pro',
          date: '2026年9月',
          isMajor: true,
          badge: '划时代 Pro 版本',
          changes: [
            '🚀 架构彻底重塑：全面移除 Electron，采用纯 Rust + GPUI + russh 纯原生打造。',
            '⚡ 实现 120+ FPS 原生硬件 GPU 极速渲染，单帧预算严格限制在 8.3ms 以内。',
            '🤖 全新加入 DevOps AI Copilot 智能助手，提供终端上下文感知、自然语言生成 Shell 与实时报错排查。',
            '📊 深度集成主机实时全景监控面板（CPU/内存/磁盘/网络速率波形，Top 进程查杀，Docker 容器治理）。',
            '📁 全新会话级双向 SFTP 底部抽屉，终端与文件管理器实时联动（cd 自动跟随跳转）。',
            '🔐 升级零知识多级安全凭据保险箱，支持 Ed25519/RSA-4096 密钥对生成与 AES-256-GCM 强加密。',
            '📉 内存消耗锐减 89%：常驻空闲内存从 420MB 大幅缩减至 ~42MB。',
            '⚡ 瞬时秒开：冷启动时间提速至 85ms 以内，无任何运行时加载等待。'
          ]
        },
        {
          version: 'v2.0.0',
          date: '2023年10月',
          isMajor: false,
          badge: '历史版本',
          changes: [
            '新增跨平台同步功能（macOS、Windows 和 Linux WebDAV 同步）。',
            '引入针对连接配置和凭据信息的零知识加密。',
            '基于 WebGL 重构旧版终端渲染引擎。'
          ]
        },
        {
          version: 'v1.5.0',
          date: '2023年8月',
          isMajor: false,
          badge: '历史版本',
          changes: [
            '新增多路会话管理与服务器分组功能。',
            '优化了心跳保活与自动重连机制。',
            '修复了弱网环境下连接突然中断的问题。'
          ]
        },
        {
          version: 'v1.0.0',
          date: '2023年5月',
          isMajor: false,
          badge: '历史版本',
          changes: [
            'WinSSH 第一个公开可用版本正式发布。',
            '提供基础 SSH 终端模拟和自定义主题支持。',
            '支持公钥和密码方式的身份验证。'
          ]
        }
      ]
    },
    footer: {
      desc: 'WinSSH Pro 是一款基于纯 Rust 与 GPUI 构建的高性能跨平台 SSH 客户端，内置 DevOps AI 智能助手、120+ FPS 原生渲染与实时全景运维监控。专为运维与开发极客打造。',
      product: '产品',
      dl: '下载 Pro 客户端',
      demo: '在线原型体验',
      benchmarks: '性能实测对比',
      changelog: '更新日志',
      resources: '资源',
      docs: '开发与用户文档',
      community: '开发者社区',
      github: 'GitHub 仓库',
      legal: '法律条款',
      privacy: '隐私政策',
      terms: '服务条款',
      copyright: '© {year} WinSSH Pro. 保留所有权利。',
      slogan: '120+ FPS 原生 Rust 打造 · 为极致速度与智能而生。'
    }
  }
}
