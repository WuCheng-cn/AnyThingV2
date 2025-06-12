<template>
  <van-field
    v-model="fieldValue"
    v-bind="$attrs"
    is-link
    readonly
    clearable
    @click="showPicker = true"
  />
  <van-popup
    v-model:show="showPicker"
    destroy-on-close
    round
    position="bottom"
  >
    <van-picker-group
      v-if="props.showTime"
      title="日期时间"
      next-step-text="下一步"
      :tabs="['选择日期', '选择时间']"
      @confirm="onDateTimeChange"
      @cancel="onDateTimeCancel"
    >
      <van-date-picker v-model="date" />
      <van-time-picker v-model="time" />
    </van-picker-group>
    <van-date-picker
      v-else
      title="选择日期"
      @confirm="onChange"
      @cancel="onCancel"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '@/anyThing/interface/IFormFieldConfig'
import { AnyDateTimeHelper } from '@/anyThing/helper/AnyDateTimeHelper'

const props = defineProps<{
  modelValue: string[] | undefined
  /** # 显示时间 */
  showTime?: boolean
  /** # 表单配置 */
  formFieldConfig: IFormFieldConfig
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

const date = ref<string[]>([])

const time = ref<string[]>([])

function onCancel() {
  showPicker.value = false
  fieldValue.value = ''
  value.value = []
  emits('change', value.value)
}

function onChange({ selectedValues }: any) {
  showPicker.value = false
  fieldValue.value = selectedValues.join('-')
  value.value = selectedValues
  emits('change', value.value)
}

function onDateTimeCancel() {
  showPicker.value = false
  fieldValue.value = ''
  date.value = []
  time.value = []
  emits('change', [])
}

function onDateTimeChange() {
  showPicker.value = false
  const dateTime = [date.value.join('-'), time.value.join(':')].join(' ')
  fieldValue.value = AnyDateTimeHelper.format(dateTime, props.formFieldConfig.dateFormat)
  value.value = [...date.value, ...time.value]
  emits('change', value.value)
}
</script>
