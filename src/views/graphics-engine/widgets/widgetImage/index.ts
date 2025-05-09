import type { IWidget } from '../../interface/IWidget'
import type { IWidgetOption } from '../../interface/IWidgetOption'
import image from '../../assets/amilia.gif'
import { WidgetCategory } from '../../interface/IWidget'

const { resgistAsyncComponent } = useComponent()

class WidgetImage implements IWidget {
  name = '图片'
  nodeShape = 'image'
  width = 100
  height = 100
  image = image
  category = WidgetCategory.Basic
  component = resgistAsyncComponent(() => import('./index.vue'))
  widgetOption?: IWidgetOption
}

export default new WidgetImage()
