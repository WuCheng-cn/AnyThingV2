import type { ObjectDirective } from 'vue'
/**
 * # 尺寸变化时触发的指令
 * @description 防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
 */
export default {
  mounted(el: HTMLElement & { _resizer?: ResizeObserver }, binding) {
    function debounce<T extends (...args: any[]) => void>(
      fn: T,
      delay = 16,
    ): (...args: Parameters<T>) => void {
      let t: ReturnType<typeof setTimeout> | null = null
      return (...args: Parameters<T>): void => {
        if (t) {
          clearTimeout(t)
        }
        t = setTimeout(() => {
          fn(...args)
        }, delay)
      }
    }

    // 使用泛型创建带有正确类型的debounce函数
    const debouncedCallback = debounce(binding.value, Number(binding.arg) || 16)

    // 确保ResizeObserver存在
    if (window.ResizeObserver) {
      el._resizer = new ResizeObserver(debouncedCallback)
      el._resizer.observe(el)
    }
  },

  unmounted(el: HTMLElement & { _resizer?: ResizeObserver }) {
    if (el._resizer) {
      el._resizer.disconnect()
    }
  },
} as ObjectDirective
