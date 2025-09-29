<script lang="ts" setup>
import { usePreferences } from '@/hooks/usePreferences'
import { useRefreshHooks } from '@/hooks/useRefreshHooks'
import { usePermissionStore } from '@/stores/modules/usePermissionStore'
import { usePreferencesStore } from '@/stores/modules/usePreferencesStore'
// import {
//   GlobalSearch,
//   LanguageToggle,
//   PreferencesButton,
//   ThemeToggle,
// } from '../../widgets'

interface Props {
  /** # Logo 主题 */
  theme?: string
}

withDefaults(defineProps<Props>(), {
  theme: 'light',
})

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>()

const slots = useSlots()

const { preferences } = toRefs(usePreferencesStore())

const REFERENCE_VALUE = 50

const permissionStore = usePermissionStore()

const { globalSearchShortcutKey, preferencesButtonPosition } = usePreferences()

const { refresh } = useRefreshHooks()

const rightSlots = computed(() => {
  const list = [{ index: REFERENCE_VALUE + 100, name: 'user-dropdown' }]
  if (preferences.value?.widget.globalSearch) {
    list.push({
      index: REFERENCE_VALUE,
      name: 'global-search',
    })
  }

  if (preferencesButtonPosition.value.header) {
    list.push({
      index: REFERENCE_VALUE + 10,
      name: 'preferences',
    })
  }
  if (preferences.value?.widget.themeToggle) {
    list.push({
      index: REFERENCE_VALUE + 20,
      name: 'theme-toggle',
    })
  }
  if (preferences.value?.widget.languageToggle) {
    list.push({
      index: REFERENCE_VALUE + 30,
      name: 'language-toggle',
    })
  }
  if (preferences.value?.widget.fullscreen) {
    list.push({
      index: REFERENCE_VALUE + 40,
      name: 'fullscreen',
    })
  }
  if (preferences.value?.widget.notification) {
    list.push({
      index: REFERENCE_VALUE + 50,
      name: 'notification',
    })
  }

  Object.keys(slots).forEach((key) => {
    const name = key.split('-')
    if (key.startsWith('header-right')) {
      list.push({ index: Number(name[2]), name: key })
    }
  })
  return list.sort((a, b) => a.index - b.index)
})

const leftSlots = computed(() => {
  const list: Array<{ index: number, name: string }> = []

  if (preferences.value?.widget.refresh) {
    list.push({
      index: 0,
      name: 'refresh',
    })
  }

  Object.keys(slots).forEach((key) => {
    const name = key.split('-')
    if (key.startsWith('header-left')) {
      list.push({ index: Number(name[2]), name: key })
    }
  })
  return list.sort((a, b) => a.index - b.index)
})

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout')
}
</script>

<template>
  <template
    v-for="slot in leftSlots.filter((item) => item.index < REFERENCE_VALUE)"
    :key="slot.name"
  >
    <slot :name="slot.name">
      <template v-if="slot.name === 'refresh'">
        <AnyButton type="ghost" class="my-0 mr-1 rounded-md" @click="refresh">
          <AnyIcon name="RotateCw" />
        </AnyButton>
      </template>
    </slot>
  </template>
  <div class="flex-center hidden lg:block">
    <slot name="breadcrumb" />
  </div>
  <template
    v-for="slot in leftSlots.filter((item) => item.index > REFERENCE_VALUE)"
    :key="slot.name"
  >
    <slot :name="slot.name" />
  </template>
  <div
    :class="`menu-align-${preferences?.header.menuAlign}`"
    class="flex h-full min-w-0 flex-1 items-center"
  >
    <slot name="menu" />
  </div>
  <div class="flex h-full min-w-0 flex-shrink-0 items-center">
    <template v-for="slot in rightSlots" :key="slot.name">
      <slot :name="slot.name">
        <template v-if="slot.name === 'global-search'">
          <GlobalSearch
            :enable-shortcut-key="globalSearchShortcutKey"
            :menus="permissionStore.accessMenus"
            class="mr-1 sm:mr-4"
          />
        </template>

        <template v-else-if="slot.name === 'preferences'">
          <PreferencesButton
            class="mr-1"
            @clear-preferences-and-logout="clearPreferencesAndLogout"
          />
        </template>
        <template v-else-if="slot.name === 'theme-toggle'">
          <ThemeToggle class="mr-1 mt-[2px]" />
        </template>
        <template v-else-if="slot.name === 'language-toggle'">
          <LanguageToggle class="mr-1" />
        </template>
        <template v-else-if="slot.name === 'fullscreen'">
          <AnyFullScreen class="mr-1" />
        </template>
      </slot>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.menu-align-start {
  --menu-align: start;
}

.menu-align-center {
  --menu-align: center;
}

.menu-align-end {
  --menu-align: end;
}
</style>
