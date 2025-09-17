<template>
  <div class=" relative w-full h-full ">
    <div class=" absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between p-2">
      <div class="flex items-center">
        <img src="@/assets/images/logo.png" alt="" class="w-10 h-10 mr-2">
        <div class="text-[var(--colorPrimary)] text-2xl font-bold">
          ANYTHING
        </div>
      </div>
      <SystemTools />
    </div>
    <div ref="rainyWindowRef" class=" w-full h-full" />
  </div>
</template>

<script lang="ts" setup>
import { RainyWindow } from '@arayui/rainy-day'

const rainyWindowRef = ref<HTMLDivElement>()

const rainyInstanse = ref<RainyWindow>()

onMounted(() => {
  rainyInstanse.value = new RainyWindow(rainyWindowRef.value!)
})
</script>
