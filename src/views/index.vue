<template>
  <a-card>
    <LucideIcon name="House" />
    <a-button @click="AnyDialogHelper.showModel(Demo, { isHideMask: false })">
      点击弹窗
    </a-button>
    <router-link to="/graphics-engine" class="text-blue-600 hover:underline">
      图形引擎
    </router-link>
  </a-card>
</template>

<script lang="ts" setup>
import { AnyDialogHelper } from '@/helper/AnyDialogHelper'
import Demo from '@/views/demo/index.vue'
</script>

<route lang="json">
{
  "name": "home",
  "meta": {
    "title": "首页",
    "icon": "House"
  }
}
</route>
