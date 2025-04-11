<template>
  <van-field
    v-model="fieldValue"
    v-bind="$attrs"
    is-link
    readonly
    @click="showPicker = true"
  />
  <van-popup
    v-model:show="showPicker"
    destroy-on-close
    round
    position="bottom"
  >
    <van-time-picker
      v-model="value"
      v-bind="$attrs"
      title="选择时间"
      :formatter="formatter"
      @confirm="onChange"
    />
  </van-popup>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string[] | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string[] | undefined): void
  (event: 'change', value: string[] | null): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const showPicker = ref(false)

const fieldValue = ref('')

function formatter(type: 'hour' | 'minute' | 'second', option: any) {
  if (type === 'hour') {
    option.text += '时'
  }
  if (type === 'minute') {
    option.text += '分'
  }
  if (type === 'second') {
    option.text += '秒'
  }
  return option
}

function onChange({ selectedValues }: any) {
  showPicker.value = false
  fieldValue.value = selectedValues?.join(':')
  emits('change', selectedValues)
}
</script>
