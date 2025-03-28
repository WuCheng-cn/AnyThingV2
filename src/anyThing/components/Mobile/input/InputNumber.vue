<template>
  <van-field v-bind="$attrs">
    <template #input>
      <van-stepper
        v-model.trim="value"
        v-bind="$attrs"
        @change="onChange"
      />
    </template>
  </van-field>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: number | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: number | undefined): void
  (event: 'change', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(value: string) {
  emits('change', value)
}
</script>
