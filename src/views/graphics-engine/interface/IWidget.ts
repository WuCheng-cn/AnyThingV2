import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { Component } from 'vue'
import type { NodeShape } from '../config/NodeShapeConfig'
import type { WidgetFormBase } from '../entity/WidgetFormBase'
import { AnyDictionaryHelper } from '@/anyThing/helper/AnyDictionaryHelper'

/**
 * # 组件分类
 * - 基础组件
 * - 容器组件
 * - 表单组件
 * - 图表组件
 * - 装饰组件
 * - 其他组件
 */
export enum WidgetCategory {
  /** # 基础组件 */
  Basic = 'basic',
  /** # 容器组件 */
  Container = 'container',
  /** # 表单组件 */
  Form = 'form',
  /** # 图表组件 */
  Chart = 'chart',
  /** # 装饰组件 */
  Decoration = 'decoration',
  /** # 其他组件 */
  Other = 'other',
}

/** # 组件分类字典 */
export const WidgetCategoryDict = AnyDictionaryHelper.createDictionaryArray([
  { value: WidgetCategory.Basic, label: '基础组件' },
  { value: WidgetCategory.Container, label: '容器组件' },
  { value: WidgetCategory.Form, label: '表单组件' },
  { value: WidgetCategory.Chart, label: '图表组件' },
  { value: WidgetCategory.Decoration, label: '装饰组件' },
  { value: WidgetCategory.Other, label: '其他组件' },
])

/**
 * 画布组件注册接口
 */
export interface IWidget {
  /** # 组件名称 */
  name: string

  /** # 自定义组件注册名称 */
  nodeShape: NodeShape

  /** # 组件初始宽度 */
  width: number

  /** # 组件初始高度 */
  height: number

  /** # 组件缩略图路径 */
  image: string

  /** # 组件分类 */
  category: WidgetCategory

  /** # 是否作为可嵌套父级组件 */
  isParent?: boolean

  /** # 组件渲染内容 */
  component: Component

  /** # 组件表单配置 */
  formConfig?: ClassConstructor<WidgetFormBase>[]

  /** # 组件绑定数据 */
  widgetData?: Record<string, any>
}
