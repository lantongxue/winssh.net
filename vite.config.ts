import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // 本地开发时 /api 转发到线上云函数（cloud-functions/api.go），与生产环境同源同路径
      proxy: {
        '/api': { target: 'https://winssh.net', changeOrigin: true }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react'
            if (/node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//.test(id))
              return 'vendor-motion'
            if (id.includes('node_modules/lucide-react/')) return 'vendor-icons'
          }
        }
      }
    }
  }
})
