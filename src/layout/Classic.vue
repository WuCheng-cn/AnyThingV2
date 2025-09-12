<template>
  <a-layout class="h-full">
    <a-layout-header style="padding-inline: 12px;">
      <!-- header -->
      <ClassicHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-model:collapsed="collapsed"
        class="h-full rounded-md"
        :trigger="null"
        collapsible
      >
        <!-- menu -->
        <Menu />
        <span
          class=" absolute bottom-2 right-2  z-10 p-2 rounded-md cursor-pointer bg-white shadow-md transition-[left,right]"
          :class="{
            'left-1/2 right-auto -translate-x-1/2': collapsed,
          }"
          @click="collapsed = !collapsed"
        >
          <ListCollapse :class="{ 'rotate-180': !collapsed }" />
        </span>
      </a-layout-sider>
      <a-layout class="pl-4">
        <!-- tag -->
        <a-layout-content class=" relative overflow-hidden">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ListCollapse } from 'lucide-vue-next'
import ClassicHeader from './components/ClassicHeader.vue'

const collapsed = ref(false)

provide('collapsed', collapsed)
</script>
