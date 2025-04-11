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
    <van-date-picker
      v-model="value"
      title="选择日期"
      @confirm="onChange"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string[] | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string[] | undefined): void
  (event: 'change', value: string[] | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const showPicker = ref(false)

const fieldValue = ref('')

function onChange({ selectedValues }: any) {
  showPicker.value = false
  fieldValue.value = selectedValues.join('-')
  emits('change', selectedValues)
}
</script>
