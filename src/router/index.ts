import type { EnhancedRouteLocation } from './types'
import NProgress from 'nprogress'

import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, parent: '#app' })

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(async (to: EnhancedRouteLocation, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
