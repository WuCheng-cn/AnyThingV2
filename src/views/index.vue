<template>
  <a-card>
    <a-button @click="AnyDialogHelper.showModel(Demo)">
      点击弹窗
    </a-button>
    <router-link to="/graphics-engine" class="text-blue-600 hover:underline">
      图形引擎
    </router-link>
  </a-card>
</template>

<script lang="ts" setup>
import Demo from '@/views/demo/index.vue'
</script>

<route lang="json">
  {
    "name": "home",
    "meta": {
      "title": "首页"
    }
  }
</route>
