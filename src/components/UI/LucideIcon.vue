<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** # 图标名称 */
  name: keyof typeof icons
  /** # 图标大小 */
  size?: number
  /** # 图标颜色 */
  color?: string
  /** # 图标线宽 */
  strokeWidth?: number
  /** # 图标默认类名 */
  defaultClass?: string
}>(), {
  size: 16,
  strokeWidth: 2,
})

const icon = computed<any>(() => icons[props.name as keyof typeof icons])
</script>
