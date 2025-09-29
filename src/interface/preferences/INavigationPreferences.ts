/** # 导航菜单风格 */
export type NavigationStyleType = 'plain' | 'rounded'

/** # 导航菜单偏好配置接口 */
export interface INavigationPreferences {
  /** 导航菜单手风琴模式 */
  accordion: boolean
  /** 导航菜单是否切割，只在 layout=mixed-nav 生效 */
  split: boolean
  /** 导航菜单风格 */
  styleType: NavigationStyleType
}
