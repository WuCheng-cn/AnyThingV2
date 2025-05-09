/**
 * # 表单类型枚举
 */
export enum EFormType {
  /**
   * # 文本
   * @description 文本框
   * @description 用于输入文本
   * @description 该类型的字段将会被渲染为文本框
   */
  TEXT = 'text',
  /**
   * # 文本域
   * @description 文本域
   * @description 用于输入大段文本
   * @description 该类型的字段将会被渲染为文本域
   */
  TEXTAREA = 'textarea',
  /**
   * # 富文本
   * @description 富文本框
   * @description 用于输入富文本
   * @description 该类型的字段将会被渲染为富文本框
   */
  RICHTEXT = 'richText',
  /**
   * # 日期
   * @description 日期框
   * @description 用于输入日期
   * @description 该类型的字段将会被渲染为日期框
   */
  DATE = 'date',
  /**
   * # 单选
   * @description 单选框
   * @description 用于选择一项
   * @description 该类型的字段将会被渲染为单选框
   */
  RADIO = 'radio',
  /**
   * # 多选
   * @description 多选框
   * @description 用于选择多项
   * @description 该类型的字段将会被渲染为多选框
   */
  CHECKBOX = 'checkbox',
  /**
   * # 下拉
   * @description 下拉框
   * @description 用于选择一项
   * @description 该类型的字段将会被渲染为下拉框
   */
  SELECT = 'select',
  /**
   * # 开关
   * @description 开关
   * @description 用于表示开关状态
   * @description 该类型的字段将会被渲染为开关
   */
  SWITCH = 'switch',
  /**
   * # 滑块
   * @description 滑块
   * @description 用于表示滑块状态
   * @description 该类型的字段将会被渲染为滑块
   */
  SLIDER = 'slider',
  /**
   * # 图片
   * @description 图片
   * @description 用于上传图片
   * @description 该类型的字段将会被渲染为图片
   */
  IMAGE = 'image',
  /**
   * # 文件
   * @description 文件
   * @description 用于上传文件
   * @description 该类型的字段将会被渲染为文件
   */
  FILE = 'file',
  /**
   * # 颜色
   * @description 颜色
   * @description 用于选择颜色
   * @description 该类型的字段将会被渲染为颜色选择器
   */
  COLOR = 'color',
}
