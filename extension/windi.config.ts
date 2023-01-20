import { resolve } from 'path'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, 'src/options/**/*.{vue,html}'),
    ],
  },
  theme: {
    fontFamily: {
      sans: 'Readex Pro, sans-serif',
    },
  },
})
