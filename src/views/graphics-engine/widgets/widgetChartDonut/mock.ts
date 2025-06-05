import type { VueUiDonutConfig, VueUiDonutDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiDonutDatasetItem[] = [
  {
    name: 'Serie 1',
    values: [100],
  },
  {
    name: 'Serie 2',
    values: [200],
  },
  {
    name: 'Serie 3',
    values: [300, 1],
  },
]

export const mockConfig: VueUiDonutConfig = { type: 'classic', responsive: true, useBlurOnHover: true, useCssAnimation: true, style: { fontFamily: 'inherit', chart: { useGradient: true, gradientIntensity: 40, backgroundColor: '#1A1A1A', color: '#CCCCCC', padding: { top: 0, right: 0, bottom: 0, left: 0 }, layout: { curvedMarkers: true, labels: { dataLabels: { show: true, useLabelSlots: false, hideUnderValue: 3, prefix: '', suffix: '' }, value: { rounding: 0, show: true }, percentage: { color: '#CCCCCC', bold: true, fontSize: 18, rounding: 0 }, name: { color: '#CCCCCC', bold: false, fontSize: 14 }, hollow: { show: true, total: { show: true, bold: false, fontSize: 18, color: '#CCCCCC', text: 'Total', offsetY: -16, value: { color: '#CCCCCC', fontSize: 18, bold: true, suffix: '', prefix: '', offsetY: -12, rounding: 0 } }, average: { show: true, bold: false, fontSize: 18, color: '#CCCCCC', text: 'Average', offsetY: 0, value: { color: '#CCCCCC', fontSize: 18, bold: true, suffix: '', prefix: '', offsetY: 6, rounding: 0 } } } }, donut: { strokeWidth: 64, borderWidth: 2, useShadow: false, shadowColor: '#1A1A1A' } }, comments: { show: true, showInTooltip: true, width: 100, offsetX: 0, offsetY: 0 }, legend: { backgroundColor: '#1A1A1A', color: '#CCCCCC', show: true, fontSize: 16, bold: false, roundingValue: 0, roundingPercentage: 0 }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#CCCCCC', text: 'Subtitle', fontSize: 16, bold: false } }, tooltip: { show: true, color: '#CCCCCC', backgroundColor: '#1A1A1A', fontSize: 14, showValue: true, showPercentage: true, roundingValue: 0, roundingPercentage: 0, customFormat: null, borderRadius: 4, borderColor: '#3A3A3A', borderWidth: 1, backgroundOpacity: 30, position: 'center', offsetY: 24 } } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, img: true, csv: true, table: true, labels: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', labels: 'Toggle labels', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, table: { show: false, responsiveBreakpoint: 300, columnNames: { series: 'Series', value: 'Value', percentage: 'Percentage' }, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 0, roundingPercentage: 0 } } }
