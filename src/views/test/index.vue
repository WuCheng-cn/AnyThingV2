<template>
  <div>
    <h1>测试页面</h1>
    <p>这是一个独立的测试页面，不应该被嵌套在首页下</p>
  </div>
</template>

<script lang="ts" setup>
</script>

<route lang="json">
  {
    "name": "test",
    "meta": {
      "title": "测试页面",
      "icon": "bug"
    }
  }
</route>
