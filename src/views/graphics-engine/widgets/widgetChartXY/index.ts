import type { ClassConstructor } from '@arayui/core'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/chart_xy.png'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
] as ClassConstructor<WidgetFormBase>[]

class WidgetChartXY extends WidgetBaseEntity<typeof fromConfig> {
  name = 'XY图表'
  nodeShape = NodeShape.CHART_XY
  width = 400
  height = 300
  image = image
  category = WidgetCategory.Chart
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetChartXY(fromConfig)
