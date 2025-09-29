import { defineStore } from 'pinia'

export const useUserStore = defineStore('core-user', () => {
  /** # 用户信息 */
  const userInfo = ref<any>()

  return {
    userInfo,
  }
})
