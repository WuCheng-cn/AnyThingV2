/** # 登录注册页面布局 */
export type AuthPageLayoutType = 'panel-center' | 'panel-left' | 'panel-right'

/** # 布局方式 */
export type LayoutType
  = | 'full-content'
    | 'header-mixed-nav'
    | 'header-nav'
    | 'header-sidebar-nav'
    | 'mixed-nav'
    | 'sidebar-mixed-nav'
    | 'sidebar-nav'

/** # 支持的语言 */
export type SupportedLanguagesType = 'en-US' | 'zh-CN'

/** # 登录过期模式 */
export type LoginExpiredModeType = 'modal' | 'page'

/** # 偏好设置按钮位置 */
export type PreferencesButtonPositionType = 'auto' | 'fixed' | 'header'

/** # 应用偏好配置接口 */
export interface IAppPreferences {
  /** 登录注册页面布局 */
  authPageLayout: AuthPageLayoutType
  /** 检查更新轮询时间 */
  checkUpdatesInterval: number
  /** 是否开启灰色模式 */
  colorGrayMode: boolean
  /** 是否开启色弱模式 */
  colorWeakMode: boolean
  /** 是否开启紧凑模式 */
  compact: boolean
  /** 是否开启内容紧凑模式 */
  contentCompact: boolean
  /** 内容紧凑宽度 */
  contentCompactWidth: number
  /** 内容内边距 */
  contentPadding: number
  /** 内容底部内边距 */
  contentPaddingBottom: number
  /** 内容左侧内边距 */
  contentPaddingLeft: number
  /** 内容右侧内边距 */
  contentPaddingRight: number
  /** 内容顶部内边距 */
  contentPaddingTop: number
  // /** 应用默认头像 */
  defaultAvatar: string
  /** 默认首页地址 */
  defaultHomePath: string
  /** 是否开启动态标题 */
  dynamicTitle: boolean
  /** 是否开启检查更新 */
  enableCheckUpdates: boolean
  /** 是否显示偏好设置 */
  enablePreferences: boolean
  /** 是否开启refreshToken */
  enableRefreshToken: boolean
  /** 是否移动端 */
  isMobile: boolean
  /** 布局方式 */
  layout: LayoutType
  /** 支持的语言 */
  locale: SupportedLanguagesType
  /** 登录过期模式 */
  loginExpiredMode: LoginExpiredModeType
  /** 应用名 */
  name: string
  /** 偏好设置按钮位置 */
  preferencesButtonPosition: PreferencesButtonPositionType
  /** 是否开启水印 */
  watermark: boolean
  /** z-index */
  zIndex: number
}
