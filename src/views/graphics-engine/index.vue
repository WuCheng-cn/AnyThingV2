<template>
  <a-layout class="h-full">
    <a-layout class="h-full">
      <WidgetSearch
        class="absolute left-0 top-0 z-50 w-[280px]"
        :on-mousedown="onMousedown"
      />

      <div v-onResize:100="resize" class="h-full overflow-hidden">
        <div ref="container" class="w-full h-full transition-all" />
        <TeleportContainer />
      </div>
    </a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="h-full "
      collapsible
      collapsed-width="0"
      width="400"
      theme="light"
    >
      <template v-if="currentNode">
        <ConfigurationForm />
      </template>
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts" setup>
import type { Graph, Node } from '@antv/x6'
import type { Dnd } from '@antv/x6-plugin-dnd'
import type { IWidgetUnknown } from './interface/IWidget'
import { useGraphicsEngine } from '@/views/graphics-engine/hooks/useGraphicsEngine'
import { getTeleport } from '@antv/x6-vue-shape'
import ConfigurationForm from './components/configurationForm/index.vue'
import WidgetSearch from './components/widgetList/index.vue'

let graph: Graph | undefined

let dnd: Dnd | undefined

const collapsed = ref(false)

const currentNode = ref<Node | null>(null)

const container = ref<HTMLElement | null>(null)

// 提供图表实例与当前节点给子组件
provide('graph', graph)

provide('currentNode', currentNode)

/** # 传送门容器组件 */
const TeleportContainer = getTeleport()

/** # 画布自适应 */
function resize(e: ResizeObserverEntry[]) {
  if (!graph) {
    return
  }
  const { inlineSize: boxWidth, blockSize: boxHeight } = e[0].devicePixelContentBoxSize[0]
  graph.resize(boxWidth, boxHeight)
  // graph.zoomToFit({ padding: 20 })
}

/** # 处理组件拖拽事件 */
function onMousedown(e: MouseEvent, item: IWidgetUnknown) {
  if (!graph || !dnd) {
    console.warn('图表实例或拖拽插件实例不存在')
    return
  }
  const { width, height } = item
  const node = graph.createNode({ shape: item.nodeShape.toString(), width, height })
  dnd.start(node, e)
}

// 初始化画布
onMounted(() => {
  if (!container.value) {
    console.warn('容器不存在')
    return
  }
  const { graphInstance, dndInstance } = useGraphicsEngine(container.value)
  graph = graphInstance
  dnd = dndInstance

  // 选中节点事件
  graph.on('node:selected', ({ node }) => {
    currentNode.value = node
    collapsed.value = false
  })

  // 点击空白区域清除选中节点，并折叠侧边栏
  graph.on('blank:click', () => {
    currentNode.value = null
    collapsed.value = true
  })
})

// 清理事件监听器
onUnmounted(() => {
  graph?.dispose()
})
</script>

<style lang="less">
// 画布的覆盖样式文件
@import url('./style/index.less');
</style>
