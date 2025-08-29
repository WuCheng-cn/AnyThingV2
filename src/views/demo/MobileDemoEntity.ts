import { AnyDataBaseEntity, AnyDictionaryHelper, CustomField, EDateFormatType, EFormItemType, FormField, SearchField, TableField } from '@arayui/core'

export const MobileDemoOptionDict = AnyDictionaryHelper.createDictionaryArray([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
])

export class MobileDemoEntity extends AnyDataBaseEntity {
  @FormField({
    formType: EFormItemType.INPUT,
    isOnlySearch: true,
    placeholder: '请输入设备编号/资产编号/设备名称/资产品牌/规格型号',
  })
  @SearchField()
  @CustomField('快捷查询')
  quickQry?: string

  @FormField({
    formType: EFormItemType.INPUT,
    required: true,
  })
  @TableField({
    width: 120,
  })
  @CustomField('字符串')
  string?: string

  @FormField({
    formType: EFormItemType.TEXTAREA,
    required: true,
  })
  @TableField({
    width: 120,
  })
  @CustomField('文本域')
  area?: string

  @FormField({
    formType: EFormItemType.RADIO,
    required: true,
  })
  @TableField({
    width: 120,
  })
  @CustomField('单选', MobileDemoOptionDict)
  radio?: string

  @FormField({
    formType: EFormItemType.CHECKBOX,
    required: true,
  })
  @TableField({
    width: 120,
  })
  @CustomField('多选', MobileDemoOptionDict)
  checkbox?: string[]

  @FormField({
    formType: EFormItemType.SWITCH,
    required: true,
    checkedValue: '1',
    unCheckedValue: '0',
  })
  @TableField({
    width: 120,
  })
  @CustomField('开关', MobileDemoOptionDict)
  switch?: string

  @FormField({
    formType: EFormItemType.SELECT,
    required: true,
  })
  @SearchField()
  @TableField({
    width: 120,
  })
  @CustomField('下拉', MobileDemoOptionDict)
  select = ''

  @FormField({
    formType: EFormItemType.INPUT_NUMBER,
    disabled: true,
  })
  @TableField({
    width: 120,
  })
  @CustomField('数字')
  number?: number

  @FormField({
    formType: EFormItemType.DATE,
    dateFormat: EDateFormatType.YYYY_MM_DD_HH_MM_SS,
    required: true,
  })
  @TableField({
    dateFormat: EDateFormatType.YYYY_MM_DD,
    width: 120,
  })
  @CustomField('日期')
  date?: Date

  @FormField({
    formType: EFormItemType.DATE_RANGE,
    dateFormat: EDateFormatType.YYYY_MM_DD,
  })
  @SearchField({
    isAdvanced: true,
  })
  @CustomField('日期范围')
  dateRange?: Date // 搜索用字段

  @CustomField('设备二维码')
  eqQrKey?: string

  @CustomField('关联设备id')
  eqId?: string

  @TableField({
    isAlways: true,
    width: 160,
    fixed: 'right',
  })
  @CustomField('操作')
  operation?: any
}
