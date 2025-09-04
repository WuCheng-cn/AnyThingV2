<template>
  <a-card class="h-full" :body-style="{ paddingLeft: '0', paddingRight: '0' }">
    <template #title>
      <a-input
        v-model:value="filter"
        placeholder="搜索菜单"
        clearable
      >
        <template #suffix>
          <Search :size="14" />
        </template>
      </a-input>
    </template>
    <a-menu
      v-model:selected-keys="state.selectedKeys"
      mode="inline"
      :open-keys="state.openKeys"
      :items="filteredMenuItems"
      @click="handleClick"
    />
  </a-card>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { useMenuHooks } from '@/hooks/useMenuHooks'

const router = useRouter()

const { filter, filteredMenuItems } = useMenuHooks()

const state = reactive({
  selectedKeys: [] as string[],
  openKeys: [] as string[],
})

function handleClick({ item }: any) {
  router.push(item.path)
}
</script>
