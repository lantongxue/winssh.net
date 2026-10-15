/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllInOne } from './components/AllInOne'
import { Changelog } from './components/Changelog'
import { Download } from './components/Download'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MoreFeatures } from './components/MoreFeatures'
import { Navbar } from './components/Navbar'
import { Performance } from './components/Performance'
import { ScrollToTop } from './components/ScrollToTop'
import { LanguageProvider } from './i18n/LanguageContext'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-dvh overflow-x-clip">
        <Navbar />
        <main>
          <Hero />
          <AllInOne />
          <Performance />
          <Features />
          <MoreFeatures />
          <Download />
          <Changelog />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  )
}
