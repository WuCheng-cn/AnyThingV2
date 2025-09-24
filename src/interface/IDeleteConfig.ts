import type { AnyDataBaseEntity } from '@arayui/core'

export interface IDeleteConfig<T extends AnyDataBaseEntity> {
  /** # 删除提示 */
  title?: string
  /** # 删除内容 */
  content?: string
  /** # 确认按钮文字 */
  okText?: string
  /** # 取消按钮文字 */
  cancelText?: string
  /** # 执行删除操作前的钩子 */
  beforeDelete?: (deleteArr: T[]) => Promise<boolean>
}
