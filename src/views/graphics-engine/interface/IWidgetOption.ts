import type { IWidgetFormConfig } from './IWidgetFormConfig'

export interface IWidgetOption {
  /** # 是否作为可嵌套父级组件 */
  isParent?: boolean

  /** # 组件表单配置 */
  formConfig?: IWidgetFormConfig[]
}
