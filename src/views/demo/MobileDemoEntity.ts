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
  @SearchField({ width: '360px' })
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

  @FormField({
    formType: EFormItemType.TIME,
    dateFormat: EDateFormatType.HH_MM,
    required: true,
  })
  @TableField({
    dateFormat: EDateFormatType.HH_MM,
    width: 120,
  })
  @CustomField('时间')
  time?: Date

  @FormField({
    formType: EFormItemType.TIME_RANGE,
    dateFormat: EDateFormatType.HH_MM,
    required: true,
  })
  @TableField({
    dateFormat: EDateFormatType.HH_MM,
    width: 120,
  })
  @CustomField('时间范围')
  timeRange?: Date

  // @FormField({
  //   formType: EFormItemType.INPUT_SELECTOR,
  //   selectorConfig: {
  //     selectorView: OrgSelector,
  //     onSelect: (val: IDepartmentEntity[], formData) => {
  //       formData.departId = val[0]?.id
  //       formData.departName = val[0]?.text
  //     },
  //   },
  // })
  // @TableField({
  //   width: 120,
  // })
  // @CustomField('所属部门')
  // departName?: string

  // @FormField({
  //   formType: EFormItemType.INPUT_SELECTOR,
  //   selectorConfig: {
  //     selectorView: OrgSelector,
  //     onSelect: (val: IDepartmentEntity[], formData) => {
  //       formData.serveLocationId = val[0]?.id
  //       formData.serveLocation = val[0]?.text
  //     },
  //   },
  // })
  // @TableField({
  //   width: 120,
  // })
  // @CustomField('使用地点')
  // serveLocation?: string

  // @FormField({
  //   formType: EFormItemType.INPUT_SELECTOR,
  //   selectorConfig: {
  //     selectorView: PersonSelector,
  //     multiple: true,
  //     onSelect: (val: IUserSelectVoEntity[], formData) => {
  //       formData.userId = val?.map(i => i.id)?.join(',')
  //       formData.userName = val?.map(i => i.name)?.join(',')
  //     },
  //   },
  // })
  // @SearchField({
  //   isAdvanced: true,
  //   selectorConfigMixin: {
  //     multiple: false,
  //   },
  // })
  // @TableField({
  //   width: 120,
  // })
  // @CustomField('使用人')
  // userName?: string

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
