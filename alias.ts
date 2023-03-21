import { resolve } from 'node:path'

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {
  '@sanersocialmedia/core': r('./packages/core/src/index.ts'),
  '@sanersocialmedia/vue': r('./packages/vue/src/index.ts'),
}
