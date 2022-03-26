import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
