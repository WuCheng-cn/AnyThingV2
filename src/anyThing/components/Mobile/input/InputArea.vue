<template>
  <van-field
    v-model.trim="value"
    v-bind="$attrs"
    rows="3"
    autosize
    type="textarea"
    show-word-limit
    @update:model-value="onChange"
  >
    <template #right-icon>
      <Transition
        enter-active-class="animate-in fade-in zoom-in"
        leave-active-class="animate-out fade-out zoom-out"
        @click="value = undefined"
      >
        <CircleX
          v-show="value"
          :size="16"
        />
      </Transition>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string | undefined
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | undefined): void
  (event: 'change', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emits('update:modelValue', newValue)
  },
})

function onChange(e: string) {
  emits('change', e)
}
</script>
