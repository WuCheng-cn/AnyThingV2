/// <reference types="vitest" />
import { defineConfig } from 'vite'
// vite打包压缩插件
import { createVitePlugins } from './build/vite'
import path from 'node:path'
import { createPostcssPlugins } from './build/postcss'

export default defineConfig({
  plugins: createVitePlugins(),

  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: createPostcssPlugins()
    },
  },
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 2048,
  },
  optimizeDeps: {
    exclude: ['@antv/x6-vue-shape'],
  },
  base: './', // 打包路径
  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    hmr: true, // 热更新
  }
})