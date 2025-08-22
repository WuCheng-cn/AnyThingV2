import { CustomClass, CustomField, EFormItemType, FormField } from '@arayui/core'
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
