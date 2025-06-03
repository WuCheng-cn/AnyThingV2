<template>
  <div class="w-full h-full">
    <VueDataUi
      component="VueUiXy"
      :dataset="dataset"
      :config="config"
    />
  </div>
</template>

<script lang="ts" setup>
import type { VueUiXyDatasetItem } from 'vue-data-ui'
import { ref } from 'vue'
import { VueDataUi } from 'vue-data-ui'
import { mockConfig, mockDataset } from './mock'
import 'vue-data-ui/style.css'

const dataset = ref<VueUiXyDatasetItem[]>(mockDataset)
const config = ref(mockConfig)
</script>
