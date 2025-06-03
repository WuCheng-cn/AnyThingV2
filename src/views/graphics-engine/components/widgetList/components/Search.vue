<template>
  <div class="flex items-center gap-2.5 w-full justify-between p-[5px_10px] bg-[var(--colorBgLayout)] backdrop-blur-lg rounded-t-[10px] transition-all duration-300">
    <div class="flex items-center gap-1">
      <span>组件</span>
      <FilterIcon :size="12" :stroke-width="3" />
    </div>
    <div class="flex flex-1 w-full overflow-hidden justify-between">
      <div class="flex-1">
        <a-input
          v-model:value="searchValue"
          placeholder="组件名称..."
          @focus="isFocus = true"
          @blur="isFocus = false"
          @input="emits('change', searchValue)"
        />
      </div>
      <a-popover>
        <template #content>
          {{ columns === 1 ? '列表' : '网格' }}
        </template>
        <a-button
          class="transition-all duration-300"
          :class="{
            'w-0! p-0! shadow-none! border-none!': isFocus,
          }"
          :icon="columns === 1 ? h(LayoutList) : h(LayoutGrid) "
          @click="handleGridChange"
        />
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FilterIcon, LayoutGrid, LayoutList } from 'lucide-vue-next'
import { h, ref } from 'vue'

const emits = defineEmits<{
  (event: 'change', data: string): void
  (event: 'columnsChange', data: number): void
}>()

const isFocus = ref<boolean>(false)

const columns = ref(1)

const searchValue = ref('')

function handleGridChange() {
  columns.value >= 2
    ? columns.value = 1
    : columns.value += 1
  emits('columnsChange', columns.value)
}
</script>
