import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      permissions: [] as any[],
    }
  },
  actions: {
    /** # 获取用户所有权限并缓存 😎 */
    async getPermissionAll() {
    },

    /**
     * # 判断用户是否有权限 😎
     * - 支持复合权限判断，例如：`['admin', 'user']`
     */
    hasPermission(permissionCodes: string[]) {
      return permissionCodes.every((i) => {
        return this.permissions.includes(i)
      })
    },
  },
})
