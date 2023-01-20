import { resolve } from 'path'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, 'src/options/**/*.{vue,html}'),
      resolve(__dirname, 'node_modules/@sanersocialmedia/shared/src/**/*.vue'),
    ],
  },
  theme: {
    fontFamily: {
      sans: 'Readex Pro, sans-serif',
    },
  },
})
