import { CustomClass } from '@/anyThing/decorator/CustomClass'
import { CustomField } from '@/anyThing/decorator/CustomField'
import { FormField } from '@/anyThing/decorator/FormField'
import { EFormItemType } from '@/anyThing/enum/EFormItemType'
import { EWigetFormConfigType } from '@/enum/EWigetFormConfigType'
import { WidgetFormBase } from '../../../entity/WidgetFormBase'

@CustomClass({ name: '基础配置' })
export class widgetImageBaseEntity extends WidgetFormBase {
  type = EWigetFormConfigType.STYLE

  @FormField({
    formType: EFormItemType.UPLOAD,
    // accept: ['image/*'],
    maxCount: 3,
    maxSize: 1,
  })
  @CustomField('图片')
  img = []
}
