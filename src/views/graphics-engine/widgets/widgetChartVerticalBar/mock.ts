import type { VueUiVerticalBarConfig, VueUiVerticalBarDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiVerticalBarDatasetItem[] = [
  {
    name: 'Serie 1',
    value: 100,
    children: [
      {
        name: 'serie 1 child 1',
        value: 80,
      },
      {
        name: 'serie 1 child 2',
        value: 20,
      },
    ],
  },
  {
    name: 'Serie 2',
    value: 345,
  },
  {
    name: 'Serie 3',
    value: 210,
  },
  {
    name: 'Serie 4',
    value: 188,
  },
  {
    name: 'Serie 5',
    value: 120,
    children: [
      {
        name: 'Serie 5 child 1',
        value: 60,
      },
      {
        name: 'Serie 5 child 2',
        value: 20,
      },
      {
        name: 'Serie 5 child 3',
        value: 40,
      },
    ],
  },
]

export const mockConfig: VueUiVerticalBarConfig = { responsive: true, useCssAnimation: true, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', layout: { bars: { sort: 'desc', useStroke: false, strokeWidth: 2, height: 32, gap: 6, borderRadius: 4, offsetX: 64, paddingRight: 0, useGradient: true, gradientIntensity: 20, fillOpacity: 10, underlayerColor: '#FFFFFF', dataLabels: { color: '#CCCCCC', bold: true, fontSize: 12, value: { show: true, roundingValue: 0, prefix: '', suffix: '' }, percentage: { show: true, roundingPercentage: 0 }, offsetX: 0 }, nameLabels: { show: true, color: '#CCCCCC', bold: false, fontSize: 10, offsetX: 0 }, parentLabels: { show: true, color: '#CCCCCC', bold: false, fontSize: 10, offsetX: 0 } }, highlighter: { color: '#FFFFFF', opacity: 5 }, separators: { show: true, color: '#343434', strokeWidth: 1 } }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, legend: { position: 'top', show: true, fontSize: 14, color: '#CCCCCC', bold: true, roundingValue: 0, backgroundColor: '#1A1A1A', roundingPercentage: 0, prefix: '', suffix: '' }, tooltip: { show: true, backgroundColor: '#1A1A1A', color: '#CCCCCC', fontSize: 14, showValue: true, showPercentage: true, roundingValue: 0, roundingPercentage: 0, prefix: '', suffix: '', customFormat: null, borderRadius: 4, borderColor: '#3A3A3A', borderWidth: 1, backgroundOpacity: 50, position: 'center', offsetY: 24 } } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, img: true, csv: true, table: true, sort: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', sort: 'Toggle sort', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, table: { show: false, responsiveBreakpoint: 400, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 0, roundingPercentage: 0, prefix: '', suffix: '' } }, translations: { parentName: 'Serie', childName: 'Child', value: 'value', percentageToTotal: '%/total', percentageToSerie: '%/serie' } }
