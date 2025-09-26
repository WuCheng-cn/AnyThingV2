<script setup lang="ts">
import AnyAvatar from './AnyAvatar.vue'

interface Props {
  /** 是否收起文本 */
  collapsed?: boolean
  /** Logo 图片适应方式 */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  /** Logo 跳转地址 */
  href?: string
  /** Logo 图片大小 */
  logoSize?: number
  /** Logo 图标 */
  src?: string
  /** Logo 文本 */
  text: string
  /** Logo 主题  */
  theme?: string
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
  href: 'javascript:void 0',
  logoSize: 32,
  src: '',
  theme: 'light',
  fit: 'cover',
})
</script>

<template>
  <div :class="theme" class="flex h-full items-center text-lg">
    <a
      :class="$attrs.class"
      :href="href"
      class="flex h-full items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-500"
    >
      <AnyAvatar
        v-if="src"
        :alt="text"
        :src="src"
        :size="logoSize"
        :fit="fit"
        class="relative rounded-none bg-transparent"
      />
      <template v-if="!collapsed">
        <slot name="text">
          <span class="text-foreground truncate text-nowrap font-semibold">
            {{ text }}
          </span>
        </slot>
      </template>
    </a>
  </div>
</template>
