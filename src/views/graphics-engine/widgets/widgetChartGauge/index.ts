import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/VueUiGauge.png'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
] as ClassConstructor<WidgetFormBase>[]

class WidgetChartGauge extends WidgetBaseEntity<typeof fromConfig> {
  name = '仪表盘图'
  nodeShape = NodeShape.CHART_GAUGE
  width = 400
  height = 300
  image = image
  category = WidgetCategory.Chart
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetChartGauge(fromConfig)
