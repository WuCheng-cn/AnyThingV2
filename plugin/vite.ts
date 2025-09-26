import type { ConfigEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import { VantResolver } from '@vant/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import { VitePWA } from 'vite-plugin-pwa'
import Sitemap from 'vite-plugin-sitemap'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createViteVConsole } from './vconsole'

export function createVitePlugins(env: ConfigEnv) {
  return [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/views',
      dts: 'src/types/typed-router.d.ts',
      exclude: ['**/components/**', '**/graphics-engine/*/**'],
    }),

    vue(),

    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      mockPath: 'mock', // mock文件夹路径
      enable: env.command === 'serve', // 只有开发环境才开启mock
    }),

    // https://github.com/tailwindlabs/tailwindcss
    tailwindcss(),

    // https://github.com/jbaubree/vite-plugin-sitemap
    Sitemap({
      outDir: 'dist',
    }),

    // https://github.com/pengzhanbo/vite-plugin-mock-dev-server
    mockDevServerPlugin(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      resolvers: [
        VantResolver(),
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/types/components.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [
        'vue',
        'vitest',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'vue-router': ['useLink'],
          'vue-i18n': ['useI18n'],
        },
        unheadVueComposablesImports,
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/hooks',
      ],
      resolvers: [VantResolver()],
    }),

    // https://github.com/vadxq/vite-plugin-vconsole
    createViteVConsole(),

    // https://github.com/vuejs/devtools-next
    VueDevTools(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'vue3-vant-mobile',
        short_name: 'vue3-vant-mobile',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ]
}
