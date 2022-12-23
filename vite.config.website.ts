import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import windiConfig from './windi.config'
import viteConfigBase from './vite.config.base'

export default defineConfig({
  ...viteConfigBase,
  root: resolve(__dirname, './website'),
  plugins: [
    vue(),
    WindiCSS({
      config: windiConfig,
    }),
  ],
})
