import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import windiConfig from './windi.config'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: '/',
  build: {
    outDir: resolve(__dirname, 'dist'),
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
