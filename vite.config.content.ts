import { resolve } from 'path'
import { defineConfig } from 'vite'
import viteConfigBase from './vite.config.base'

export default defineConfig({
  ...viteConfigBase,
  build: {
    outDir: resolve(__dirname, 'extension/dist'),
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
