import type { AnyDataBaseEntity } from '@arayui/core'
import type { ITableHookConfig } from '@/interface/ITableHookConfig'
import { AppConfig } from '@/config/AppConfig'

/**
 * # 表格基础hooks 😎
 */
export function useAnyTableHooks<T extends AnyDataBaseEntity>(config: ITableHookConfig<T>) {
  /** # 加载loading */
  const loading = ref(false)

  /** # 当前页码 */
  const page = ref(1)

  /** # 每页条数 */
  const size = ref(config.pageSize || AppConfig.DEFAULT_PAGE_SIZE)

  /** # 总条数 */
  const total = ref(0)

  /** # 表格数据 */
  const dataSource: Ref<T[]> = ref([])

  /** # 最后一次搜索生效的搜索参数 */
  const lastSearchParams = ref<Record<string, any>>({})

  /**
   * # 获取列表数据
   */
  async function getList(params?: Record<string, any>) {
    const query = {
      [config.pageKey || AppConfig.DEFAULT_PAGE_KEY]: page.value,
      [config.sizeKey || AppConfig.DEFAULT_PAGE_SIZE_KEY]: size.value,
      ...(config.payload ? config.payload : {}),
      ...(params || {}),
    }
    for (const key in query) {
      if (query[key] === '' || query[key] === undefined)
        delete query[key]
    }
    loading.value = true
    let { data } = await config.api(query).finally(() => {
      loading.value = false
    })
    lastSearchParams.value = query
    data = config.responseDataTransform?.(data) || data
    dataSource.value = data[config.rowsDataKey || AppConfig.DEFAULT_ROWS_DATA_KEY] || data
    total.value = data[config.totalKey || AppConfig.DEFAULT_TOTAL_KEY]
  }

  /**
   * # 分页改变
   * @param p 页码
   * @param s 展示条数
   */
  function handlePageChange(p: number, s: number) {
    page.value = p
    size.value = s
    getList()
  }

  /** # 查询 */
  function handleSearch(query?: Record<string, any>) {
    page.value = 1
    getList(query)
  }

  /** # 重置 */
  function handleReset(query?: Record<string, any>) {
    page.value = 1
    getList(query)
  }

  /** # 重新加载表格 */
  function handleReloadTable() {
    getList(lastSearchParams.value)
  }

  if (config.immediate !== false) {
    getList()
  }

  return {
    loading,
    dataSource,
    page,
    size,
    total,
    lastSearchParams,
    handleSearch,
    handleReset,
    handlePageChange,
    handleReloadTable,
  }
}
