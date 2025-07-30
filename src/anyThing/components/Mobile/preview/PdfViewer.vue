<template>
  <van-popup
    v-model:show="show"
    round
    :style="{ width: '90%', height: '90%' }"
    closeable
  >
    <div class="title" />
    <div style="height: calc(100% - 1rem)">
      <iframe
        v-if="param?.url?.endsWith('.pdf')"
        width="100%"
        height="100%"
        :src="param?.url?.endsWith('.pdf') ? `./pdfjs/web/viewer.html?file=${param.url}` : param.url"
        frameborder="0"
      />
      <div v-else class="tips">
        传入的文件不是pdf文件，无法预览！
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import type { IDialogPropsParam } from '../../../interface/IDialogProps'
import type { IPreview } from '../../../interface/IPreview'

defineProps<IDialogPropsParam<IPreview, any>>()

const show = ref(false)

onMounted(() => {
  show.value = true
})
</script>
