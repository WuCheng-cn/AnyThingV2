/**
 * # 自定义节点枚举
 */
export enum NodeShape {
  /** # 文本组件 */
  TEXT,
  /** # 图片组件 */
  IMAGE,
  /** # XY图表组件 */
  CHART_XY,
  /** # 垂直柱状图组件 */
  CHART_VERTICAL_BAR,
  /** # 某种关系图 */
  CHART_PARALLEL_COORDINATE_POLT,
  /** # 桑基图 */
  CHART_FLOW,
  /** # K线图（烛台图） */
  CHART_CANDLESTICK,
  /** # 堆叠条形图 */
  CHART_STACK_BAR,
  /** # 环形图 */
  CHART_DONUT,
  /** # 分层树形结构图 */
  CHART_TREE,
  /** # 气泡图 */
  CHART_CIRCLE_PACK,
  /** # 轮状百分比图 */
  CHART_WHEEL,
}
