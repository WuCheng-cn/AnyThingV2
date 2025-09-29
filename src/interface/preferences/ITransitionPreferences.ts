/** # 页面切换动画类型 */
export type PageTransitionType = 'fade' | 'fade-down' | 'fade-slide' | 'fade-up'

/** # 页面切换动画偏好配置接口 */
export interface ITransitionPreferences {
  /** 页面切换动画是否启用 */
  enable: boolean
  // /** 是否开启页面加载loading */
  loading: boolean
  /** 页面切换动画 */
  name: PageTransitionType | string
  /** 是否开启页面加载进度动画 */
  progress: boolean
}
