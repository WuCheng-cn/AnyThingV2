import type * as icons from 'lucide-vue-next'

declare module 'vue-router' {
  interface RouteMeta {
    /** page title */
    title?: string
    /** i18n key */
    i18n?: string
    /** keepalive */
    keepAlive?: boolean
    /** 隐藏页面的导航栏 */
    hiddenNavBar?: boolean
    /** 图标 */
    icon?: keyof typeof icons
  }
}
export {}
