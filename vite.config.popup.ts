import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { alias } from './alias'

export default defineConfig({
  resolve: { alias },
  root: resolve(__dirname, 'src'),
  base: '/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'src/popup/index.html'),
      },
    },
  },
  plugins: [
    vue(),
    UnoCSS(),
  ],
})
