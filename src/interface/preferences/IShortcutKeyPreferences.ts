/** # 快捷键偏好配置接口 */
export interface IShortcutKeyPreferences {
  /** 是否启用快捷键-全局 */
  enable: boolean
  /** 是否启用全局锁屏快捷键 */
  globalLockScreen: boolean
  /** 是否启用全局注销快捷键 */
  globalLogout: boolean
  /** 是否启用全局偏好设置快捷键 */
  globalPreferences: boolean
  /** 是否启用全局搜索快捷键 */
  globalSearch: boolean
}
