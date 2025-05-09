<template>
  <div
    v-onResize:0="resize"
    class="h-full flex flex-col "
    :style="{
      '--widget-filter-width': `${widgetFilterWidth}px`,
    }"
  >
    <Search
      @columns-change="columns = $event"
      @change="searchValue = $event"
    />
    <List
      v-show="widgetFilterWidth"
      :search-value="searchValue"
      :columns="columns"
      :widget-list="list"
      :on-mousedown="onMousedown"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IWidget } from '../../interface/IWidget'
import { computed, ref } from 'vue'
import { Registry } from '../../widgets'
import List from './components/List.vue'
import Search from './components/Search.vue'

defineProps({
  /**
   * # 拖拽事件
   */
  onMousedown: {
    type: Function as PropType<(e: MouseEvent, item: IWidget) => void>,
    default: () => () => ({}),
  },
})

const columns = ref<number>(1)

/**
 * 搜索条件
 */
const searchValue = ref<string>('')

/**
 * # 过滤后的组件
 */
const list = computed(() => {
  return Registry.filter(item => item.name.toLocaleLowerCase().includes(searchValue.value))
})

/**
 * 组件过滤器宽度
 */
const widgetFilterWidth = ref<number>(0)
function resize(e: ResizeObserverEntry[]) {
  widgetFilterWidth.value = e[0].devicePixelContentBoxSize[0].inlineSize
}
</script>
