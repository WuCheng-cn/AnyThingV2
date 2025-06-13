<template>
  <van-field
    v-model="fieldValue"
    v-bind="$attrs"
    is-link
    readonly
    @click="showPicker = true"
  >
    <template #right-icon>
      <Transition
        enter-active-class="animate-in fade-in zoom-in"
        leave-active-class="animate-out fade-out zoom-out"
        @click.stop="onClear()"
      >
        <CircleX
          v-show="fieldValue"
          :size="16"
        />
      </Transition>
    </template>
  </van-field>
  <van-popup
    v-model:show="showPicker"
    destroy-on-close
    round
    position="bottom"
  >
    <van-picker-group
      title="日期范围"
      next-step-text="下一步"
      :tabs="['开始日期', '结束日期']"
      @confirm="onChange"
      @cancel="showPicker = false"
    >
      <van-date-picker v-model="startDate" />
      <van-date-picker v-model="endDate" />
    </van-picker-group>
  </van-popup>
</template>

<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next'
import { EDateFormatType } from '../../../enum/EDateFormatType'
import { AnyDateTimeHelper } from '../../../helper/AnyDateTimeHelper'

type VanDateRangeValue = [string[], string[]]

const props = defineProps<{
  modelValue: VanDateRangeValue | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: VanDateRangeValue | undefined): void
  (event: 'change', value: VanDateRangeValue | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

const showPicker = ref(false)

const fieldValue = ref('')

const startDate = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD).split('-'))
const endDate = ref(AnyDateTimeHelper.format(Date.now(), EDateFormatType.YYYY_MM_DD).split('-'))

function onChange() {
  showPicker.value = false
  fieldValue.value = `${startDate.value.join('-')} - ${endDate.value.join('-')}`
  value.value = [startDate.value, endDate.value]
  emits('change', value.value)
}

function onClear() {
  fieldValue.value = ''
  value.value = [] as any
  emits('change', value.value)
}
</script>
