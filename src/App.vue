<template>
  <VanConfigProvider>
    <div id="layout" class="layout">
      <router-view v-slot="{ Component, route }">
        <section class="text-14">
          <keep-alive :include="[]">
            <component :is="Component" :key="route.name" />
          </keep-alive>
        </section>
      </router-view>
    </div>
  </VanConfigProvider>
</template>

<script setup lang="ts">

import { setDialogDefaultOptions, setToastDefaultOptions } from 'vant';

setToastDefaultOptions({
  teleport: '.layout',
})
setDialogDefaultOptions({
  teleport: '.layout',
})
setToastDefaultOptions('loading', {
  forbidClick: true,
  message: '加载中...',
  duration: 0,
})




</script>

