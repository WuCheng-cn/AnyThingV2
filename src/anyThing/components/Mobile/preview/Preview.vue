<template>
  <div v-if="type === 'block'">
    <VideoViewer v-if="isVideo" :src="data.url" />
    <div v-else @click="handlePreview">
      <van-image
        v-if="isImage"
        :src="url"
        width="100%"
        height="100%"
        fit="contain"
      />
      <FIleIcon v-else :size="iconSize" />
    </div>
  </div>
  <div v-else class="text-[var(--primary-color)]" @click="handlePreview">
    {{ data.name }}
  </div>
</template>

<script lang="ts" setup>
import type { IPreview } from '../../../interface/IPreview'
import { useCordovaFileSystemHooks } from '@/anyThing/hooks/useCordovaFileSystemHooks'
import { File, FileArchive, Link } from 'lucide-vue-next'
import { showImagePreview } from 'vant'
import { AnyDialogHelper } from '../../../helper/AnyDialogHelper'
import PdfViewer from './PdfViewer.vue'
import VideoViewer from './VideoViewer.vue'

const props = withDefaults(defineProps<{
  data: IPreview
  type?: 'block' | 'link'
  iconSize?: number
}>(), {
  type: 'block',
})

const { getHttpFileUrl } = useCordovaFileSystemHooks()

const fileType = computed(() => {
  if (!props.data.url) {
    console.error(`文件:[${props.data.name}] url is null`)
  }
  return props.data.url.split('.').pop()?.toLowerCase()
})

const url = computedAsync<string>(async () => {
  if (!props.data.url) {
    return props.data.url
  }
  return (await getHttpFileUrl(props.data.url)) as unknown as string
})

// const contentType = computed(() => props.data.contentType || '')
// const isVideo = computed(() => isVideoFile(contentType.value))
// const isImage = computed(() => isImageFile(contentType.value))
const isVideo = ref(false)
const isImage = ref(true)

const isPdfFile = computed(() => !!fileType.value && fileType.value === 'pdf')

const FIleIcon = computed(() => {
  switch (fileType.value) {
    case 'xlsx':
    case 'xls':
    case 'doc':
    case 'docx':
    case 'ppt':
    case 'pptx':
    case 'pdf':
      return h(File)
    case 'zip':
    case 'rar':
    case '7z':
    case 'bz2':
      return h(FileArchive)
    default:
      return h(Link)
  }
})

async function handlePreview() {
  if (isImage.value) {
    showImagePreview([url.value || ''])
  }
  else if (isPdfFile.value) {
    AnyDialogHelper.showModel(PdfViewer, { param: props.data })
  }
  else if (props.data.url) {
    window.open(props.data.url)
  }
}
</script>
