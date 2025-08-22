import type { IWidgetForm } from '../interface/IWidgetForm'
import type { EWigetFormConfigType } from '@/enum/EWigetFormConfigType'
import { AnyBaseModel } from '@arayui/core'

/**
 * # 画布配置表单基类
 */
export class WidgetFormBase extends AnyBaseModel implements IWidgetForm {
  title = '这是一个表单的标题'
  disabled = false
  type!: EWigetFormConfigType
}
