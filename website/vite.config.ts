import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { alias } from '../alias'

export default defineConfig({
  resolve: { alias },
  plugins: [
    vue(),
    UnoCSS(resolve(__dirname, '../unocss.config.ts')),
  ],
})
