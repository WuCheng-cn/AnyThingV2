<template>
  <div
    v-onResize:0="resize"
    class="flex flex-col bg-[var(--colorBgBase)] shadow-md rounded-md m-2"
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
      class=" max-h-[calc(100vh-105px)] overflow-auto"
      :search-value="searchValue"
      :columns="columns"
      :widget-list="list"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Registry } from '../../widgets'
import List from './components/List.vue'
import Search from './components/Search.vue'

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
