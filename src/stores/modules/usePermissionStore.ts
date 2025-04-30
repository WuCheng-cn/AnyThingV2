import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      permissions: [] as any[],
    }
  },
  actions: {
    /**
     * # 获取用户所有权限并缓存
     */
    async getPermissionAll() {
    },

    /**
     * # 判断用户是否有权限
     */
    hasPermission(permissionCode: string) {
      return this.permissions.some(item => item.code === permissionCode)
    },
  },
})
