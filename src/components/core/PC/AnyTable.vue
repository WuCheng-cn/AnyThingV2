<template>
  <div ref="tableBoxRef" class="w-full h-full">
    <a-table
      v-model:expanded-row-keys="expandedRowKeys"
      v-bind="$attrs"
      :columns="columns"
      :scroll="{
        y: tableSize.tableHeight,
        x: tableSize.tableWidth,
      }"
      @change="onChange"
      @resize-column="handleResizeColumn"
    >
      <template v-for="(_value, key) in slots" :key="key" #[key]="slotProps">
        <slot :name="key" v-bind="slotProps" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup generic="T extends AnyDataBaseEntity">
import type { AnyDataBaseEntity, ClassConstructorWithBaseModel, ClassFieldNames } from '@arayui/core'
import type { Table, TableProps } from 'ant-design-vue'
import { AnyDataTransformHelper, AnyDateTimeHelper } from '@arayui/core'

interface Props extends TableProps {
  /** # 配置实体 */
  entity: ClassConstructorWithBaseModel<T>
  /** # 是否显示序号 */
  showIndex?: boolean
  /** # 要展示的字段列表（只会从本来要展示的字段列表中取值，不会新增字段） */
  fieldList?: (ClassFieldNames<T>)[]
  /** # 字段排序参考 */
  fieldOrder?: (ClassFieldNames<T>)[]
  /** # 是否可调整列宽 */
  resizable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
})

const emits = defineEmits(['update:expandedRowKeys'])

const slots = defineSlots<GetComponentSlots<InstanceType<typeof Table>>>()

// eslint-disable-next-line new-cap
const instance = new props.entity()

const expandedRowKeys = computed({
  get() {
    return props.expandedRowKeys
  },
  set(val) {
    emits('update:expandedRowKeys', val)
  },
})

const widthMap = ref({} as Record<ClassFieldNames<T>, number>)

/** # 获取父级容器宽高作为当前表格的宽高 */
const tableSize = ref({
  tableWidth: 0,
  tableHeight: 0,
})

const el = useTemplateRef('tableBoxRef')

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  tableSize.value = {
    tableWidth: width,
    tableHeight: height,
  }
})

/** # 表格列配置 */
const columns = computed(() => {
  if (props.columns) {
    return props.columns
  }
  const config = instance.getTableFieldConfigObj()
  let tableFieldList = instance.getTableFieldList() as (ClassFieldNames<T>)[]

  // 过滤出要外部传入指定展示的字段
  if (props.fieldList?.length) {
    tableFieldList = tableFieldList.filter(item => props.fieldList?.includes(item as ClassFieldNames<T>))
  }

  // 按传入的顺序排序
  if (props.fieldOrder?.length) {
    tableFieldList = AnyDataTransformHelper.sortByArray(tableFieldList, props.fieldOrder || [])
  }

  const columns = tableFieldList.map((field) => {
    if (!tableFieldList.includes(field)) {
      return {}
    }
    const filedConfig = config[field] || {}
    const dictionaryArray = instance.getFieldDictionaryArray(field)
    // 1.配置有自定义渲染函数，则使用自定义渲染函数；
    // 2.检查字段是否有字典数组，有则使用字典数组；
    // 3.判断是否为日期类型，是则使用日期格式化函数；
    // 否则使用默认
    let customRender: any
    if (filedConfig.customRender) {
      customRender = filedConfig.customRender
    }
    else if (dictionaryArray) {
      customRender = ({ text }: { text: T[ClassFieldNames<T>] }) => {
        return dictionaryArray.getLabelByValue(text)
      }
    }
    else if (filedConfig.dateFormat) {
      customRender = ({ text }: { text: T[ClassFieldNames<T>] }) => {
        return AnyDateTimeHelper.format(String(text), filedConfig.dateFormat)
      }
    }
    return {
      title: instance.getTableFieldLabel(field),
      dataIndex: field,
      key: field,
      ellipsis: filedConfig?.ellipsis,
      width: widthMap.value[field] || filedConfig?.width || 100,
      sorter: filedConfig?.sorter,
      fixed: filedConfig?.fixed,
      align: filedConfig?.align,
      resizable: props.resizable,
      ...(customRender ? { customRender } : {}),
    }
  })

  // 是否展示表格index
  if (props.showIndex) {
    columns.unshift({
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      ellipsis: true,
      width: 60,
      sorter: false,
      fixed: undefined,
      align: 'center',
      resizable: false,
      customRender: ({ index }: { index: number }) => index + 1,
    })
  }

  return columns
})

/** # 处理列宽调整 */
function handleResizeColumn(width: number, column: any) {
  widthMap.value[column.dataIndex] = width
}

defineExpose({
  columns,
})
</script>

<style>
.ant-table-wrapper .ant-table-pagination.ant-pagination{
  margin-top: 4px !important;
  margin-bottom: 2px !important;
}
</style>
