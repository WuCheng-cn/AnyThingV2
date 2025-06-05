import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/VueUiThermometer.png'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
] as ClassConstructor<WidgetFormBase>[]

class WidgetChartThermometer extends WidgetBaseEntity<typeof fromConfig> {
  name = '温度计图'
  nodeShape = NodeShape.CHART_THERMOMETER
  width = 400
  height = 300
  image = image
  category = WidgetCategory.Chart
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetChartThermometer(fromConfig)
