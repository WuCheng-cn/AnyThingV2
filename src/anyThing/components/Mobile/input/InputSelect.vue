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
    <van-picker
      v-model="value"
      :columns="(props.options as any)"
      :columns-field-names="{ text: 'label' }"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import type { Numeric } from 'vant/lib/utils'
import type { IDictionary } from '../../../interface/IDictionary'

const props = defineProps<{
  modelValue: Numeric
  options: IDictionary[]
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | number | undefined): void
  (event: 'change', value: string | number | undefined): void
}>()

const value = computed({
  get: () => [props.modelValue],
  set: (val) => {
    emits('update:modelValue', val?.[0])
  },
})

const showPicker = ref(false)

const fieldValue = ref('')

function onConfirm({ selectedValues, selectedOptions }: any) {
  showPicker.value = false
  fieldValue.value = selectedOptions[0].label
  emits('change', selectedValues[0])
}
</script>
