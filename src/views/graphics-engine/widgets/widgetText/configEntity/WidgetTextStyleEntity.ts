import { CustomClass } from '@/anyThing/decorator/CustomClass'
import { CustomField } from '@/anyThing/decorator/CustomField'
import { FormField } from '@/anyThing/decorator/FormField'
import { EFormItemType } from '@/anyThing/enum/EFormItemType'
import { AnyDictionaryHelper } from '@/anyThing/helper/AnyDictionaryHelper'
import { EWigetFormConfigType } from '@/enum/EWigetFormConfigType'
import { WidgetFormBase } from '../../../entity/WidgetFormBase'

export enum EFontWeight {
  NORMAL = 400,
  BOLD = 700,
}

export const EFontWeightDict = AnyDictionaryHelper.createDictionaryArray([
  { value: EFontWeight.NORMAL, label: '正常' },
  { value: EFontWeight.BOLD, label: '粗体' },
])

export enum EFontFamily {
  DEFAULT = 'Arial',
  SIMPLIFIED_CHINESE = 'SimSun',
  MICROSOFT_YAHEI = 'Microsoft YaHei',
  MICROSOFT_YAHEI_UI = 'Microsoft YaHei UI',
  MICROSOFT_YAHEI_GOTHIC = 'Microsoft YaHei Gothic',
  MICROSOFT_YAHEI_UI_GOTHIC = 'Microsoft YaHei UI Gothic',
}

export const EFontFamilyDict = AnyDictionaryHelper.createDictionaryArray([
  { value: EFontFamily.DEFAULT, label: '默认' },
  { value: EFontFamily.SIMPLIFIED_CHINESE, label: '宋体' },
  { value: EFontFamily.MICROSOFT_YAHEI, label: '微软雅黑' },
  { value: EFontFamily.MICROSOFT_YAHEI_UI, label: '微软雅黑 UI' },
  { value: EFontFamily.MICROSOFT_YAHEI_GOTHIC, label: '微软雅黑 Gothic' },
  { value: EFontFamily.MICROSOFT_YAHEI_UI_GOTHIC, label: '微软雅黑 UI Gothic' },
])

export enum ETextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export const ETextAlignDict = AnyDictionaryHelper.createDictionaryArray([
  { value: ETextAlign.LEFT, label: '左对齐' },
  { value: ETextAlign.CENTER, label: '居中对齐' },
  { value: ETextAlign.RIGHT, label: '右对齐' },
])

/**
 * # 文本元件的样式配置entity
 */
@CustomClass({ name: '样式' })
export class WidgetTextStyleEntity extends WidgetFormBase {
  type = EWigetFormConfigType.STYLE

  @FormField({ formType: EFormItemType.INPUT_NUMBER })
  @CustomField('字体大小')
  fontSize = 16

  @FormField({ formType: EFormItemType.COLOR_PICKER })
  @CustomField('字体颜色')
  color = '#000'

  @FormField({ formType: EFormItemType.INPUT_SEGMENTED })
  @CustomField('字体粗细', EFontWeightDict)
  fontWeight = EFontWeight.NORMAL

  @FormField({ formType: EFormItemType.SELECT })
  @CustomField('字体样式', EFontFamilyDict)
  fontFamily = EFontFamily.DEFAULT

  @FormField({ formType: EFormItemType.INPUT_SEGMENTED })
  @CustomField('对齐方式', ETextAlignDict)
  textAlign = ETextAlign.LEFT
}
