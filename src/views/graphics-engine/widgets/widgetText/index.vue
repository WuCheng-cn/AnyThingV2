<template>
  <div>
    {{ widgetData?.text }}
  </div>
</template>

<script setup lang="ts">
import { useWidget } from '../../hooks/useWidget'

const { widgetData } = useWidget<{ text: string }>()
</script>
