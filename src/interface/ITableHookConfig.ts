import type { AnyDataBaseEntity } from '@arayui/core'
import type { AxiosResponse } from 'axios'
import type { IDeleteConfig } from './IDeleteConfig'
import type { IPage } from './IPage'

/** # 表格hooks配置 ⚙️ */
export interface ITableHookConfig<T extends AnyDataBaseEntity> {
  /** # 初始化时是否自动获取数据 */
  immediate?: boolean
  /** # 获取数据的方法 */
  api: (params: Record<string, any>) => Promise<AxiosResponse<IPage<T>>>
  /** # 删除数据的方法 */
  deleteApi?: (params: T[]) => Promise<AxiosResponse>
  /** # 删除配置 */
  deleteConfig?: IDeleteConfig<T>
  /** # 是否开启多选 */
  isMultiple?: boolean
  /** # 是否缓存选中数据 */
  isCacheSelect?: boolean
  /** # 表格数据唯一key */
  mainKey?: keyof T
  /** # 表格数据key */
  rowsDataKey?: string
  /** # 总条数key */
  totalKey?: string
  /** # 当前页码key */
  pageKey?: string
  /** # 每页条数key */
  sizeKey?: string
  /** # 默认每页条数 */
  pageSize?: number
  /** # 每页条数选项 */
  pageSizeOptions?: number[]
  /** # 常驻搜索参数 */
  payload?: Record<string, any>
  /** # 响应数据转换 */
  responseDataTransform?: (data: IPage<T>) => IPage<T>
}
