import type { Component } from 'vue'

/** # 操作实现接口 */
export interface IAction {
  label: string
  icon?: Component
  type?: 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text'
  plain?: boolean
  onClick: (val: any) => void
}
