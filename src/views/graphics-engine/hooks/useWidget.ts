import type { Node } from '@antv/x6'

/**
 * # 图形引擎元件辅助hooks
 * @type T 组件绑定数据类型
 */
export function useWidget<T>() {
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

  const widgetData = computed({
    get: () => node.getData() as T,
    set: (value: T) => {
      node.setData(value)
    },
  })

  return {
    /** # 当前组件节点实例 */
    node,
    /** # 当前组件绑定数据 */
    widgetData,
  }
}
