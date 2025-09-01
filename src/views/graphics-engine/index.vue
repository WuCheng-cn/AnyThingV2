<template>
  <a-layout class="h-full">
    <a-layout class="h-full flex flex-col">
      <WidgetFilter class="absolute left-0 top-0 z-50 w-[280px]" />
      <div class="flex-1 h-0 ">
        <div ref="container" class="w-full h-full" />
        <TeleportContainer />
      </div>
      <div class="p-2">
        <ToolBar v-if="graph" class="w-full" />
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
import { getTeleport } from '@antv/x6-vue-shape'
import { useGraphicsEngine } from '@/views/graphics-engine/hooks/useGraphicsEngine'
import ConfigurationForm from './components/configurationForm/index.vue'
import ToolBar from './components/toolBar/index.vue'
import WidgetFilter from './components/widgetList/index.vue'

const graph = shallowRef<Graph | undefined>(undefined)

const dnd = shallowRef<Dnd | undefined>(undefined)

const collapsed = ref(false)

const currentNode = shallowRef<Node | null>(null)

const container = ref<HTMLElement | null>(null)

// 提供图表实例、拖拽实例、当前节点给子组件
provide('graph', graph)

provide('dnd', dnd)

provide('currentNode', currentNode)

/** # 传送门容器组件 */
const TeleportContainer = getTeleport()

// 初始化画布
onMounted(() => {
  if (!container.value) {
    console.warn('容器不存在')
    return
  }
  const { graphInstance, dndInstance } = useGraphicsEngine(container.value)
  graph.value = graphInstance
  dnd.value = dndInstance

  // 选中节点事件
  graph.value.on('node:selected', ({ node }) => {
    const cellsNum = graph.value?.getSelectedCellCount() || 0
    if (cellsNum > 1) {
      return
    }
    currentNode.value = node
    collapsed.value = false
  })

  // 点击空白区域清除选中节点，并折叠侧边栏
  graph.value.on('blank:click', () => {
    currentNode.value = null
    collapsed.value = true
  })
})

// 清理事件监听器
onUnmounted(() => {
  graph.value?.dispose()
})
</script>

<style lang="less">
// 画布的覆盖样式文件
@import url('./style/index.less');
</style>
