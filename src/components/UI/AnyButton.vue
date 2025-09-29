<script lang="ts" setup>
import type { Button, ButtonProps } from 'ant-design-vue'
import type { VNode } from 'vue'

interface ExtraButtonProps {
  content?: any
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ButtonProps & {
  content?: string | VNode
}>()

const slots = defineSlots<GetComponentSlots<InstanceType<typeof Button>> & ExtraButtonProps>()

const tooltipVisible = ref(false)
</script>

<template>
  <a-popover v-model:open="tooltipVisible" :content="props.content">
    <a-button v-bind="$props">
      <template v-for="(_value, key) in slots" :key="key">
        <slot :name="key" />
      </template>
    </a-button>
  </a-popover>
</template>
