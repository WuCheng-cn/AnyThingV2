import type { IAppPreferences } from './IAppPreferences'
import type { IBreadcrumbPreferences } from './IBreadcrumbPreferences'
import type { IFooterPreferences } from './IFooterPreferences'
import type { IHeaderPreferences } from './IHeaderPreferences'
import type { ILogoPreferences } from './ILogoPreferences'
import type { INavigationPreferences } from './INavigationPreferences'
import type { IShortcutKeyPreferences } from './IShortcutKeyPreferences'
import type { ISidebarPreferences } from './ISidebarPreferences'
import type { ITabbarPreferences } from './ITabbarPreferences'
import type { IThemePreferences } from './IThemePreferences'
import type { ITransitionPreferences } from './ITransitionPreferences'
import type { IWidgetPreferences } from './IWidgetPreferences'

export interface IPreferences {
  /** 全局配置 */
  app: IAppPreferences
  /** 面包屑配置 */
  breadcrumb: IBreadcrumbPreferences
  /** 底栏配置 */
  footer: IFooterPreferences
  /** 顶栏配置 */
  header: IHeaderPreferences
  /** logo配置 */
  logo: ILogoPreferences
  /** 导航配置 */
  navigation: INavigationPreferences
  /** 快捷键配置 */
  shortcutKeys: IShortcutKeyPreferences
  /** 侧边栏配置 */
  sidebar: ISidebarPreferences
  /** 标签页配置 */
  tabbar: ITabbarPreferences
  /** 主题配置 */
  theme: IThemePreferences
  /** 动画配置 */
  transition: ITransitionPreferences
  /** 功能配置 */
  widget: IWidgetPreferences
}
