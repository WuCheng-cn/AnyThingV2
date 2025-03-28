import { EFormItemType } from '../../../enum/EFormItemType'
import InputArea from './InputArea.vue'
import InputCheckBox from './InputCheckBox.vue'
import InputDate from './InputDate.vue'
import InputDateRange from './InputDateRange.vue'
import InputDateTime from './InputDateTime.vue'
import InputDateTimeRange from './InputDateTimeRange.vue'
import InputNumber from './InputNumber.vue'
import InputRadio from './InputRadio.vue'
import InputSelect from './InputSelect.vue'
import InputString from './InputString.vue'
import InputSwitch from './InputSwitch.vue'
import InputSelector from './InputSelector.vue'

type FormItemTypeMapping = {
  [K in EFormItemType]: any;
}

export const componentsMobileMap: FormItemTypeMapping = {
  [EFormItemType.INPUT]: InputString,
  [EFormItemType.INPUT_NUMBER]: InputNumber,
  [EFormItemType.INPUT_SELECTOR]: InputSelector,
  [EFormItemType.SELECT]: InputSelect,
  [EFormItemType.TEXTAREA]: InputArea,
  [EFormItemType.CHECKBOX]: InputCheckBox,
  [EFormItemType.RADIO]: InputRadio,
  [EFormItemType.SWITCH]: InputSwitch,
  [EFormItemType.DATE]: InputDate,
  [EFormItemType.DATETIME]: InputDateTime,
  [EFormItemType.DATE_RANGE]: InputDateRange,
  [EFormItemType.DATETIME_RANGE]: InputDateTimeRange,
}
