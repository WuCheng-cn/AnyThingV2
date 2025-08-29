<template>
  <van-form
    ref="formRef"
    v-bind="$attrs"
  >
    <van-cell-group :inset="isCard">
      <template v-for="(field, _index) in formFieldList" :key="_index">
        <slot
          :name="field"
          :data="formState"
          :props="getInputProps(field)"
        >
          <AnyInputMobile
            v-bind="getInputProps(field)"
            v-model="formState[field]"
            @change="handleChange($event, field)"
          />
        </slot>
      </template>
    </van-cell-group>
  </van-form>
</template>

<script lang="ts" setup generic="T extends AnyBaseModel">
import type { AnyBaseModel, ClassFieldNames, IFormProps } from '@arayui/core'
import { nextTick } from 'vue'
import AnyInputMobile from '@/components/core/Mobile/input/Index.vue'
import { useAnyFormHooks } from '@/hooks/useAnyFormHooks'

const props = withDefaults(defineProps<IFormProps<T> & {
  /** # 是否卡片模式 */
  isCard?: boolean
  /** # 表单label显示方式 */
  labelAlign?: 'top' | 'left' | 'right' | 'center'
  /** # 是否隐藏表单label */
  hideLabel?: boolean
}>(), {
  cols: 2,
  labelLayout: 'left',
  isCard: true,
})

const emit = defineEmits<{
  (e: 'change', value: T): void
}>()

const {
  formRef,
  formState,
  formFieldList,
  getInputProps,
} = useAnyFormHooks(props)

/**
 * 处理字段变化事件
 * @param _e 事件对象
 * @param field 字段名
 */
function handleChange(_e: unknown, field: ClassFieldNames<T>) {
  nextTick(() => {
    formRef.value?.validate([String(field)])
      .catch((err: any) => {
        console.warn(`字段 ${String(field)} 验证失败:`, err)
      })
  })
  emit('change', formState.value)
}

/**
 * 获取验证后的表单数据
 * @returns 验证后的表单数据
 */
async function getValidatedFormData(): Promise<T | undefined> {
  await formRef.value?.validate()
  return formState.value
}

/**
 * 直接获取表单当前数据
 * @returns 表单数据
 */
async function getFormData(): Promise<T> {
  return new Promise((resolve, _reject) => {
    nextTick(() => {
      resolve(formState.value)
    })
  })
}

defineExpose({ getValidatedFormData, getFormData })
</script>
