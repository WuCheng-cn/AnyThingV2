import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', () => {
  /** # 用户所有权限 */
  const permissions = ref<string[]>([])

  /** # 用户所有可访问菜单 */
  const accessMenus = ref<any[]>([])

  /** # 获取用户所有权限并缓存 😎 */
  async function getPermissionAll() {

  }

  /** # 获取用户所有可访问菜单并缓存 😎 */
  async function getAccessMenus() {
    const { menuItems } = useMenuHooks()
    accessMenus.value = menuItems.value
  }

  /**
   * # 判断用户是否有权限 😎
   * - 支持复合权限判断，例如：`['admin', 'user']`
   */
  function hasPermission(permissionCodes: string[]) {
    return permissionCodes.every((i) => {
      return permissions.value.includes(i)
    })
  }

  return {
    permissions,
    accessMenus,
    hasPermission,
    getAccessMenus,
    getPermissionAll,
  }
})
