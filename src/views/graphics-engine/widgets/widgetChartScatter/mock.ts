import type { VueUiScatterConfig, VueUiScatterDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiScatterDatasetItem[] = [
  {
    name: 'Cluster 1',
    values: [
      {
        x: 1,
        y: 1,
        name: 'Cluster 1 point 1',
      },
      {
        x: 0,
        y: -1,
        name: 'Cluster 1 point 2',
      },
      {
        x: 2,
        y: 3,
        name: 'Cluster 1 point 3',
      },
    ],
  },
  {
    name: 'Cluster 2',
    values: [
      {
        x: -5,
        y: -4,
        name: 'Cluster 2 point 1',
      },
      {
        x: 13,
        y: 8,
        name: 'Cluster 2 point 2',
      },
      {
        x: -2,
        y: -7,
        name: 'Cluster 2 point 3',
      },
    ],
  },
]
export const mockConfig: VueUiScatterConfig = { downsample: { threshold: 500 }, responsive: true, useCssAnimation: true, style: { backgroundColor: '#1A1A1A', color: '#CCCCCC', fontFamily: 'inherit', layout: { height: 316, width: 512, padding: { top: 36, right: 48, bottom: 36, left: 48 }, axis: { show: true, stroke: '#565656', strokeWidth: 1 }, marginalBars: { show: true, size: 40, tranches: 20, opacity: 0.5, fill: '#CCCCCC', strokeWidth: 0.5, offset: 20, borderRadius: 2, useGradient: true, showLines: true, linesStrokeWidth: 1 }, plots: { radius: 3, stroke: '#1A1A1A', strokeWidth: 0.3, opacity: 0.6, significance: { show: true, useDistanceOpacity: false, deviationThreshold: 10, opacity: 0.3 }, deviation: { translation: 'deviation', roundingValue: 1 }, giftWrap: { show: false, strokeWidth: 1, strokeDasharray: 0, fillOpacity: 0.2 }, selectors: { show: true, stroke: '#CCCCCC', strokeWidth: 0.7, strokeDasharray: 0, labels: { fontSize: 8, color: '#CCCCCC', rounding: 2, bold: false, showName: true, prefix: '', suffix: '', x: { formatter: null }, y: { formatter: null } }, markers: { radius: 1.5, stroke: '#CCCCCC', strokeWidth: 0.5, fill: '#1A1A1A' } } }, correlation: { show: true, strokeDasharray: 2, strokeWidth: 1, label: { show: true, fontSize: 8, color: '#CCCCCC', bold: true, roundingValue: 2, useSerieColor: true } }, dataLabels: { xAxis: { name: 'xAxis', show: true, fontSize: 8, color: '#CCCCCC', bold: false, roundingValue: 0, offsetX: 0, offsetY: 0 }, yAxis: { name: 'yAxis', show: true, fontSize: 8, color: '#CCCCCC', bold: false, roundingValue: 0, offsetX: 0, offsetY: 0 } } }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, legend: { show: true, backgroundColor: '#1A1A1A', color: '#CCCCCC', fontSize: 12, bold: true, roundingValue: 0 }, tooltip: { show: true, backgroundColor: '#1A1A1A', color: '#CCCCCC', fontSize: 14, roundingValue: 0, customFormat: null, showShape: true, prefix: '', suffix: '', borderRadius: 4, borderColor: '#3A3A3A', borderWidth: 1, backgroundOpacity: 30, position: 'center', offsetY: 24 } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, img: true, csv: true, table: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, table: { show: false, responsiveBreakpoint: 400, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 2, roundingAverage: 1 }, translations: { correlationCoefficient: 'Correlation Coef.', nbrPlots: 'Nbr plots', average: 'Average', series: 'Series' } } }
