/** # 侧边栏偏好配置接口 */
export interface ISidebarPreferences {
  /** 点击目录时自动激活子菜单   */
  autoActivateChild: boolean
  /** 侧边栏是否折叠 */
  collapsed: boolean
  /** 侧边栏折叠按钮是否可见 */
  collapsedButton: boolean
  /** 侧边栏折叠时，是否显示title */
  collapsedShowTitle: boolean
  /** 侧边栏折叠宽度 */
  collapseWidth: number
  /** 侧边栏是否可见 */
  enable: boolean
  /** 菜单自动展开状态 */
  expandOnHover: boolean
  /** 侧边栏扩展区域是否折叠 */
  extraCollapse: boolean
  /** 侧边栏扩展区域折叠宽度 */
  extraCollapsedWidth: number
  /** 侧边栏固定按钮是否可见 */
  fixedButton: boolean
  /** 侧边栏是否隐藏 - css */
  hidden: boolean
  /** 混合侧边栏宽度 */
  mixedWidth: number
  /** 侧边栏宽度 */
  width: number
}
