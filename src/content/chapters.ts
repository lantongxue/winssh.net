import {
  Activity,
  Bot,
  FolderSync,
  Monitor,
  SquareTerminal,
  Waypoints,
  type LucideIcon
} from 'lucide-react'

export type ChapterKey = 'terminal' | 'files' | 'desktop' | 'monitor' | 'assistant' | 'network'

export const CHAPTERS: { key: ChapterKey; Icon: LucideIcon }[] = [
  { key: 'terminal', Icon: SquareTerminal },
  { key: 'files', Icon: FolderSync },
  { key: 'desktop', Icon: Monitor },
  { key: 'monitor', Icon: Activity },
  { key: 'assistant', Icon: Bot },
  { key: 'network', Icon: Waypoints }
]
