<template>
  <component
    :is="componentsMobileMap[formFieldConfig.formType || EFormItemType.INPUT]"
    v-bind="$attrs"
    allow-clear
    :name="field"
    :model-value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    :form-field-config="formFieldConfig"
    :selector-config="formFieldConfig.selectorConfig"
    :options="configInstance.getOptions(field)"
    :value-format="formFieldConfig.dateFormat"
    :checked-value="formFieldConfig.checkedValue"
    :unchecked-value="formFieldConfig.unCheckedValue"
    @update:model-value="value = $event"
    @change="(e:any) => emits('change', e)"
  />
</template>

<script lang="ts" setup>
import type { AnyBaseModel } from '../../../model/AnyBaseModel'
import type { ClassConstructor } from '../../../types/ClassConstructor'
import { componentsMobileMap } from '.'
import { EFormItemType } from '../../../enum/EFormItemType'

const props = defineProps<{
  /**
   * # 双向数据绑定
   * @description 父组件通过v-model绑定
   */
  modelValue: any
  /**
   * # 配置实体
   */
  entity: ClassConstructor<AnyBaseModel>
  /**
   * # 表单项关联字段
   */
  field: string
  /**
   * # 占位符
   */
  placeholder?: string
  /**
   * # 禁用
   */
  disabled?: boolean
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: unknown): void
  (event: 'change', value: string): void
}>()

/**
 * 配置实例
 */
const configInstance = ref(new props.entity!())

/**
 * 表单字段配置
 */
const formFieldConfig = computed(() => {
  return configInstance.value.getFormFieldConfigObj(props.field)?.[props.field] || {}
})

const value = computed({
  get: () => {
    if ([EFormItemType.DATE, EFormItemType.DATETIME].includes(formFieldConfig.value.formType) && formFieldConfig.value.dateFormat) {
      const formatData = AnyDateTimeHelper.format(props.modelValue, formFieldConfig.value.dateFormat)
        ?.replace(/[:\-/\s]/g, '-')
        ?.split('-')
        ?.filter(i => i)
      if (formatData?.length) {
        return formatData
      }
      else if (!formatData?.length && formFieldConfig.value.formType === EFormItemType.DATETIME) {
        return ['00', '00']
      }
      return []
    }
    else if ([EFormItemType.DATE_RANGE, EFormItemType.DATETIME_RANGE].includes(formFieldConfig.value.formType) && formFieldConfig.value.dateFormat) {
      if (props.modelValue?.length === 2) {
        const transfromDate = []
        transfromDate[0] = AnyDateTimeHelper.format(props.modelValue?.[0], formFieldConfig.value.dateFormat)
        transfromDate[1] = AnyDateTimeHelper.format(props.modelValue?.[1], formFieldConfig.value.dateFormat)
        return transfromDate
      }
    }
    return props.modelValue
  },
  set: (value: any) => {
    if ([EFormItemType.DATE, EFormItemType.DATETIME].includes(formFieldConfig.value.formType) && formFieldConfig.value.dateFormat) {
      emits('update:modelValue', AnyDateTimeHelper.format(value?.join('-'), formFieldConfig.value.dateFormat))
      return
    }
    else if ([EFormItemType.DATE_RANGE, EFormItemType.DATETIME_RANGE].includes(formFieldConfig.value.formType) && formFieldConfig.value.dateFormat) {
      if (value?.length === 2) {
        const transfromDate = []
        transfromDate[0] = AnyDateTimeHelper.format(value?.[0]?.join('-'), formFieldConfig.value.dateFormat)
        transfromDate[1] = AnyDateTimeHelper.format(value?.[1]?.join('-'), formFieldConfig.value.dateFormat)
        emits('update:modelValue', transfromDate)
        return
      }
    }
    emits('update:modelValue', value)
  },
})

/**
 * 占位符
 */
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
    case EFormItemType.INPUT_SELECTOR:
      return `请选择${label}`
    case EFormItemType.DATE_RANGE:
    case EFormItemType.DATETIME_RANGE:
      return `${label}开始-${label}结束`
    default:
      return '请输入...'
  }
})
</script>
