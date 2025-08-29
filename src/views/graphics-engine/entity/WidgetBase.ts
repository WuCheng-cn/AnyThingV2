import type { ClassConstructorWithBaseModel } from '@arayui/core'
import type { NodeShape } from '../config/NodeShapeConfig'
import type { IWidget, WidgetCategory } from '../interface/IWidget'
import type { WidgetFormBase } from './WidgetFormBase'

/**
 * # 画布组件基类
 */
export abstract class WidgetBaseEntity<T extends ClassConstructorWithBaseModel<WidgetFormBase>[]> implements IWidget<T> {
  name!: string
  nodeShape!: NodeShape
  width!: number
  height!: number
  image!: string
  category!: WidgetCategory
  isParent?: boolean
  component!: Component
  formConfig?: T
  widgetData!: Record<string, InstanceType<T[number]>>

  constructor(fromConfig: T) {
    this.formConfig = fromConfig
    this.widgetData = Object.fromEntries(fromConfig.map(Entity => [Entity.name, new Entity().toJSON()])) as Record<string, InstanceType<T[number]>>
  }

  getWidgetDataByClass(classConstructor: T[number]): InstanceType<T[number]> {
    return this.widgetData[classConstructor.name]
  }
}
