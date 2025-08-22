import type { Node } from '@antv/x6'
import type { ClassConstructor } from '@arayui/core'
import type { WidgetFormBase } from '../entity/WidgetFormBase'
import type { IWidget } from '../interface/IWidget'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'

/**
 * # 图形引擎元件辅助hooks
 * @type T 组件绑定数据类型
 */
export function useWidget<T extends ClassConstructor<WidgetFormBase>[]>() {
  const getNode: (() => Node) | undefined = inject('getNode')
  if (!getNode) {
    console.warn('getNode is undefined：获取节点的方法未被注入')
    return {
      node: undefined,
      widgetData: undefined,
    }
  }

  const node = getNode()
  if (!node) {
    console.warn('node is undefined：未获取到节点')
  }

  // 创建响应式引用，用于追踪数据变化
  const dataVersion = ref(0)

  // 监听节点数据变化
  const nodeEventHandler = () => {
    dataVersion.value++
  }

  // 添加节点数据变化监听
  onMounted(() => {
    if (node) {
      node.on('change:data', nodeEventHandler)
    }
  })

  // 移除事件监听
  onUnmounted(() => {
    if (node) {
      node.off('change:data', nodeEventHandler)
    }
  })

  const widgetInstance = computed({
    get: () => {
      // 使用dataVersion作为依赖，确保当数据版本变化时重新计算
      const _version = dataVersion.value
      return node.getData() as IWidget<T>
    },
    set: (_value: IWidget<T>) => {
      // node.setData(value)
      // 手动触发版本更新
      dataVersion.value++
    },
  })

  const widgetData = computed({
    get: () => {
      return widgetInstance.value?.widgetData
    },
    set: (_value: Record<string, InstanceType<T[number]>>) => {
      // widgetInstance.value.widgetData = value
    },
  })

  return {
    /** # 当前组件节点实例 */
    node,
    /** # 当前组件配置实例 */
    widgetInstance,
    /** # 当前组件绑定数据 */
    widgetData,
  }
}
