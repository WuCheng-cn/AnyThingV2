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
    <van-picker-group
      title="时间范围"
      next-step-text="下一步"
      :tabs="['开始时间', '结束时间']"
      @confirm="onChange"
    >
      <van-time-picker v-model="startTime" />
      <van-time-picker v-model="endTime" />
    </van-picker-group>
  </van-popup>
</template>

<script lang="ts" setup>
import { EDateFormatType } from '~/utils/EDateFormatType'

type VanTimeRangeValue = [string[], string[]]

const props = defineProps<{
  modelValue: VanTimeRangeValue | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: VanTimeRangeValue | undefined): void
  (event: 'change', value: VanTimeRangeValue | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const showPicker = ref(false)

const fieldValue = ref('')

const startTime = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD_HH_MM).split(' ')?.[1]?.split(':'))
const endTime = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD_HH_MM).split(' ')?.[1]?.split(':'))

function onChange() {
  showPicker.value = false
  fieldValue.value = `${startTime.value?.join(':')} - ${endTime.value?.join(':')}`
  value.value = [startTime.value, endTime.value]
  emits('change', value.value)
}
</script>
