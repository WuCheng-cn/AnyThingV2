import { CustomClass } from '@/anyThing/decorator/CustomClass'
import { CustomField } from '@/anyThing/decorator/CustomField'
import { FormField } from '@/anyThing/decorator/FormField'
import { EFormItemType } from '@/anyThing/enum/EFormItemType'
import { EWigetFormConfigType } from '@/enum/EWigetFormConfigType'
import { WidgetFormBase } from '../../../entity/WidgetFormBase'

@CustomClass({ name: '基础配置' })
export class WidgetTextBaseEntity extends WidgetFormBase {
  type = EWigetFormConfigType.STYLE

  @FormField({ formType: EFormItemType.TEXTAREA })
  @CustomField('文本内容')
  text = ''
}
