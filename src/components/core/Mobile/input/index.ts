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
const InputUpload = defineAsyncComponent(() => import('./InputUpload.vue'))
const InputSign = defineAsyncComponent(() => import('./InputSign.vue'))

export const componentsMobileMap: Partial<FormItemTypeMapping> = {
  [EFormItemType.INPUT]: InputString,
  [EFormItemType.INPUT_NUMBER]: InputNumber,
  [EFormItemType.SELECT]: InputSelect,
  [EFormItemType.TEXTAREA]: InputArea,
  [EFormItemType.CHECKBOX]: InputCheckBox,
  [EFormItemType.RADIO]: InputRadio,
  [EFormItemType.SWITCH]: InputSwitch,
  [EFormItemType.DATE]: InputDate,
  [EFormItemType.DATE_RANGE]: InputDateRange,
  [EFormItemType.UPLOAD]: InputUpload,
  [EFormItemType.SIGN]: InputSign,
}
