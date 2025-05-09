import type { ObjectDirective } from 'vue'
import { usePermissionStore } from '@/stores/modules/usePermissionStore'

/**
 * # 权限指令
 */
export default {
  mounted(el: HTMLElement, binding) {
    const { value } = binding
    const { hasPermission } = usePermissionStore()
    if (!hasPermission(value)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  },
} as ObjectDirective
