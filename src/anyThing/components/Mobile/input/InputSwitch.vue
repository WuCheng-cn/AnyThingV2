<template>
  <van-field>
    <template #input>
      <van-switch
        v-model="value"
        v-bind="$attrs"
        size="20px"
        :active-value="checkedValue"
        :inactive-value="uncheckedValue"
        @change="onChange"
      />
    </template>
  </van-field>
</template>

<script lang="ts" setup>
type ValueType = number | string | boolean | undefined

const props = defineProps<{
  modelValue: ValueType
  checkedValue?: ValueType
  uncheckedValue?: ValueType
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: ValueType): void
  (event: 'change', value: Omit<ValueType, 'undefined'>): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(e: string | number | boolean) {
  emits('change', e)
}
</script>
