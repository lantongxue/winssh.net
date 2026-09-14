import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  Download as DownloadIcon,
  Command,
  Monitor,
  Terminal,
  Loader2,
  X,
  Apple,
  Cpu,
  Package,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Zap
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useState, useEffect } from 'react'

interface Asset {
  name: string
  browser_download_url: string
}

export function Download() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<'macos' | 'linux' | null>(null)

  useEffect(() => {
    fetch('/api/v1/releases/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.assets)) {
          setAssets(data.assets)
        }
      })
      .catch((e) => console.error('Error fetching release assets for download', e))
      .finally(() => setLoading(false))
  }, [])

  const getDownloadUrl = (type: 'win' | 'mac-arm' | 'mac-x64' | 'linux-deb' | 'linux-appimage') => {
    let match = ''
    if (type === 'win') match = '-x64-Setup.exe'
    if (type === 'mac-arm') match = '-arm64.dmg'
    if (type === 'mac-x64') match = '-x64.dmg'
    if (type === 'linux-deb') match = '-amd64.deb'
    if (type === 'linux-appimage') match = '-x86_64.AppImage'

    const asset = assets.find((a) => a.name.toLowerCase().includes(match.toLowerCase()))
    return asset ? asset.browser_download_url : 'https://github.com/lantongxue/winssh/releases'
  }

  const executeDownload = (url: string, id: string) => {
    setDownloadingId(id)
    setTimeout(() => {
      window.location.href = url
      setTimeout(() => {
        setDownloadingId(null)
        setActiveModal(null)
      }, 500)
    }, 600)
  }

  const platforms = [
    {
      id: 'macos',
      name: t.download.platforms.macos.name,
      icon: <Apple className="w-8 h-8 text-neutral-200" />,
      desc: t.download.platforms.macos.desc,
      arch: t.download.platforms.macos.arch,
      btnText: t.download.platforms.macos.btn,
      badge: 'Apple Silicon & Intel',
      onClick: () => setActiveModal('macos')
    },
    {
      id: 'windows',
      name: t.download.platforms.windows.name,
      icon: <Monitor className="w-8 h-8 text-cyan-400" />,
      desc: t.download.platforms.windows.desc,
      arch: t.download.platforms.windows.arch,
      btnText: t.download.platforms.windows.btn,
      badge: 'DirectX 12 / DirectWrite',
      onClick: () => executeDownload(getDownloadUrl('win'), 'win')
    },
    {
      id: 'linux',
      name: t.download.platforms.linux.name,
      icon: <Terminal className="w-8 h-8 text-cyan-400" />,
      desc: t.download.platforms.linux.desc,
      arch: t.download.platforms.linux.arch,
      btnText: t.download.platforms.linux.btn,
      badge: 'Wayland & X11 / Vulkan',
      onClick: () => setActiveModal('linux')
    }
  ]

  return (
    <section id="download" className={`py-24 px-4 sm:px-6 md:px-8 relative ${activeModal ? 'z-50' : 'z-10'}`}>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[850px] h-[350px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium tracking-wide uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.download.versionLabel}</span>
          </div>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white"
          >
            {t.download.titleLevel1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              {t.download.titleLevel2}
            </span>
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-neutral-400 text-base md:text-lg font-light max-w-2xl mx-auto"
          >
            {t.download.desc}
          </motion.p>
        </div>

        {/* 3 Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.id}
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col p-8 rounded-3xl bg-[#0d0d10] border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-1 relative overflow-hidden shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform">
                  {platform.icon}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                  {platform.badge}
                </span>
              </div>

              <h3 className="text-2xl font-display font-semibold text-white mb-2">
                {platform.name}
              </h3>
              <p className="text-neutral-400 text-sm font-light mb-1">{platform.desc}</p>
              <p className="text-neutral-500 text-xs font-mono mb-8">{platform.arch}</p>

              <div className="mt-auto pt-6 border-t border-white/10">
                <button
                  onClick={platform.onClick}
                  disabled={downloadingId !== null}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer"
                >
                  {downloadingId === platform.id || (downloadingId === 'win' && platform.id === 'windows') ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <DownloadIcon className="w-4 h-4" />
                  )}
                  {platform.btnText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security & Checksums footer */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free & Open Source · No Telemetry Tracking · MIT Licensed</span>
          </div>
          <a
            href="https://github.com/lantongxue/winssh/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-sans"
          >
            <span>SHA-256 Checksums on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Modal Selection for macOS / Linux */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-900 border border-white/15 rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-semibold text-white mb-2 font-display">
                {activeModal === 'macos' ? t.download.modalMacTitle : t.download.modalLinuxTitle}
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                {activeModal === 'macos'
                  ? 'Select your Mac processor architecture for optimal performance.'
                  : 'Choose the distribution package format matching your Linux setup.'}
              </p>

              <div className="flex flex-col gap-3">
                {activeModal === 'macos' ? (
                  <>
                    <button
                      onClick={() => executeDownload(getDownloadUrl('mac-arm'), 'mac-arm')}
                      disabled={downloadingId !== null}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {downloadingId === 'mac-arm' ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Cpu className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">
                          {t.download.modalMacAppleSilicon}
                        </div>
                        <div className="text-neutral-500 text-xs">
                          {t.download.modalMacAppleSiliconDesc}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => executeDownload(getDownloadUrl('mac-x64'), 'mac-x64')}
                      disabled={downloadingId !== null}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {downloadingId === 'mac-x64' ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Command className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">
                          {t.download.modalMacIntel}
                        </div>
                        <div className="text-neutral-500 text-xs">
                          {t.download.modalMacIntelDesc}
                        </div>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => executeDownload(getDownloadUrl('linux-deb'), 'linux-deb')}
                      disabled={downloadingId !== null}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {downloadingId === 'linux-deb' ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Package className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">
                          {t.download.modalLinuxDeb}
                        </div>
                        <div className="text-neutral-500 text-xs">
                          {t.download.modalLinuxDebDesc}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        executeDownload(getDownloadUrl('linux-appimage'), 'linux-appimage')
                      }
                      disabled={downloadingId !== null}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {downloadingId === 'linux-appimage' ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Terminal className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">
                          {t.download.modalLinuxAppImage}
                        </div>
                        <div className="text-neutral-500 text-xs">
                          {t.download.modalLinuxAppImageDesc}
                        </div>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
