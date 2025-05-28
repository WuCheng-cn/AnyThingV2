<template>
  <div
    class="w-full h-full bg-blue-500 "
    :style="{
      ...widgetData?.[WidgetTextStyleEntity.name],
      fontSize: `${widgetData?.[WidgetTextStyleEntity.name]?.fontSize}px`,
    }"
  >
    {{ widgetData?.[WidgetTextBaseEntity.name]?.text }}
  </div>
</template>

<script setup lang="ts">
import type { widgetTextFromConfig } from './index'
import { useWidget } from '../../hooks/useWidget'
import { WidgetTextBaseEntity } from './configEntity/WidgetTextBaseEntity'
import { WidgetTextStyleEntity } from './configEntity/WidgetTextStyleEntity'

const { widgetData } = useWidget<typeof widgetTextFromConfig>()
</script>
