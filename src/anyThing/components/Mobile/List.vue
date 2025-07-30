<template>
  <van-pull-refresh v-model="innerRefreshing" @refresh="handleRefresh">
    <van-list
      v-model:loading="innerLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <slot :data="sourceData" />
      <van-empty
        v-if="sourceData.length === 0 && !loading"
        image-size="100"
      />
      <van-back-top />
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts" setup>
const props = defineProps<{
  handleRefresh: () => void
  getList: () => void
  sourceData: any
  loading: boolean
  finished: boolean
  refreshing: boolean
}>()

const emits = defineEmits<{
  (e: 'update:loading', data: boolean): void
  (e: 'update:refreshing', data: boolean): void
}>()

const innerLoading = computed({
  get: () => props.loading,
  set: val => emits('update:loading', val),
})

const innerRefreshing = computed({
  get: () => props.refreshing,
  set: val => emits('update:refreshing', val),
})
</script>
