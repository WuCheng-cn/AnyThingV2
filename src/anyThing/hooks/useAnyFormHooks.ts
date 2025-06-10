import type { FormExpose } from 'vant/lib/form/types'
import type { IFormFieldConfig } from '../interface/IFormFieldConfig'
import type { IFormProps } from '../interface/IFormProps'
import type { AnyBaseModel } from '../model/AnyBaseModel'
import type { ClassConstructor } from '../types/ClassConstructor'
import { AnyDataTransformHelper } from '../helper/AnyDataTransformHelper'
import { AnyValidatorHelper } from '../helper/AnyValidatorHelper'

export function useAnyFormHooks(props: IFormProps) {
  const formRef = ref<FormExpose>()

  const formState = ref((props.entity as any).fromJSON(props.initData || {}) as InstanceType<ClassConstructor<AnyBaseModel>>)

  watch(() => props.initData, (newVal) => {
    if (newVal) {
      formState.value = (props.entity as any).fromJSON(newVal) as InstanceType<ClassConstructor<AnyBaseModel>>
    }
  })

  const checkedFormKeys = ref<string[]>([])

  const formFieldList = computed(() => {
    const list = formState.value.getFormFieldList()
    if (!props.fieldList?.length) {
      return AnyDataTransformHelper.sortByArray(list, props.fieldOrder || [])
    }
    const filteredList = list.filter(item => props.fieldList?.includes(item))
    return AnyDataTransformHelper.sortByArray(filteredList, props.fieldOrder || [])
  })

  const formFieldConfigObj = computed(() => {
    return formState.value.getFormFieldConfigObj()
  })

  const rules = computed(() => {
    return AnyValidatorHelper.getValidateRules(formState.value, props.mixinRules, props.isOptional)
  })

  /**
   * 获取字段配置
   * @param field 字段名
   * @param configKey 配置键名
   * @returns 配置值
   */
  function getFieldConfig(field: string, configKey: keyof IFormFieldConfig) {
    return formFieldConfigObj.value?.[field]?.[configKey]
  }

  return {
    rules,
    formRef,
    formState,
    formFieldList,
    checkedFormKeys,
    getFieldConfig,
  }
}
