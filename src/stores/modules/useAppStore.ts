import type { ConfigProviderTheme } from 'vant'
import { defineStore } from 'pinia'

export interface AppStore {
  switchMode: (val: ConfigProviderTheme) => void
}

export interface MousePosition {
  x: number
  y: number
}

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const useAppStore = defineStore('app', () => {
  const theme = prefersDark ? 'dark' : 'light'
  const mode = ref<ConfigProviderTheme>(theme)
  const switchMode = (val: ConfigProviderTheme) => {
    mode.value = val
  }

  const clickedPosition = ref<MousePosition | null>(null)

  const highestIndex = ref(0)

  const setHighestIndex = (dom: HTMLElement) => {
    highestIndex.value += 2
    dom.style.zIndex = highestIndex.value.toString()
  }

  return {
    mode,
    switchMode,
    clickedPosition,
    highestIndex,
    setHighestIndex,
  }
}, {
  persist: true,
})

export default useAppStore
