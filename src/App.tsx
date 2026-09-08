/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { PrototypeShowcase } from './components/PrototypeShowcase'
import { PerformanceBenchmark } from './components/PerformanceBenchmark'
import { Features } from './components/Features'
import { Architecture } from './components/Architecture'
import { CrossPlatform } from './components/CrossPlatform'
import { Download } from './components/Download'
import { Changelog } from './components/Changelog'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { LanguageProvider } from './i18n/LanguageContext'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/20 selection:text-white font-sans antialiased selection:bg-cyan-500/20">
        <Navbar />
        <main>
          <Hero />
          <PrototypeShowcase />
          <PerformanceBenchmark />
          <Features />
          <Architecture />
          <CrossPlatform />
          <Download />
          <Changelog />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  )
}
