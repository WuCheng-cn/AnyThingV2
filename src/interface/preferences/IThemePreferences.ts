/** # 内置主题类型 */
export type BuiltinThemeType
  = | 'custom'
    | 'deep-blue'
    | 'deep-green'
    | 'default'
    | 'gray'
    | 'green'
    | 'neutral'
    | 'orange'
    | 'pink'
    | 'red'
    | 'rose'
    | 'sky-blue'
    | 'slate'
    | 'stone'
    | 'violet'
    | 'yellow'
    | 'zinc'
    | (Record<never, never> & string)

/** # 主题模式类型 */
export type ThemeModeType = 'auto' | 'dark' | 'light'

/** # 主题偏好配置接口 */
export interface IThemePreferences {
  /** 内置主题名 */
  builtinType: BuiltinThemeType
  /** 错误色 */
  colorDestructive: string
  /** 主题色 */
  colorPrimary: string
  /** 成功色 */
  colorSuccess: string
  /** 警告色 */
  colorWarning: string
  /** 当前主题 */
  mode: ThemeModeType
  /** 圆角 */
  radius: string
  /** 是否开启半深色header（只在theme='light'时生效） */
  semiDarkHeader: boolean
  /** 是否开启半深色菜单（只在theme='light'时生效） */
  semiDarkSidebar: boolean
}
