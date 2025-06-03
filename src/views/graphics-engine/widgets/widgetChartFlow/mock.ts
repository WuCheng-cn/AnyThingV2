import type { VueUiFlowConfig, VueUiFlowDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiFlowDatasetItem[] = [
  ['A1', 'B1', 10],
  ['A1', 'B2', 10],
  ['B1', 'C1', 5],
  ['B1', 'C2', 5],
  ['B1', 'C3', 5],
  ['B1', 'C4', 5],
  ['A2', 'B1', 10],
  ['B2', 'C5', 10],
  ['C3', 'D1', 2],
  ['C4', 'D1', 2],
  ['C5', 'D1', 2],
  ['C2', 'D2', 2],
  ['C3', 'D2', 1],
]

export const mockConfig: VueUiFlowConfig = { userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { pdf: true, img: true, csv: true, table: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', padding: { top: 0, left: 24, right: 24, bottom: 0 }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, nodes: { gap: 10, minHeight: 20, width: 40, labels: { fontSize: 14, abbreviation: { use: true, length: 3 }, prefix: '', suffix: '', rounding: 0 }, stroke: '#1A1A1A', strokeWidth: 1 }, links: { width: 200, opacity: 0.8, stroke: '#1A1A1A', strokeWidth: 1 } } }, table: { show: false, responsiveBreakpoint: 400, columnNames: { source: 'Source', target: 'Target', value: 'Value' }, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' } } }
