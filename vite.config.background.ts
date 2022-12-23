import { resolve } from 'path'
import { defineConfig } from 'vite'
import viteConfigBase from './vite.config.base'

export default defineConfig({
  ...viteConfigBase,
  build: {
    outDir: resolve(__dirname, 'extension/dist'),
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/background/main.ts'),
      name: 'background',
      fileName: () => 'background.js',
      formats: ['iife'],
    },
  },
})
