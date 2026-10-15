// 与 winssh-pro crates/winssh-terminal/src/scheme.rs 中的内置配色逐项一致，改动时两边同步

export interface Scheme {
  id: string
  name: string
  background: string
  foreground: string
  cursor?: string
  /** ANSI 16 色：0–7 常规，8–15 高亮 */
  ansi: string[]
}

export const SCHEMES: Scheme[] = [
  {
    id: 'dracula',
    name: 'Dracula',
    background: '#282a36',
    foreground: '#f8f8f2',
    // prettier-ignore
    ansi: [
      '#000000', '#ff5555', '#50fa7b', '#f1fa8c', '#bd93f9', '#ff79c6', '#8be9fd', '#bbbbbb',
      '#555555', '#ff5555', '#50fa7b', '#f1fa8c', '#caa9fa', '#ff79c6', '#8be9fd', '#ffffff'
    ]
  },
  {
    id: 'one_dark_pro',
    name: 'One Dark Pro',
    background: '#282c34',
    foreground: '#abb2bf',
    // prettier-ignore
    ansi: [
      '#3f4451', '#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#abb2bf',
      '#5c6370', '#ff616e', '#a5e075', '#f0a45d', '#4dc4ff', '#de73ff', '#4cd1e0', '#e6e6e6'
    ]
  },
  {
    id: 'nord',
    name: 'Nord',
    background: '#2e3440',
    foreground: '#d8dee9',
    // prettier-ignore
    ansi: [
      '#3b4252', '#bf616a', '#a3be8c', '#ebcb8b', '#81a1c1', '#b48ead', '#88c0d0', '#e5e9f0',
      '#4c566a', '#bf616a', '#a3be8c', '#ebcb8b', '#81a1c1', '#b48ead', '#8fbcbb', '#eceff4'
    ]
  },
  {
    id: 'gruvbox_dark',
    name: 'Gruvbox Dark',
    background: '#282828',
    foreground: '#ebdbb2',
    // prettier-ignore
    ansi: [
      '#282828', '#cc241d', '#98971a', '#d79921', '#458588', '#b16286', '#689d6a', '#a89984',
      '#928374', '#fb4934', '#b8bb26', '#fabd2f', '#83a598', '#d3869b', '#8ec07c', '#ebdbb2'
    ]
  },
  {
    id: 'tokyo_night',
    name: 'Tokyo Night',
    background: '#1a1b26',
    foreground: '#c0caf5',
    // prettier-ignore
    ansi: [
      '#15161e', '#f7768e', '#9ece6a', '#e0af68', '#7aa2f7', '#bb9af7', '#7dcfff', '#a9b1d6',
      '#414868', '#f7768e', '#9ece6a', '#e0af68', '#7aa2f7', '#bb9af7', '#7dcfff', '#c0caf5'
    ]
  },
  {
    id: 'catppuccin_mocha',
    name: 'Catppuccin Mocha',
    background: '#1e1e2e',
    foreground: '#cdd6f4',
    cursor: '#f5e0dc',
    // prettier-ignore
    ansi: [
      '#45475a', '#f38ba8', '#a6e3a1', '#f9e2af', '#89b4fa', '#f5c2e7', '#94e2d5', '#bac2de',
      '#585b70', '#f38ba8', '#a6e3a1', '#f9e2af', '#89b4fa', '#f5c2e7', '#94e2d5', '#a6adc8'
    ]
  },
  {
    id: 'rose_pine',
    name: 'Rosé Pine',
    background: '#191724',
    foreground: '#e0def4',
    // prettier-ignore
    ansi: [
      '#26233a', '#eb6f92', '#31748f', '#f6c177', '#9ccfd8', '#c4a7e7', '#ebbcba', '#e0def4',
      '#6e6a86', '#eb6f92', '#31748f', '#f6c177', '#9ccfd8', '#c4a7e7', '#ebbcba', '#e0def4'
    ]
  },
  {
    id: 'one_light',
    name: 'One Light',
    background: '#fafafa',
    foreground: '#383a42',
    // prettier-ignore
    ansi: [
      '#383a42', '#e45649', '#50a14f', '#c18401', '#4078f2', '#a626a4', '#0184bc', '#a0a1a7',
      '#696c77', '#e45649', '#50a14f', '#c18401', '#4078f2', '#a626a4', '#0184bc', '#fafafa'
    ]
  },
  {
    id: 'catppuccin_latte',
    name: 'Catppuccin Latte',
    background: '#eff1f5',
    foreground: '#4c4f69',
    // prettier-ignore
    ansi: [
      '#bcc0cc', '#d20f39', '#40a02b', '#df8e1d', '#1e66f5', '#ea76cb', '#179299', '#5c5f77',
      '#acb0be', '#d20f39', '#40a02b', '#df8e1d', '#1e66f5', '#ea76cb', '#179299', '#6c6f85'
    ]
  },
  {
    id: 'rose_pine_dawn',
    name: 'Rosé Pine Dawn',
    background: '#faf4ed',
    foreground: '#575279',
    // prettier-ignore
    ansi: [
      '#f2e9e1', '#b4637a', '#286983', '#ea9d34', '#56949f', '#907aa9', '#d7827e', '#575279',
      '#9893a5', '#b4637a', '#286983', '#ea9d34', '#56949f', '#907aa9', '#d7827e', '#575279'
    ]
  }
]
