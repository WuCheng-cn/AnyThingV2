<template>
  <van-form>
    <template v-for="(field, index) in formFieldList" :key="index">
      <slot :name="field" :data="formState">
        <AnyInputMobile
          :key="field"
          v-model="formState[field]"
          required
          :rules="rules[field]"
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
    </template>
  </van-form>
</template>

<script lang="ts" setup>
import type { IFormProps } from '@/anyThing/interface/IFormProps'
import type { AnyBaseModel } from '@/anyThing/model/AnyBaseModel'
import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import AnyInputMobile from '@/anyThing/components/Mobile/input/Index.vue'
import { useAnyFormHooks } from '@/anyThing/hooks/useAnyFormHooks'

const props = withDefaults(defineProps<IFormProps>(), {
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
  getFieldConfig,
} = useAnyFormHooks(props)
// console.log(rules.value)

function handleChange(e: unknown, field: string) {
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

defineExpose({ getValidatedFormData, getFormData })
</script>
