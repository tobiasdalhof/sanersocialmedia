import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { alias } from './alias'

export default defineConfig({
  resolve: { alias },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/background/main.ts'),
      name: 'background',
      fileName: () => 'background.js',
      formats: ['iife'],
    },
  },
})
