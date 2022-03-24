import { dirname, relative, resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import windiConfig from './windi.config'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: '/dist/',
  build: {
    outDir: resolve(__dirname, 'extension/dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'src/options/index.html'),
      },
    },
  },
  plugins: [
    vue(),
    WindiCSS({
      config: windiConfig,
    }),
    {
      // rewrite assets to use relative path
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
      },
    },
  ],
})
