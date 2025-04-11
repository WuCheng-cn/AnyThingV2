/**
 * # 字典接口
 */
export interface IDictionary {
  /**
   * # 字典传递值（通常对应枚举值）
   */
  value: string | number | symbol | boolean

  /**
   * # 字典展示（通常对应枚举描述翻译）
   */
  label: any

  /**
   * # 字典描述（通常对应枚举额外补充描述）
   */
  description?: string
}
