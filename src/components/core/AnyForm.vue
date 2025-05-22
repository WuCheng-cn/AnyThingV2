<template>
  <a-form
    v-bind="$attrs"
    ref="formRef"
    :model="formState"
    :rules="rules"
    :disabled="props.disabled"
    :label-col="labelCol"
    label-wrap
    @submit="props.onSubmit"
    @finish="props.onFinish"
  >
    <div>
      <a-checkbox-group v-model:value="checkedFormKeys" class="grid gap-x-3" :class="[`grid-cols-${cols}`]">
        <slot name="form-before" :data="formState" />
        <div
          v-for="field in formFieldList"
          :key="field"
          class="flex items-center gap-3"
        >
          <a-checkbox v-if="showCheckbox" class="mb-[24px]" :value="field" />
          <a-form-item :name="field" class="flex-1">
            <template #label>
              <span class="max-w-[calc(100%-20px)] inline-block">
                {{ formState.getFormFieldLabel(field) }}
              </span>
            </template>
            <slot :name="field" :data="formState">
              <AnyInput
                v-model="formState[field]"
                class="w-full min-w-[200px]"
                :entity="entity"
                :field="field"
                :form-data="formState"
                :selector-config="getFieldConfig(field, 'selectorConfig')"
                :disabled="props.disabled || getFieldConfig(field, 'disabled')"
                :options="formState.getOptions(field)"
                :checked-value="getFieldConfig(field, 'checkedValue')"
                :un-checked-value="getFieldConfig(field, 'unCheckedValue')"
                @change="handleChange($event, field)"
              />
            </slot>
          </a-form-item>
        </div>
        <slot name="form-after" :data="formState" />
      </a-checkbox-group>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import type { IFormFieldConfig } from '@/anyThing/interface/IFormFieldConfig'
import type { AnyBaseModel } from '@/anyThing/model/AnyBaseModel'
import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { FormProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormExpose } from 'ant-design-vue/es/form/Form'
import AnyInput from '@/anyThing/components/PC/input/Index.vue'
import { AnyDataTransformHelper } from '@/anyThing/helper/AnyDataTransformHelper'
import { AnyValidatorHelper } from '@/anyThing/helper/AnyValidatorHelper'

const props = withDefaults(defineProps<{
  /** # 配置实体 */
  entity: ClassConstructor<AnyBaseModel>

  /**  # 列数 */
  cols?: number

  /** # 初始数据  */
  initData?: InstanceType<ClassConstructor<AnyBaseModel>>

  /** # 要展示的字段列表 */
  fieldList?: string[]

  /** # 字段排序参考 */
  fieldOrder?: string[]

  /** 额外的验证规则（会与实体的配置合并） */
  mixinRules?: Record<string, Rule[]>

  /** # 表单label布局 */
  labelCol?: object

  /** # 是否显示复选框(开启后可手动获取一组选中字段) */
  showCheckbox?: boolean

  /** # 是否可选(开启后，无效化表单项的必填验证) */
  isOptional?: boolean
} & FormProps>(), {
  cols: 2,
  labelCol: () => ({ style: { width: '74px' } }),
})

const emit = defineEmits<{
  (e: 'change', value: InstanceType<ClassConstructor<AnyBaseModel>>): void
}>()

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

function handleChange(e: unknown, field: string) {
  if (e) {
    checkedFormKeys.value = Array.from(new Set([...checkedFormKeys.value, field]))
  }

  nextTick(() => {
    formRef.value?.validate([field])
      .catch((err) => {
        console.warn(`字段 ${field} 验证失败:`, err)
      })
  })

  emit('change', formState.value)

  return e
}

async function getValidatedFormData(): Promise<AnyBaseModel> {
  try {
    await formRef.value?.validate()
    return formState.value
  }
  catch (error) {
    console.error('表单验证失败:', error)
    return Promise.reject(error)
  }
}

function getFormData() {
  return formState.value
}

defineExpose({ getValidatedFormData, checkedFormKeys, getFormData })
</script>

<style scoped>
:deep(.ant-form-item .ant-form-item-label > label) {
  width: 100%;
  justify-content: flex-end;
}
</style>
