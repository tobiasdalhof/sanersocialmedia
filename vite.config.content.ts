import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'extension/dist/scripts'),
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/content/main.ts'),
      name: 'content',
      fileName: () => 'content.js',
      formats: ['iife'],
    },
  },
})
