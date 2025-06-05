import type { VueUiCirclePackConfig, VueUiCirclePackDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiCirclePackDatasetItem[] = [
  {
    name: 'Datapoint A',
    value: 200,
  },
  {
    name: 'Datapoint B',
    value: 150,
  },
  {
    name: 'Datapoint C',
    value: 100,
  },
]
export const mockConfig: VueUiCirclePackConfig = { theme: '', customPalette: [], userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: false, pdf: true, csv: true, img: true, table: true, labels: false, fullscreen: true, sort: false, stack: false, animation: false, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, table: { show: false, responsiveBreakpoint: 400, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, columnNames: { datapoint: 'Datapoint', value: 'Value' } }, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', title: { text: 'Title', color: '#CCCCCC', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, circles: { stroke: '#3A3A3A', strokeWidth: 1, gradient: { show: true, intensity: 40 }, labels: { name: { fontSizeRatio: 0.8, show: true, bold: false, offsetY: 0, color: 'auto' }, value: { fontSizeRatio: 1, show: true, color: 'auto', rounding: 0, prefix: '', suffix: '', formatter: null, bold: false, offsetY: 0 } }, zoom: { show: true, shadowForce: 1, opacity: 0.8, animationFrameMs: 200, zoomRatio: 1, label: { name: { fontSize: 14, bold: false, offsetY: 0, color: 'auto' }, value: { fontSize: 14, bold: false, offsetY: 0, rounding: 0, prefix: '', suffix: '', formatter: null, color: 'auto' } } } } } } }
