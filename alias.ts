import { resolve } from 'node:path'

function r(p: string) {
  return resolve(__dirname, p)
}

export const alias: Record<string, string> = {
  '@sanersocialmedia/core': r('./packages/core/src/index.ts'),
  '@sanersocialmedia/shared': r('./packages/shared/src/index.ts'),
}
