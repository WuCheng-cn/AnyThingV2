import type { EWigetFormConfigType } from '@/enum/EWigetFormConfigType'

export interface IWidgetForm {
  /** # 表单名称 */
  title: string

  /** # 是否禁用 */
  disabled: boolean

  /** # 表单类型 */
  type: EWigetFormConfigType
}
