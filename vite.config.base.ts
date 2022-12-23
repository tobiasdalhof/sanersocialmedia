import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@sanersocialmedia/core': resolve(__dirname, './packages/core/src'),
      '@sanersocialmedia/shared': resolve(__dirname, './packages/shared/src'),
    },
  },
})
