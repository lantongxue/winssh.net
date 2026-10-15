// 实机截图清单。新截图放进 public/screenshots/ 后在这里登记即可：
// 功能章节登记了截图就显示截图，没登记的继续显示代码绘制的界面示意图。
// 建议规格：深色主题、2x 分辨率、导出为 webp（cwebp -q 88）、敏感信息先打码。

import type { Language } from '../i18n/LanguageContext'
import type { ChapterKey } from './chapters'

export interface Shot {
  src: string
  width: number
  height: number
}

/** 截图上的取景框，四个值都是相对整张图的比例（0–1） */
export interface Crop {
  x: number
  y: number
  w: number
  h: number
}

const overviewZh: Shot = { src: '/screenshots/overview-zh.webp', width: 3456, height: 2006 }

export const screenshots: {
  overview: Record<Language, Shot>
  chapters: Partial<Record<ChapterKey, Record<Language, Shot & { crop?: Crop }>>>
} = {
  // 英文界面截图到位后替换 en
  overview: { zh: overviewZh, en: overviewZh },
  chapters: {
    // 资源监控面板位于整张截图的右上区域
    monitor: {
      zh: { ...overviewZh, crop: { x: 0.792, y: 0.094, w: 0.208, h: 0.48 } },
      en: { ...overviewZh, crop: { x: 0.792, y: 0.094, w: 0.208, h: 0.48 } }
    }
  }
}
