/** # 顶栏菜单位置 */
export type LayoutHeaderMenuAlignType = 'center' | 'end' | 'start'

/** # 顶栏显示模式 */
export type LayoutHeaderModeType = 'auto' | 'auto-scroll' | 'fixed' | 'static'

/** # 顶栏偏好配置接口 */
export interface IHeaderPreferences {
  /** 顶栏是否启用 */
  enable: boolean
  /** 顶栏高度 */
  height: number
  /** 顶栏是否隐藏,css-隐藏 */
  hidden: boolean
  /** 顶栏菜单位置 */
  menuAlign: LayoutHeaderMenuAlignType
  /** 顶栏显示模式 */
  mode: LayoutHeaderModeType
}
