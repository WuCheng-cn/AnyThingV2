import type { ClassConstructor } from '@/anyThing/types/ClassConstructor'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/VueUiCirclePack.png'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
] as ClassConstructor<WidgetFormBase>[]

class WidgetChartCirclePack extends WidgetBaseEntity<typeof fromConfig> {
  name = '气泡图'
  nodeShape = NodeShape.CHART_CIRCLE_PACK
  width = 400
  height = 300
  image = image
  category = WidgetCategory.Chart
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetChartCirclePack(fromConfig)
