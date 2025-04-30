<template>
  <AppProvider>
    <div id="layout" class="layout">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="[]">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </router-view>
    </div>
  </AppProvider>
</template>

<script setup lang="ts">
import { setDialogDefaultOptions, setToastDefaultOptions } from 'vant'
import { useClickPosition } from 'vooks'
import useAppStore from './stores/modules/useAppStore'

const { clickedPosition } = toRefs(useAppStore())

const clickedPositionData = useClickPosition()

watchEffect(() => {
  clickedPosition.value = clickedPositionData.value
})

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
