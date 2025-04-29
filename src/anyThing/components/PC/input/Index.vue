<template>
  <component
    :is="componentsMap[formFieldConfig.formType || EFormItemType.INPUT]"
    v-bind="$attrs"
    v-model="value"
    allow-clear
    :value-format="formFieldConfig.dateFormat"
    :placeholder="placeholder"
    :options="configInstance.getOptions(field)"
    :disabled="disabled"
    @change="(e:any) => emits('change', e)"
  />
</template>

<script lang="ts" setup>
import type { AnyBaseModel } from '../../../model/AnyBaseModel'
import type { ClassConstructor } from '../../../types/ClassConstructor'
import { componentsMap } from '.'
import { EFormItemType } from '../../../enum/EFormItemType'
import { AnyDateTimeHelper } from '../../../helper/AnyDateTimeHelper'

const props = defineProps<{
  /** # 双向数据绑定 */
  modelValue: any
  /** # 配置实体 */
  entity: ClassConstructor<AnyBaseModel>
  /** # 表单项关联字段 */
  field: string
  /** # 占位符 */
  placeholder?: string
  /** # 禁用 */
  disabled?: boolean
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: unknown): void
  (event: 'change', value: string): void
}>()

/** 配置实例 */
const configInstance = computed(() => {
  return new props.entity!()
})

/** 表单字段配置 */
const formFieldConfig = computed(() => {
  return configInstance.value.getFormFieldConfigObj(props.field)[props.field]
})

const value = computed({
  get: () => {
    if ([EFormItemType.DATE, EFormItemType.DATE_RANGE, EFormItemType.DATETIME, EFormItemType.DATETIME_RANGE].includes(formFieldConfig.value?.formType) && !formFieldConfig.value?.dateFormat) {
      console.error(`Field(${props.field}):标记了日期类型${formFieldConfig.value.formType}，但未传入dateFormat`)
    }
    if ([EFormItemType.DATE, EFormItemType.DATETIME].includes(formFieldConfig.value.formType) && formFieldConfig.value.dateFormat) {
      return AnyDateTimeHelper.format(props.modelValue, formFieldConfig.value.dateFormat)
    }
    if ([EFormItemType.DATE_RANGE, EFormItemType.DATETIME_RANGE].includes(formFieldConfig.value.formType) && formFieldConfig.value.dateFormat) {
      const transfromDate = Array.from({ length: 2 })
      if (props.modelValue?.length === 2) {
        transfromDate[0] = AnyDateTimeHelper.format(props.modelValue?.[0], formFieldConfig.value.dateFormat)
        transfromDate[1] = AnyDateTimeHelper.format(props.modelValue?.[1], formFieldConfig.value.dateFormat)
      }
      return transfromDate
    }
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
  },
})

/** 占位符 */
const placeholder = computed(() => {
  if (props.disabled && !props.modelValue) {
    return ''
  }
  const label = configInstance.value.getFormFieldLabel(props.field)
  if (props.placeholder) {
    return props.placeholder
  }
  if (formFieldConfig.value.placeholder) {
    return formFieldConfig.value.placeholder
  }

  switch (formFieldConfig.value.formType) {
    case EFormItemType.INPUT:
    case EFormItemType.INPUT_NUMBER:
    case EFormItemType.TEXTAREA:
      return `请输入${label}`
    case EFormItemType.SELECT:
    case EFormItemType.DATE:
    case EFormItemType.DATETIME:
      return `请选择${label}`
    case EFormItemType.DATE_RANGE:
    case EFormItemType.DATETIME_RANGE:
      return [`${label}开始`, `${label}结束`]
    default:
      return '请输入...'
  }
})
</script>
