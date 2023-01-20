import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/content/main.ts'),
      name: 'content',
      fileName: () => 'content.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'content.[name].[ext]',
      },
    },
  },
})
