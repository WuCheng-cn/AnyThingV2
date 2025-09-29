import type { IPreferences } from '@/interface/preferences/IPreferences'
import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('core-preferences', () => {
  /** # 偏好设置 */
  const preferences = ref<IPreferences>()

  return {
    preferences,
  }
})
