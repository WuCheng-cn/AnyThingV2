import type { VueUiRadarConfig, VueUiRadarDataset } from 'vue-data-ui'

export const mockDataset: VueUiRadarDataset = {
  categories: [
    {
      name: 'category 1',
      color: '#5f8bee',
    },
    {
      name: 'category 2',
      color: '#42d392',
    },
    {
      name: 'category 3',
      color: '#ff6400',
    },
  ],
  // Each serie can have its own scale using the target attribute, so you can represent all types of data relations (revenue, satisfaction, percentages...)
  series: [
    {
      name: 'Serie 1',
      values: [65, 45, 12],
      color: '',
      target: 100,
    },
    {
      name: 'Serie 2',
      values: [2525, 3472, 4950],
      color: '',
      target: 10000,
    },
    {
      name: 'Serie 3',
      values: [4.7, 1, 3],
      color: '',
      target: 5,
    },
    {
      name: 'Serie 4',
      values: [400, 250, 325],
      color: '',
      target: 500,
    },
    {
      name: 'Serie 5',
      values: [5, 9, 7],
      color: '',
      target: 10,
    },
    {
      name: 'Serie 6',
      values: [6, 7, 10],
      color: '',
      target: 10,
    },
  ],
}
export const mockConfig: VueUiRadarConfig = { responsive: true, useCssAnimation: true, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', layout: { plots: { show: true, radius: 2 }, outerPolygon: { stroke: '#6a6b6a', strokeWidth: 1 }, dataPolygon: { strokeWidth: 1, transparent: false, opacity: 50, useGradient: true }, grid: { show: true, stroke: '#565756', strokeWidth: 0.5, graduations: 5 }, labels: { dataLabels: { show: true, fontSize: 12, color: '#CCCCCC' } } }, title: { text: 'Title', color: '#e1e5e8', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, tooltip: { show: true, backgroundColor: '#1A1A1A', color: '#CCCCCC', fontSize: 14, showValue: true, showPercentage: true, roundingValue: 0, roundingPercentage: 0, animation: { show: true, animationFrames: 60 }, borderRadius: 4, borderColor: '#3A3A3A', borderWidth: 1, backgroundOpacity: 30, position: 'center', offsetY: 24 }, legend: { show: true, bold: true, backgroundColor: '#1A1A1A', color: '#CCCCCC', fontSize: 14, roundingPercentage: 0 } } }, table: { show: false, responsiveBreakpoint: 400, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 0, roundingPercentage: 0 } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, img: true, csv: true, table: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, translations: { target: 'Target', value: 'Value', datapoint: 'Datapoint' } }
