import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/ILIS-Logo.jpg'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'
import { widgetImageBaseEntity } from './configEntity/widgetImageBaseEntity'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
  widgetImageBaseEntity,
] as ClassConstructor<WidgetFormBase>[]

class WidgetImage extends WidgetBaseEntity<typeof fromConfig> {
  name = '图片'
  nodeShape = NodeShape.IMAGE
  width = 100
  height = 100
  image = image
  category = WidgetCategory.Basic
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetImage(fromConfig)
