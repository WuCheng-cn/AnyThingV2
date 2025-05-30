<template>
  <a-row align="middle" :gutter="5">
    <a-col flex="1 1 200px">
      <div class="flex items-center gap-1">
        <Minus :size="16" :stroke-width="3" />
        <a-slider
          v-model:value="scale"
          :min="minScale"
          :max="maxScale"
          :marks="marks"
          :disabled="!lockScale"
          class="flex-1"
        />
        <Plus :size="16" :stroke-width="3" />
      </div>
    </a-col>

    <a-col flex="0 1 100px">
      <a-input-number
        v-model:value="scale"
        :min="minScale"
        :max="maxScale"
        :step="1"
        :disabled="!lockScale"
      >
        <template #addonAfter>
          <Percent :size="16" :stroke-width="3" />
        </template>
      </a-input-number>
    </a-col>
    <a-col flex="0 1 32px">
      <a-popover trigger="hover">
        <template #content>
          {{ lockScale ? '已解锁' : '已锁定' }}
        </template>
        <a-button
          :icon="h(lockScale ? LockOpen : Lock, { size: 16, strokewidth: 3 })"
          @click="lockScale = !lockScale"
        />
      </a-popover>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { Lock, LockOpen, Minus, Percent, Plus } from 'lucide-vue-next'
import { h } from 'vue'
import { useGraphicsController } from '../../../hooks/useGraphicsController'

const minScale = 50

const maxScale = 300

const { scale, lockScale } = useGraphicsController()

const marks = {
  100: '100%',
  200: '200%',
  300: '300%',
}
</script>

<style scoped>
:deep(.ant-slider-with-marks) {
  margin-bottom: 11px;
}
</style>
