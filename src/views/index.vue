<template>
  <van-button @click="AnyDialogHelper.showModel(Demo)">
    点击
  </van-button>
</template>

<script lang="ts" setup>
import { AnyDialogHelper } from '@/anyThing/helper/AnyDialogHelper'
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
