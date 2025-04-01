import { defineStore } from 'pinia'

/**
 * # 该应用是否需要登录认证访问（目前嵌入到门口屏展示时是没有登录认证的，也没有相应操作）
 */
export enum IsNeedAuth {
  NO = '0',
  YES = '1',
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      isNeedAuth: IsNeedAuth.YES,
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
     * @param permissionCode
     */
    hasPermission(permissionCode: string) {
      return this.permissions.some(item => item.code === permissionCode)
    },
  },
})
