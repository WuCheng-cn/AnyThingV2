import { EFormItemType } from '@arayui/core'

type FormItemTypeMapping = {
  [K in EFormItemType]: any;
}

const InputString = defineAsyncComponent(() => import('./InputString.vue'))
const InputNumber = defineAsyncComponent(() => import('./InputNumber.vue'))
const InputSelect = defineAsyncComponent(() => import('./InputSelect.vue'))
const InputArea = defineAsyncComponent(() => import('./InputArea.vue'))
const InputCheckBox = defineAsyncComponent(() => import('./InputCheckBox.vue'))
const InputRadio = defineAsyncComponent(() => import('./InputRadio.vue'))
const InputSwitch = defineAsyncComponent(() => import('./InputSwitch.vue'))
const InputDate = defineAsyncComponent(() => import('./InputDate.vue'))
const InputDateRange = defineAsyncComponent(() => import('./InputDateRange.vue'))
const InputSegmented = defineAsyncComponent(() => import('./InputSegmented.vue'))
const InputUpload = defineAsyncComponent(() => import('./InputUpload.vue'))
const InputColorPicker = defineAsyncComponent(() => import('./InputColorPicker.vue'))

export const componentsMap: Partial<FormItemTypeMapping> = {
  [EFormItemType.INPUT]: InputString,
  [EFormItemType.INPUT_NUMBER]: InputNumber,
  [EFormItemType.SELECT]: InputSelect,
  [EFormItemType.TEXTAREA]: InputArea,
  [EFormItemType.CHECKBOX]: InputCheckBox,
  [EFormItemType.RADIO]: InputRadio,
  [EFormItemType.SWITCH]: InputSwitch,
  [EFormItemType.DATE]: InputDate,
  [EFormItemType.DATE_RANGE]: InputDateRange,
  [EFormItemType.INPUT_SEGMENTED]: InputSegmented,
  [EFormItemType.COLOR_PICKER]: InputColorPicker,
  [EFormItemType.UPLOAD]: InputUpload,
  [EFormItemType.SIGN]: undefined,
}
