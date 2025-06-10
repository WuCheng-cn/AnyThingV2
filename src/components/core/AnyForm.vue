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
      <a-checkbox-group
        v-model:value="checkedFormKeys"
        class="grid gap-x-6"
        :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }"
      >
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
                class="w-full"
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
import type { IFormProps } from '@/anyThing/interface/IFormProps'
import type { AnyBaseModel } from '@/anyThing/model/AnyBaseModel'
import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { FormProps } from 'ant-design-vue'
import AnyInput from '@/anyThing/components/PC/input/Index.vue'
import { useAnyFormHooks } from '@/anyThing/hooks/useAnyFormHooks'

const props = withDefaults(defineProps<IFormProps & FormProps>(), {
  cols: 2,
  labelCol: () => ({ style: { width: '74px' } }),
})

const emit = defineEmits<{
  (e: 'change', value: InstanceType<ClassConstructor<AnyBaseModel>>): void
}>()

const {
  rules,
  formRef,
  formState,
  formFieldList,
  checkedFormKeys,
  getFieldConfig,
} = useAnyFormHooks(props)

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
}
</style>
