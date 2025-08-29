<template>
  <div class="max-w-[400px]">
    <!-- @vue-generic {import('./MobileDemoEntity').MobileDemoEntity} -->
    <AnyFormMobile
      ref="anyFormMobileRef"
      :entity="MobileDemoEntity"
    >
      <template #date="{ data }">
        <!-- @vue-generic {import('./MobileDemoEntity').MobileDemoEntity} -->
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
import type { ComponentExposed } from 'vue-component-type-helpers'
import AnyFormMobile from '@/components/core/Mobile/AnyFormMobile.vue'
import AnyInputMobile from '@/components/core/Mobile/input/Index.vue'
import { MobileDemoEntity } from './MobileDemoEntity'

const anyFormMobileRef = ref<ComponentExposed<typeof AnyFormMobile<MobileDemoEntity>>>()

async function validateAndSubmit() {
  const res = await anyFormMobileRef.value?.getValidatedFormData()
  // console.log('validateAndSubmit', res)
  return res
}
</script>
