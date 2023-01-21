import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { alias } from '../alias'

export default defineConfig({
  resolve: { alias },
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
    UnoCSS(resolve(__dirname, '../unocss.config.ts')),
  ],
})
