import type { Component } from 'vue'
import type { IDefaultOption } from './IDefaultOption'

/**
 * 画布组件注册接口
 */
export interface IRegistItem {
  /** # 组件名称 */
  name: string

  /** # 组件自定义节点名称 */
  nodeShape: string

  /** # 组件初始宽度 */
  width: number

  /** # 组件初始高度 */
  height: number

  /** # 组件缩略图路径 */
  image: string

  /** # 组件渲染内容 */
  component: Component

  /** # 组件默认配置 */
  defaultOption: IDefaultOption
}
