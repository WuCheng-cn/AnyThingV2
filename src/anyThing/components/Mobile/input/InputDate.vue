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
      v-if="props.showTime"
      title="日期时间"
      next-step-text="下一步"
      :tabs="['选择日期', '选择时间']"
      @confirm="onDateTimeChange"
      @cancel="showPicker = false"
    >
      <van-date-picker v-model="date" />
      <van-time-picker v-model="time" />
    </van-picker-group>
    <van-date-picker
      v-else
      title="选择日期"
      @confirm="onChange"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '@/anyThing/interface/IFormFieldConfig'
import { AnyDateTimeHelper } from '@/anyThing/helper/AnyDateTimeHelper'
import { CircleX } from 'lucide-vue-next'

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

function onChange({ selectedValues }: any) {
  showPicker.value = false
  fieldValue.value = selectedValues.join('-')
  value.value = selectedValues
  emits('change', value.value)
}

function onDateTimeChange() {
  showPicker.value = false
  const dateTime = [date.value.join('-'), time.value.join(':')].join(' ')
  fieldValue.value = AnyDateTimeHelper.format(dateTime, props.formFieldConfig.dateFormat)
  value.value = [...date.value, ...time.value]
  emits('change', value.value)
}

function onClear() {
  if (props.showTime) {
    fieldValue.value = ''
    date.value = []
    time.value = []
    emits('change', [])
  }
  else {
    fieldValue.value = ''
    value.value = []
    emits('change', value.value)
  }
}
</script>
