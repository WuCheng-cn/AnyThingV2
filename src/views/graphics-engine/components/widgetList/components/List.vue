<template>
  <a-collapse v-model:active-key="active">
    <a-collapse-panel
      v-for="item in (Object.keys(renderMap) as IWidget['category'][])"
      :key="item"
      :header="WidgetCategoryDict.getLabelByValue(item)"
    >
      <div class="relative h-full p-2.5 overflow-hidden transition-all duration-300 ease-in-out" style="background-color: var(--body-color);">
        <div
          v-for="(widget, index) in renderMap[item]"
          :key="widget.name"
          class="relative flex flex-col cursor-grab backdrop-blur-md border px-2.5 transition-all duration-300 ease-in-out shadow-md"
          :style="getItemStyle(index)"
          @mousedown="onMousedown($event, widget)"
        >
          <div class="py-1.5">
            <div class="text-sm tracking-wider transition-all duration-300 ease-in-out">
              {{ widget.name }}
            </div>
          </div>
          <div class="flex-1 h-0">
            <img
              :src="widget.image"
              class="w-full h-full object-contain"
            >
          </div>
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import type { IWidget } from '@/views/graphics-engine/interface/IWidget'
import { WidgetCategoryDict } from '@/views/graphics-engine/interface/IWidget'

const props = defineProps<{
  /** # 组件列表 */
  widgetList: IWidget[]
  /** # 列数 */
  columns: number
  /** # 拖拽事件 */
  onMousedown: (e: MouseEvent, item: IWidget) => void
}>()

const renderMap = computed(() => {
  return props.widgetList.reduce((acc, cur) => {
    const category = cur.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(cur)
    return acc
  }, {} as Record<IWidget['category'], IWidget[]>)
})

const active = ref(Object.keys(renderMap.value))

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
  const widgetItemHeight = `${widgetItemWidth} * 1.25`
  const top = isFirstRow
    ? `${gap}px`
    : `calc((${widgetItemHeight} + ${gap}px) * ${Math.floor(index / props.columns)} + ${gap}px)`

  return {
    width,
    left,
    top,
    'aspect-ratio': '1/1.25',
    'background-color': 'var(--table-color)',
    'border-color': 'var(--border-color)',
    'border-radius': 'var(--any-border-radius)',
  }
}
</script>
