<script lang="ts" setup>
import { h } from 'vue'
import LucideIcon from './UI/AnyIcon.vue'
</script>

<template>
  <div>
    <a-button :icon="h(LucideIcon, { name: 'MonitorCog' })" />
  </div>
</template>
