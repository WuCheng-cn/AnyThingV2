import type { ItemType } from 'ant-design-vue'
import type { RouteRecordNormalized } from 'vue-router'
import LucideIcon from '@/components/UI/LucideIcon.vue'

/** # 不渲染的菜单列表 */
const excludeMenuList = ['login', '404', '401']

/**
 * # 菜单钩子函数
 */
export function useMenuHooks() {
  const filter = ref('')

  const menuItems = computed(() => getMenuByRoutes())

  const validRoutes = computed(() => {
    const routes = useRouter().getRoutes()
    return routes
      .filter(route => route.meta?.title && !excludeMenuList.includes(String(route.name)))
      .sort((a, b) => a.path.localeCompare(b.path))
  })

  const filteredMenuItems = computed(() => {
    if (filter.value) {
      const filteredRoutes = validRoutes.value.filter(item => item.meta?.title?.includes(filter.value))
      return filteredRoutes?.map(item => ({
        key: item.path,
        label: item.meta?.title,
        path: item.path,
      }))
    }
    return buildMenuTree(validRoutes.value)
  })

  /**
   * 根据路由路径层级构建树形菜单结构
   * @param routes - 扁平化的路由数组
   * @param parentPath - 父路径，用于递归构建
   * @returns 树形菜单数组
   */
  function buildMenuTree(routes: RouteRecordNormalized[], parentPath = ''): ItemType[] {
    if (!routes?.length)
      return []

    // 过滤有效路由并按路径排序
    const validRoutes = routes
      .filter(route => route.meta?.title && !excludeMenuList.includes(String(route.name)))
      .sort((a, b) => a.path.localeCompare(b.path))

    // 获取当前层级的路由
    const currentLevelRoutes = validRoutes.filter((route) => {
      if (parentPath === '') {
        // 根层级：包含首页 / 和所有顶级路由
        // 首页 / 和其他顶级路由（如 /demo, /graphics-engine）是平级关系
        if (route.path === '/')
          return true

        const pathDepth = route.path.split('/').filter(p => p).length
        return pathDepth === 1
      }
      else {
        // 子层级：路径应该以父路径开头，且只多一级
        const normalizedParent = parentPath.replace(/\/$/, '')
        const normalizedRoute = route.path.replace(/\/$/, '')

        if (!normalizedRoute.startsWith(normalizedParent))
          return false

        const relativePath = normalizedRoute.substring(normalizedParent.length).replace(/^\//, '')

        // 确保是相对路径，且只包含一级（不包含额外的/）
        return relativePath && !relativePath.includes('/') && relativePath !== ''
      }
    })

    return currentLevelRoutes.map((route) => {
      const fullPath = route.path === '' ? '/' : route.path.startsWith('/') ? route.path : `/${route.path}`

      // 递归构建子菜单
      let children: ItemType[] | undefined

      // 查找子路由
      const childRoutes = validRoutes.filter((r) => {
        if (r === route)
          return false

        // 根路径 / 不嵌套任何子路由
        if (fullPath === '/')
          return false

        const normalizedParent = fullPath.replace(/\/$/, '')
        const normalizedChild = r.path.replace(/\/$/, '')

        return normalizedChild.startsWith(`${normalizedParent}/`) && r.meta?.title
      })

      if (childRoutes.length > 0) {
        children = buildMenuTree(childRoutes, fullPath)
      }

      return {
        key: fullPath,
        label: route.meta?.title,
        path: fullPath,
        children: children?.length
          ? [
              {
                key: fullPath,
                label: route.meta?.title,
                path: fullPath,
              },
              ...children,
            ]
          : undefined,
        ...(route.meta?.icon ? { icon: () => h(LucideIcon, { name: route.meta.icon!, color: 'var(--colorPrimary)' }) } : {}),
      }
    })
  }

  function getMenuByRoutes() {
    const routes = useRouter().getRoutes()
    const items = buildMenuTree(routes)
    return items
  }

  return {
    filter,
    menuItems,
    filteredMenuItems,
    getMenuByRoutes,
    validRoutes,
  }
}
