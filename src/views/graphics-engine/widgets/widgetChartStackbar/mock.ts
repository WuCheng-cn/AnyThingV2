import type { VueUiStackbarConfig, VueUiStackbarDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiStackbarDatasetItem[] = [
  {
    name: 'Serie 1',
    series: [19, 20.07, 30, 40, 50, 60],
  },
  {
    name: 'Serie 2',
    series: [13, 8, 9, 13, 25, 27],
  },
  {
    name: 'Serie 3',
    series: [13, 10, 9, 13, 25, 19],
  },
  {
    name: 'Serie 4',
    series: [25, 23, 9, 13, 25, 31],

  },
]

export const mockConfig: VueUiStackbarConfig = { theme: '', responsive: true, customPalette: [], useCssAnimation: true, orientation: 'vertical', table: { show: false, responsiveBreakpoint: 400, columnNames: { period: 'Period', total: 'Total' }, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 0 } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, csv: true, img: true, table: true, labels: true, fullscreen: true, sort: false, stack: false, animation: false, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', labels: 'Toggle labels', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', height: 500, width: 800, padding: { top: 12, right: 24, bottom: 36, left: 64 }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, legend: { show: true, bold: false, backgroundColor: '#1A1A1A', color: '#CCCCCC', fontSize: 14 }, zoom: { show: true, color: '#CCCCCC', highlightColor: '#4A4A4A', fontSize: 14, useResetSlot: false, startIndex: null, endIndex: null, enableRangeHandles: true, enableSelectionDrag: true }, tooltip: { show: true, color: '#CCCCCC', backgroundColor: '#1A1A1A', fontSize: 14, customFormat: null, borderRadius: 4, borderColor: '#2A2A2A', borderWidth: 1, backgroundOpacity: 30, position: 'center', offsetY: 24, showValue: true, showPercentage: true, roundingValue: 0, roundingPercentage: 0, showTimeLabel: true }, highlighter: { color: '#e1e5e8', opacity: 5 }, bars: { gapRatio: 0.5, distributed: false, showDistributedPercentage: true, borderRadius: 3, strokeWidth: 1, gradient: { show: true, intensity: 20 }, totalValues: { show: true, offsetY: 0, fontSize: 16, bold: false, color: '#CCCCCC' }, dataLabels: { show: true, hideEmptyValues: false, hideEmptyPercentages: false, adaptColorToBackground: true, color: '#1A1A1A', fontSize: 14, bold: false, rounding: 0, prefix: '', suffix: '' } }, grid: { scale: { ticks: 10, scaleMin: null, scaleMax: null }, x: { showAxis: true, showHorizontalLines: true, axisColor: '#3A3A3A', axisThickness: 2, axisName: { show: true, text: 'xAxis', fontSize: 14, color: '#CCCCCC', bold: false, offsetY: 0 }, timeLabels: { show: true, values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'], offsetY: 0, rotation: 0, fontSize: 14, color: '#CCCCCC', bold: false } }, y: { showAxis: true, showVerticalLines: false, axisColor: '#3A3A3A', axisThickness: 2, axisName: { show: true, text: 'yAxis', fontSize: 14, color: '#CCCCCC', bold: false, offsetX: 0 }, axisLabels: { show: true, color: '#CCCCCC', fontSize: 14, bold: false, rounding: 0 } } } } } }
