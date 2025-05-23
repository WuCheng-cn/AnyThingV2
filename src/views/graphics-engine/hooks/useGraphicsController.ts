import type { Graph } from '@antv/x6'
import type { ShallowRef } from 'vue'
import { message } from 'ant-design-vue'

export function useGraphicsController() {
  let scale = ref(1)
  const graph = inject<ShallowRef<Graph>>('graph')
  if (!graph) {
    throw new Error('graph is required')
  }

  // 缩放监听设置
  const zoomVersion = ref(0)
  graph.value.on('scale', () => {
    zoomVersion.value++
  })
  scale = computed({
    get: () => {
      const _version = zoomVersion.value
      return Number((graph.value.zoom() * 100).toFixed(0))
    },
    set: (value: number) => {
      graph.value.zoomTo(Number((value / 100).toFixed(2)))
    },
  })

  // 缩放锁定设置
  const lockScaleVersion = ref(0)
  const lockScale = computed({
    get: () => {
      const _version = lockScaleVersion.value
      return graph.value.isMouseWheelEnabled()
    },
    set: (value: boolean) => {
      graph.value.toggleMouseWheel(value)
      message.success(`画布缩放功能${value ? '解锁' : '锁定'}`)
      lockScaleVersion.value++
    },
  })

  return {
    /** # 缩放比例 */
    scale,
    /** # 锁定缩放 */
    lockScale,
  }
}
