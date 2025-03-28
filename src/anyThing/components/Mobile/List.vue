<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <slot :data="list"></slot>
      <van-empty
        v-if="list.length === 0 && !loading"
        image-size="100"
      />
      <van-back-top />
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts" setup>
import type { AxiosResponse } from 'axios'

const props = defineProps<{
  api: (q?: any) => Promise<AxiosResponse<any>>
  query?: Record<string, any>
  totalKey?: string
  sizeKey?: string
}>()

const list = ref([] as any[])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const page = ref(1)
const size = ref(10)

async function onLoad() {
  try {
    const query = {
      page: page.value,
      [props.sizeKey || 'size']: size.value,
      ...props.query,
    }

    const { data } = await props.api(query)

    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }

    list.value = [...list.value, ...data.rows]
    page.value++

    loading.value = false

    if (list.value.length >= data[props.totalKey || 'count']) {
      finished.value = true
    }
  }
  catch (error) {
    finished.value = true
    loading.value = false
    throw error
  }
}

function onRefresh() {
  refreshing.value = true
  finished.value = false
  page.value = 1
  loading.value = true
  onLoad()
}

defineExpose({
  onRefresh,
})
</script>
