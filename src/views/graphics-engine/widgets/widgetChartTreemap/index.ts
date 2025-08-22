import type { ClassConstructor } from '@arayui/core'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/VueUiTreemap.png'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
] as ClassConstructor<WidgetFormBase>[]

class WidgetChartTree extends WidgetBaseEntity<typeof fromConfig> {
  name = '分层树形结构图'
  nodeShape = NodeShape.CHART_TREE
  width = 400
  height = 300
  image = image
  category = WidgetCategory.Chart
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetChartTree(fromConfig)
