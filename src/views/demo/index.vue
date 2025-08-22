<template>
  <div class="max-w-[400px]">
    <AnyFormMobile
      ref="anyFormMobileRef"
      :entity="MobileDemoEntity"
    >
      <template #date="{ data }">
        <AnyInputMobile
          v-model="data.date"
          :entity="MobileDemoEntity"
          show-time
          field="date"
        />
      </template>
    </AnyFormMobile>
    <van-button @click="validateAndSubmit">
      校验后提交
    </van-button>
  </div>
</template>

<script setup lang="ts">
import AnyFormMobile from '@/components/core/Mobile/AnyFormMobile.vue'
import AnyInputMobile from '@/components/core/Mobile/input/Index.vue'
import { MobileDemoEntity } from './MobileDemoEntity'

const anyFormMobileRef = ref()

async function validateAndSubmit() {
  const res = await anyFormMobileRef.value?.getValidatedFormData()
  // console.log('validateAndSubmit', res)
  return res
}
</script>
