import { defineStore } from 'pinia'

const useGraphStore = defineStore('graph', () => {
  const records = ref<Record<string, any>>({})

  /** # 设置记录 */
  const setRecord = (id: string, data: any) => {
    records.value[id] = data
  }

  /** # 获取记录 */
  const getRecord = (id: string) => {
    return records.value[id]
  }

  /** # 删除记录 */
  const deleteRecord = (id: string) => {
    delete records.value[id]
  }

  /** # 清空记录 */
  const clearRecords = () => {
    records.value = {}
  }

  return {
    records,
    setRecord,
    getRecord,
    deleteRecord,
    clearRecords,
  }
})

export default useGraphStore
