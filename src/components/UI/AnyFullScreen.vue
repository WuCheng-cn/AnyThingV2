<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

defineOptions({ name: 'FullScreen' })

const { isFullscreen, toggle } = useFullscreen()

// 重新检查全屏状态
isFullscreen.value = !!(
  document.fullscreenElement
  // @ts-expect-error 忽略类型检查，因为这些属性在不同浏览器中可能不同
  || document.webkitFullscreenElement
  // @ts-expect-error 忽略类型检查，因为这些属性在不同浏览器中可能不同
  || document.mozFullScreenElement
  // @ts-expect-error 忽略类型检查，因为这些属性在不同浏览器中可能不同
  || document.msFullscreenElement
)
</script>

<template>
  <AnyButton type="ghost" @click="toggle">
    <AnyIcon v-if="isFullscreen" name="Maximize" />
    <AnyIcon v-else name="Minimize" />
  </AnyButton>
</template>
