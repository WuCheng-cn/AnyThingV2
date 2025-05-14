import type { IWidget } from '../../interface/IWidget'
import image from '../../assets/amilia.gif'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

class WidgetText implements IWidget {
  name = '文本'
  nodeShape = NodeShape.TEXT
  width = 100
  height = 20
  image = image
  category = WidgetCategory.Basic
  component = resgistAsyncComponent(() => import('./index.vue'))
  widgetData = {}
}

export default new WidgetText()
