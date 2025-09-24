/** # antd的表格自定义行事件接口定义 ⚙️ */
export interface ICustomRow {
  onClick?: (e: Event) => void
  onDblclick?: (e: Event) => void
  onContextmenu?: (e: Event) => void
  onMouseenter?: (e: Event) => void
  onMouseleave?: (e: Event) => void
  [key: string]: any
}
