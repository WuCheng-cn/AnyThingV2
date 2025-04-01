/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig } from 'vite'
import { createPostcssPlugins } from './build/postcss'
// vite打包压缩插件
import { createVitePlugins } from './build/vite'

export default defineConfig({
  plugins: createVitePlugins(),

  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    preserveSymlinks: true, // 关键配置！修复 Windows 符号链接问题
  },
  css: {
    postcss: {
      plugins: createPostcssPlugins(),
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
    port: 5666, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    hmr: true, // 热更新
  },
})
