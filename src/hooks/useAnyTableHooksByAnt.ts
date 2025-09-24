import type { AnyDataBaseEntity } from '@arayui/core'
import type { TablePaginationConfig } from 'ant-design-vue'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { ICustomRow } from '@/interface/ICustomRow'
import type { ITableHookConfig } from '@/interface/ITableHookConfig'
import { message, Modal } from 'ant-design-vue'
import LucideIcon from '@/components/UI/LucideIcon.vue'
import { AppConfig } from '@/config/AppConfig'
import { OrderType } from '@/enum/EOrderType'

export function useAnyTableHooksByAnt<T extends AnyDataBaseEntity>(config: ITableHookConfig<T>) {
  const {
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
  } = useAnyTableHooks(config)

  /** # 表格数据唯一key */
  const mainKey = (config.mainKey || 'id') as keyof T

  /** # 指定每页可以显示多少条['10', '20', '50', '100'] */
  const pageSizeOptions = ref(config.pageSizeOptions || AppConfig.DEFAULT_PAGE_SIZE_OPTIONS)

  /** # 是否多选（开启行点击选中后的判断标识） */
  const isMultiple = ref(config.isMultiple || false)

  /** # 选中数据key的集合 */
  const selectedRowKeys = ref<string[]>([])

  /** # 选中数据的集合 */
  const selectedRows: Ref<T[]> = ref([])

  /** # 点击行选择事件 */
  function getCustomRow(config?: (row: T) => ICustomRow) {
    return (record: T) => {
      return {
        onClick: () => {
          if (isMultiple.value) {
            const index = selectedRowKeys.value.indexOf(record[mainKey] as string)
            if (index === -1) {
              selectedRowKeys.value.push(record[mainKey] as string)
              selectedRows.value.push(record)
            }
            else {
              selectedRowKeys.value.splice(index, 1)
              selectedRows.value.splice(index, 1)
            }
          }
          else {
            selectedRowKeys.value = [record[mainKey] as string]
            selectedRows.value = [record]
          }
        },
        ...(config?.(record)),
      }
    }
  }

  /**
   * # 导出
   * @param url 导出地址（要求该地址返回浏览器可直接下载的文件流）
   * @param payload 导出时额外携带的参数
   */
  function handleExport(url: string, payload?: Record<string, any>) {
    if (!dataSource.value?.length) {
      return message.warning('暂无数据可导出')
    }
    // 判断是否为完整文件下载链接
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url)
      return
    }
    const queryArr = Object.entries({ ...lastSearchParams.value, ...payload }).filter(([_key, value]) => {
      return value !== undefined && value !== null && value !== ''
    })
    const paramStr = new URLSearchParams(queryArr)?.toString()

    // 使用URL对象进行更健壮的URL处理
    try {
      // 移除URL开头的斜杠（如果有）
      const normalizedUrl = url.replace(/^\//, '')
      // 构建完整的基础URL
      const baseUrl = `${import.meta.env.VITE_BASE_URL}/${normalizedUrl}`

      // 创建URL对象用于处理查询参数
      const urlObj = new URL(baseUrl)

      // 如果paramStr不为空，添加所有查询参数
      if (paramStr) {
        // 解析paramStr并添加到URL对象中
        const params = new URLSearchParams(paramStr)
        params.forEach((value, key) => {
          urlObj.searchParams.append(key, value)
        })
      }
      window.open(urlObj.toString())
    }
    catch (error) {
      console.error('导出URL处理失败:', error)
      message.error('导出链接构建失败')
    }
  }

  /**
   * # 删除
   */
  async function handleDelete(deleteArr: T[]) {
    const deleteConfig = config.deleteConfig
    if (!config.deleteApi) {
      return message.error('删除接口未配置')
    }
    if (!deleteArr?.length) {
      message.warning('请选择要删除的数据')
      return
    }
    // 执行删除前的钩子（通常用于二次确认、删除前的检查等）
    if (deleteConfig?.beforeDelete) {
      const isDelete = await deleteConfig.beforeDelete(deleteArr)
      if (!isDelete) {
        return
      }
    }
    Modal.confirm({
      title: deleteConfig?.title || '确认要删除数据吗?',
      icon: h(LucideIcon, { name: 'CircleAlert' }),
      content: deleteConfig?.content || '删除后数据无法恢复',
      centered: true,
      okText: deleteConfig?.okText || '确认',
      cancelText: deleteConfig?.cancelText || '取消',
      async onOk() {
        await config.deleteApi!(deleteArr)
        message.success('删除成功')
        if (dataSource.value.length === 1 && page.value > 1) {
          page.value--
        }
        handleReloadTable()
      },
    })
  }

  /**
   * # 排序方法
   */
  function handleSortChange(_pagination: any, _filters: any, sorter: any) {
    const { order, field } = sorter
    if (!field) {
      return
    }
    const desc = order === 'descend' ? OrderType.DESC : OrderType.ASC
    const sortQuery = {
      orderBy: order ? field : '',
      order: order ? desc : '',
    }
    handleSearch(sortQuery)
  }

  /**
   *  # 获取分页配置
   * @returns TablePaginationConfig
   */
  function getPagination(mixinConfig?: Omit<TablePaginationConfig, 'total' | 'pageSize' | 'current' | 'onChange'>) {
    return {
      total: total.value,
      pageSize: size.value,
      current: page.value,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total: number) => `共 ${total} 条数据`,
      onChange: handlePageChange,
      pageSizeOptions: pageSizeOptions.value,
      ...mixinConfig,
    } as TablePaginationConfig
  }

  /**
   * # 获取表格行选择配置
   */
  function getRowSelection(mixinConfig?: Omit<TableRowSelection<T>, 'selectedRowKeys' | 'onChange'>) {
    return {
      selectedRowKeys: selectedRowKeys.value,
      preserveSelectedRowKeys: config.isCacheSelect,
      onSelect: (record: T, selected: boolean) => {
        if (selected) {
          if (isMultiple.value) {
            selectedRowKeys.value.push(record[mainKey] as string)
            selectedRows.value.push(record)
          }
          else {
            selectedRowKeys.value = [record[mainKey] as string]
            selectedRows.value = [record]
          }
        }
        else {
          const ind = selectedRows.value.findIndex(d => d[mainKey] === record[mainKey])
          if (ind !== -1) {
            selectedRowKeys.value.splice(ind, 1)
            selectedRows.value.splice(ind, 1)
          }
        }
      },
      onSelectAll: (selected: boolean, _selectedRows: T[], changeRows: T[]) => {
        const changeRowIds = changeRows.map(d => d[mainKey] as string)

        if (selected) {
          // 去重添加选中的行
          const existingIds = new Set(selectedRowKeys.value)
          const newRecords = changeRows.filter(row => !existingIds.has(row[mainKey] as string))
          selectedRowKeys.value = [...selectedRowKeys.value, ...newRecords.map(d => d[mainKey] as string)]
          selectedRows.value = [...selectedRows.value, ...newRecords]
        }
        else {
          // 移除取消选中的行
          selectedRowKeys.value = selectedRowKeys.value.filter(id => !changeRowIds.includes(id))
          selectedRows.value = selectedRows.value.filter(row => !changeRowIds.includes(row[mainKey] as string))
        }
      },
      ...mixinConfig,
    }
  }

  return {
    loading,
    dataSource,
    lastSearchParams,
    handleSearch,
    handleReset,
    handleReloadTable,
    handleDelete,
    handleSortChange,
    handleExport,
    getCustomRow,
    getPagination,
    getRowSelection,
  }
}
