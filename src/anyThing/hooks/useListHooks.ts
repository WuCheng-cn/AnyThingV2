import type { IDeleteConfig, IListHooksConfig } from '../interface/IListHooksConfig'
import { showConfirmDialog, showSuccessToast } from 'vant'
import { AppConfig } from '../config/AppConfig'

export function useListHooks<T>(config: IListHooksConfig<T>) {
  /** # 列表数据 */
  const list = ref([] as T[])
  /** # 加载loading */
  const loading = ref(false)
  /** # 是否已全部加载 */
  const finished = ref(false)
  /** # 是否刷新中 */
  const refreshing = ref(false)
  /** # 当前页码 */
  const page = ref(config.offline ? 1 : 0)
  /** # 每页条数 */
  const size = ref(config.defaultPageSize || AppConfig.DEFAULT_PAGE_SIZE)
  /** # 查询参数 */
  const query = ref <Record<string, any>>({})

  /** 列表获取 */
  async function getList() {
    try {
      let queryParams = {
        page: page.value,
        [config.sizeKey || 'size']: size.value,
        ...config.payload,
      }

      for (const key in queryParams) {
        if ((queryParams[key] === '' || queryParams[key] === undefined) && key !== 'search')
          delete queryParams[key]
      }
      if (config.beforeSearch) {
        queryParams = config.beforeSearch(queryParams)
      }
      // console.log(queryParams)
      let data = await config.api(queryParams)
      // console.log(data)

      if (config.responseDataTransform) {
        data = config.responseDataTransform(data)
      }

      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }

      if (config.offline) {
        list.value = [...list.value, ...data.rows]
      }
      else {
        list.value = [...list.value, ...data.content]
      }
      page.value++
      loading.value = false

      if (config.offline) {
        if (list.value.length >= data?.[config.totalKey || 'total']) {
          finished.value = true
        }
      }
      else {
        if (!data.content.length || list.value.length >= data.page?.[config.totalKey || 'totalElements']) {
          finished.value = true
        }
      }
    }
    catch (error) {
      finished.value = true
      loading.value = false
      throw error
    }
  }

  /** # 查询 */
  function handleSearch(data: Record<string, any>) {
    page.value = config.offline ? 1 : 0
    query.value = data
    loading.value = true
    finished.value = false
    refreshing.value = true
    getList()
  }

  /** # 刷新 */
  function handleRefresh() {
    page.value = config.offline ? 1 : 0
    loading.value = true
    finished.value = false
    refreshing.value = true
    getList()
  }

  /**
   * # 删除
   */
  async function handleDelete(deleteArr: T[], deleteConfig?: IDeleteConfig) {
    if (config.delApi) {
      if (!deleteArr?.length) {
        showDialog({ title: '提示', message: '请选择要删除的数据' })
        return
      }
      // 执行删除前的钩子（通常用于二次确认、删除前的检查等）
      if (config.beforeDelete) {
        const isDelete = await config.beforeDelete(deleteArr)
        if (!isDelete) {
          return
        }
      }
      await showConfirmDialog({
        title: deleteConfig?.title || '确认要删除数据吗?',
        message: deleteConfig?.content || '删除后数据无法恢复',
        confirmButtonText: deleteConfig?.okText || '确认',
        cancelButtonText: deleteConfig?.cancelText || '取消',
      }).catch(() => {
        return Promise.reject(new Error('取消删除'))
      })
      await config.delApi(deleteArr)
      showSuccessToast('删除成功')
      handleSearch({})
    }
    else {
      console.error('useTableHooks:delApi is not defined')
    }
  }

  return {
    list,
    loading,
    query,
    finished,
    refreshing,
    getList,
    handleSearch,
    handleDelete,
    handleRefresh,
  }
}
