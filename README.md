# winssh.net

[WinSSH Pro](https://github.com/lantongxue/winssh-pro) 的产品官网。React + Vite + Tailwind CSS v4，部署在 EdgeOne Pages。

## 本地开发

```bash
npm install
npm run dev     # http://localhost:3000，/api 会转发到线上云函数
npm run lint    # 类型检查
npm run build
```

## 云函数环境变量

- `GITHUB_API_TOKEN`：GitHub API token，未配置时匿名调用限额较低。
- `GITHUB_MIRROR`：GitHub 镜像加速站前缀，默认 `https://gh-proxy.com`。用法为
  `加速站前缀 + / + 完整 GitHub 地址`，与
  [gh-proxy 文档](https://gh-proxy.com/docs/github-accelerator) 一致。更新检查接口和官网
  Release 列表里的产物下载地址都由它生成，换加速站或自建同用法的服务时只改这个变量。

## 目录

- `src/i18n/translations.ts`：全站中英文案。只写 winssh-pro 里已经实现的功能。
- `src/components/`：页面各区块；`mocks/` 是截图到位前代替实机截图的界面示意图。
- `src/content/screenshots.ts`：实机截图清单。图片放进 `public/screenshots/` 后在这里登记，对应章节就会改用截图。
- `src/content/schemes.ts`：终端配色，与 winssh-pro `crates/winssh-terminal/src/scheme.rs` 保持一致。
- `src/lib/github.ts`：版本与下载数据。页面只请求 `/api/v1/*`，由 `cloud-functions/api.go` 代理并缓存 GitHub API，避免浏览器直连触发限流；产物下载地址使用云函数按 `GITHUB_MIRROR` 改写后的镜像加速地址。
