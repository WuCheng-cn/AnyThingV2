/** 标签页风格 */
export type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain'

/** 标签页偏好配置接口 */
export interface ITabbarPreferences {
  /** 是否开启多标签页拖拽 */
  draggable: boolean
  /** 是否开启多标签页 */
  enable: boolean
  /** 标签页高度 */
  height: number
  /** 开启标签页缓存功能 */
  keepAlive: boolean
  /** 限制最大数量 */
  maxCount: number
  /** 是否点击中键时关闭标签 */
  middleClickToClose: boolean
  /** 是否持久化标签 */
  persist: boolean
  /** 是否开启多标签页图标 */
  showIcon: boolean
  /** 显示最大化按钮 */
  showMaximize: boolean
  /** 显示更多按钮 */
  showMore: boolean
  /** 标签页风格 */
  styleType: TabsStyleType
  /** 是否开启鼠标滚轮响应 */
  wheelable: boolean
}
