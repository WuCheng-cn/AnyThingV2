import type { ClassConstructor } from '@arayui/core'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import image from '../../assets/VueUiCarouselTable.png'
import { NodeShape } from '../../config/NodeShapeConfig'
import { WidgetBaseEntity } from '../../entity/WidgetBase'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

const fromConfig = [
] as ClassConstructor<WidgetFormBase>[]

class WidgetTableCarouselTable extends WidgetBaseEntity<typeof fromConfig> {
  name = '轮播表'
  nodeShape = NodeShape.CHART_CAROUSEL_TABLE
  width = 400
  height = 300
  image = image
  category = WidgetCategory.Form
  component = resgistAsyncComponent(() => import('./index.vue'))
}

export default new WidgetTableCarouselTable(fromConfig)
