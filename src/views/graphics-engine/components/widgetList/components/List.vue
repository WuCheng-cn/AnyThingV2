<template>
  <a-collapse v-model:active-key="active" :bordered="false">
    <a-collapse-panel
      v-for="item in (Object.keys(renderMap) as IWidgetUnknown['category'][])"
      :key="item"
      :header="WidgetCategoryDict.getLabelByValue(item)"
    >
      <div
        class="relative h-full p-2.5 overflow-hidden transition-all duration-300 ease-in-out"
        :style="[{ 'background-color': 'var(--body-color)' }, getCategoryContainerStyle(item)]"
      >
        <div
          v-for="(widget, index) in renderMap[item]"
          :key="widget.name"
          class=" absolute flex flex-col cursor-grab backdrop-blur-md transition-all duration-300 ease-in-out shadow-md rounded-md overflow-hidden"
          :style="getItemStyle(index)"
          @mousedown="onMousedown($event, widget)"
        >
          <div class="p-1.5 bg-[var(--colorBgLayout)]">
            <div
              class="text-sm tracking-wider transition-all duration-300 ease-in-out font-bold text-ellipsis whitespace-nowrap overflow-hidden"
              :style="{ fontSize: 'var(--fontSize)px' }"
            >
              {{ widget.name }}
            </div>
          </div>
          <div class="flex-1 h-0 p-1.5">
            <img
              :src="widget.image"
              class="w-full h-full bg-[#1a1a1a] rounded-md object-contain"
            >
          </div>
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import type { IWidgetUnknown } from '@/views/graphics-engine/interface/IWidget'
import type { Graph } from '@antv/x6'
import type { Dnd } from '@antv/x6-plugin-dnd'
import type { ShallowRef } from 'vue'
import { WidgetCategoryDict } from '@/views/graphics-engine/interface/IWidget'

const props = defineProps<{
  /** # 组件列表 */
  widgetList: IWidgetUnknown[]
  /** # 列数 */
  columns: number
}>()

const graph = inject<ShallowRef<Graph>>('graph')

const dnd = inject<ShallowRef<Dnd>>('dnd')

const renderMap = computed(() => {
  return props.widgetList.reduce((acc, cur) => {
    const category = cur.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(cur)
    return acc
  }, {} as Record<IWidgetUnknown['category'], IWidgetUnknown[]>)
})

const active = ref(Object.keys(renderMap.value))

/** # 处理组件拖拽事件 */
function onMousedown(e: MouseEvent, item: IWidgetUnknown) {
  if (!graph?.value || !dnd?.value) {
    console.warn('图表实例或拖拽插件实例不存在')
    return
  }
  const { width, height } = item
  const node = graph.value.createNode({ shape: item.nodeShape.toString(), width, height })
  dnd.value.start(node, e)
}

function getItemStyle(index: number) {
  const gap = 10 // 间隙大小
  const isFirstColumn = index % props.columns === 0
  const isFirstRow = index < props.columns

  // 计算宽度和高度比例
  const width = `calc((100% - ${gap}px) / ${props.columns} - ${gap}px)`

  // 计算左侧位置
  const left = isFirstColumn
    ? `${gap}px`
    : `calc((100% - ${gap}px) / ${props.columns} * ${index % props.columns} + ${gap}px)`

  // 计算顶部位置
  const widgetFilterWidth = 'var(--widget-filter-width)'
  const widgetItemWidth = `((${widgetFilterWidth} - ${gap}px) / ${props.columns} - ${gap}px)`
  const widgetItemHeight = `${widgetItemWidth} * 0.9`
  const top = isFirstRow
    ? `${gap}px`
    : `calc((${widgetItemHeight} + ${gap}px) * ${Math.floor(index / props.columns)} + ${gap}px)`

  return {
    width,
    left,
    top,
    'aspect-ratio': '1/0.9',
    'background-color': 'var(--table-color)',
    'border-color': 'var(--border-color)',
    'border-radius': 'var(--any-border-radius)',
  }
}

function getCategoryContainerStyle(category: IWidgetUnknown['category']) {
  const items = renderMap.value[category] || []
  const gap = 10 // 间隙大小

  if (items.length === 0)
    return { height: '0px' }

  // 计算行数
  const rows = Math.ceil(items.length / props.columns)

  // 计算容器高度：考虑每行高度和间隙
  const widgetFilterWidth = 'var(--widget-filter-width)'
  const widgetItemWidth = `((${widgetFilterWidth} - ${gap}px) / ${props.columns} - ${gap}px)`
  const widgetItemHeight = `${widgetItemWidth} * 0.9`

  return {
    height: `calc((${widgetItemHeight} + ${gap}px) * ${rows} + ${gap}px)`,
  }
}
</script>
