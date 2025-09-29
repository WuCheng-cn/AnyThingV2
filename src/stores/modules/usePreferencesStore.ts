import type { IPreferences } from '@/interface/preferences/IPreferences'
import { defineStore } from 'pinia'
import { defaultPreferences } from '@/config/DefaultPreferences'

export const usePreferencesStore = defineStore('core-preferences', () => {
  /** # 偏好设置 */
  const preferences = ref<IPreferences>()

  /** # 初始偏好设置 */
  const initialPreferences = ref<IPreferences>({ ...defaultPreferences })

  /** # 设置为默认偏好设置 */
  function setDefaultPreferences() {
    preferences.value = defaultPreferences
  }

  return {
    /** # 当前偏好设置 */
    preferences,
    /** # 初始偏好设置 */
    initialPreferences,
    /** # 设置为默认偏好设置 */
    setDefaultPreferences,
  }
})
