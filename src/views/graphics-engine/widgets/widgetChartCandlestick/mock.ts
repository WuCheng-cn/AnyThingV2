import type { VueUiCandlestickConfig } from 'vue-data-ui'

export const mockDataset = [
  // period | open | high | low | last | volume
  ['2024-01-01', 56, 120, 40, 110, 1250],
  ['2024-02-01', 110, 150, 80, 98, 2200],
  ['2024-03-01', 98, 155, 75, 103, 3500],
  ['2024-04-01', 103, 115, 102, 102, 999],
  ['2024-05-01', 102, 135, 72, 85, 3216],
  ['2024-06-01', 85, 162, 65, 107, 4315],
  ['2024-07-01', 107, 134, 99, 112, 2561],
  ['2024-08-01', 112, 125, 112, 120, 669],
  ['2024-09-01', 120, 113, 76, 89, 2591],
  ['2024-10-01', 89, 150, 85, 125, 2881],
  ['2024-11-01', 125, 130, 45, 92, 1972],
  ['2024-12-01', 92, 120, 35, 75, 3599],
  ['2024-13-01', 75, 80, 26, 45, 5881],
  ['2024-14-01', 45, 60, 20, 30, 2881],
  ['2024-15-01', 30, 120, 10, 105, 2881],
]
export const mockConfig: VueUiCandlestickConfig = { responsive: true, useCssAnimation: true, style: { backgroundColor: '#1A1A1A', color: '#CCCCCC', fontFamily: 'inherit', height: 316, width: 500, layout: { padding: { top: 36, right: 48, bottom: 36, left: 48 }, selector: { color: '#E1E5E8', opacity: 10 }, grid: { show: true, stroke: '#666666', strokeWidth: 0.5, xAxis: { dataLabels: { show: true, fontSize: 4, color: '#CCCCCC', offsetY: 0, bold: false, rotation: 0 } }, yAxis: { dataLabels: { show: true, fontSize: 12, color: '#CCCCCC', roundingValue: 0, offsetX: 0, bold: false, steps: 10, prefix: '$', suffix: '' } } }, wick: { stroke: '#CCCCCC', strokeWidth: 0.5, extremity: { shape: 'line', size: 'auto', color: '#CCCCCC' } }, candle: { borderRadius: 1, stroke: '#2D353C', strokeWidth: 0.5, colors: { bearish: '#ff6400', bullish: '#42d392' }, gradient: { show: true, underlayer: '#FFFFFF' }, widthRatio: 0.5 } }, zoom: { show: true, color: '#CCCCCC', highlightColor: '#4A4A4A', fontSize: 14, useResetSlot: false, startIndex: null, endIndex: null }, title: { text: 'Title', color: '#fafafa', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, tooltip: { show: true, backgroundColor: '#1A1A1A', color: '#CCCCCC', fontSize: 14, roundingValue: 0, prefix: '$', suffix: '', customFormat: null, borderRadius: 4, borderColor: '#3A3A3A', borderWidth: 1, backgroundOpacity: 30, position: 'center', offsetY: 24 } }, translations: { period: 'Period', open: 'Open', high: 'High', low: 'Low', last: 'Last', volume: 'Volume' }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, img: true, csv: true, table: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, table: { show: false, responsiveBreakpoint: 400, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 2, prefix: '$', suffix: '' } } }
