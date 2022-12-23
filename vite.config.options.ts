import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import windiConfig from './windi.config'
import viteConfigBase from './vite.config.base'

export default defineConfig({
  ...viteConfigBase,
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
  ],
})
