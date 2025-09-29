/** # 面包屑风格类型 */
export type BreadcrumbStyleType = 'background' | 'normal'

/** # 面包屑偏好配置接口 */
export interface IBreadcrumbPreferences {
  /** 面包屑是否启用 */
  enable: boolean
  /** 面包屑是否只有一个时隐藏 */
  hideOnlyOne: boolean
  /** 面包屑首页图标是否可见 */
  showHome: boolean
  /** 面包屑图标是否可见 */
  showIcon: boolean
  /** 面包屑风格 */
  styleType: BreadcrumbStyleType
}
