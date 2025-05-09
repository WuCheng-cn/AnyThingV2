<template>
  <a-layout class="h-full">
    <a-layout class="h-full">
      <WidgetFilter class=" absolute left-0 top-0 z-50 w-[280px]" :on-mousedown="onMousedown" />

      <div v-onResize:100="resize" class="h-full overflow-hidden">
        <div id="container" class=" w-full h-full transition-all" />
        <TeleportContainer />
      </div>
    </a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="h-full"
      collapsible
      collapsed-width="0"
    >
      <div v-for="item in (currentNode?.getData() as IDefaultOption)?.formConfig" :key="item.title">
        <component
          :is="item.component"
          :resize-handler="resizeHandler"
          :current-node="currentNode"
        />
      </div>
      <a-button @click="handleClick" />
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts" setup>
import type { Graph, Node } from '@antv/x6'
import type { IDefaultOption } from './interface/IDefaultOption'
import type { IRegistItem } from './interface/IRegistItem'
import GraphicsHelper from '@/views/graphics-engine/index'
import { Dnd } from '@antv/x6-plugin-dnd'
import { getTeleport } from '@antv/x6-vue-shape'
import { defineComponent, onMounted, ref } from 'vue'
import WidgetFilter from './components/widgetList/index.vue'

const graph = ref<Graph>()

provide('graph', graph)

const TeleportContainer = getTeleport()

defineComponent({
  name: 'TeleportContainer',
  components: {
    TeleportContainer,
  },
})

const collapsed = ref(true)

const currentNode = ref<Node<Node.Properties>>()

/**
 * @description: 画布自适应
 */
function resize(e: ResizeObserverEntry[]) {
  const boxWidth = e[0].devicePixelContentBoxSize[0].inlineSize
  const boxHeight = e[0].devicePixelContentBoxSize[0].blockSize
  graph.value?.resize(boxWidth, boxHeight)
  graph.value?.zoomToFit({
    padding: 20,
  })
}

/**
 * @description: 拖拽组件
 */
function onMousedown(e: MouseEvent, item: IRegistItem) {
  if (!graph.value)
    return
  const dnd = new Dnd({
    target: graph.value as Graph,
    getDragNode: (node: any) => node.clone({ keepId: true }),
    getDropNode: (node: any) => node.clone({ keepId: true }),
  })
  const node = graph.value.createNode({
    shape: item.nodeShape,
  })
  dnd.start(node, e)
}

/**
 * @description: 初始化画布
 */
onMounted(() => {
  const container = document.getElementById('container') as HTMLElement
  graph.value = GraphicsHelper.create(container)
  // 将Screen组件添加进画布
  // graph.value.addNode({ shape: 'Screen', x: 20, y: 20 })

  graph.value.on('node:selected', ({ node }) => {
    currentNode.value = node
  })
  graph.value.on('node:resizing', () => {
  })
})

function resizeHandler(width: number, height: number) {
  currentNode.value?.setSize(width, height)
}

function handleClick() {

}
</script>

<style lang="less">
// 画布的覆盖样式文件
@import url('./style/index.less');
</style>
