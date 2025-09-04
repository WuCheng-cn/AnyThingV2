<template>
  <a-config-provider
    class="h-full"
    component-size="middle"
    :locale="zhCN"
    :theme="{
      token: {
        colorPrimary: '#6e3ee6',
        colorPrimaryHover: '#9468f2',
        borderRadius: 4,
        size: 12,
        fontSize: 12,
      },
      algorithm: [theme.compactAlgorithm],
    }"
  >
    <section class="h-full w-full" :style="{ ...tokenMap }">
      <slot />
    </section>
  </a-config-provider>
</template>

<script setup lang='ts'>
import { theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const { token } = theme.useToken()

const tokenMap = computed(() => {
  return Object.fromEntries(
    Object.entries(token.value)?.map(([key, value]) => {
      return [`--${key}`, value]
    }),
  )
})
</script>
