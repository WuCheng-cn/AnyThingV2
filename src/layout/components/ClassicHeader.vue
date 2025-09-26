<script lang="ts" setup>
// import type { RainyWindow } from '@arayui/rainy-day'

import Logo from '@/assets/images/logo.png'

const rainyWindowRef = ref<HTMLDivElement>()

// const rainyInstanse = ref<RainyWindow>()

onMounted(() => {
  // rainyInstanse.value = new RainyWindow(rainyWindowRef.value!)
})
</script>

<template>
  <div class=" relative w-full h-full ">
    <div class=" absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between p-2">
      <div class="flex items-center">
        <AnyLogo :src="Logo" text="ANYTHING" />
      </div>
      <SystemTools />
    </div>
    <div ref="rainyWindowRef" class=" w-full h-full" />
  </div>
</template>
