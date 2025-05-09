<template>
  <div class="relative h-full p-2.5 overflow-auto transition-all duration-300 ease-in-out" style="background-color: var(--body-color);">
    <div
      v-for="(item, index) in widgetList"
      :key="item.name"
      class="absolute flex flex-col cursor-grab backdrop-blur-md border px-2.5 transition-all duration-300 ease-in-out shadow-md"
      :style="getItemStyle(index)"
      @mousedown="onMousedown($event, item)"
    >
      <div class="py-1.5">
        <a-ellipsis class="text-sm tracking-wider transition-all duration-300 ease-in-out">
          {{ item.name }}
        </a-ellipsis>
      </div>
      <div class="flex-1 h-0">
        <a-image
          lazy
          preview-disabled
          object-fit="scale-down"
          :src="item.image"
          class="h-full w-full"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IRegistItem } from '@/views/graphics-engine/interface/IRegistItem'

const props = defineProps<{
  /** # 组件列表 */
  widgetList: IRegistItem[]
  /** # 列数 */
  columns: number
  /** # 拖拽事件 */
  onMousedown: (e: MouseEvent, item: IRegistItem) => void
}>()

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
