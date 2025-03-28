<template>
  <van-field
    v-model.trim="value"
    v-bind="$attrs"
    @update:model-value="onChange"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | undefined): void
  (event: 'change', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(e: string) {
  emits('change', e)
}
</script>
