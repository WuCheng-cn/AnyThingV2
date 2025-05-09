import type { EWigetFormConfigType } from '@/enum/EWigetFormConfigType'

import type { AsyncComponentLoader } from 'vue'

/**
 * # 画布配置表单接口
 */
export interface IWidgetFormConfig {
  /** # 表单名称 */
  title: string

  /** # 是否禁用 */
  disabled: boolean

  /** # 表单类型 */
  type: EWigetFormConfigType

  /** # 表单组件 */
  component: AsyncComponentLoader
}
