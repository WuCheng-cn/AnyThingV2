import image from '../../assets/ILIS-Logo.jpg'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'
import { WidgetTextBaseEntity } from './configEntity/WidgetTextBaseEntity'
import { WidgetTextStyleEntity } from './configEntity/WidgetTextStyleEntity'

const { resgistAsyncComponent } = useComponent()

export const widgetTextFromConfig = [
  WidgetTextBaseEntity,
  WidgetTextStyleEntity,
]

class WidgetText extends WidgetBaseEntity<typeof widgetTextFromConfig> {
  name = '文本'
  nodeShape = NodeShape.TEXT
  width = 100
  height = 20
  image = image
  category = WidgetCategory.Basic
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetText(widgetTextFromConfig)
