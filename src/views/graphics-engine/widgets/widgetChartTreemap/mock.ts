import type { VueUiTreemapConfig, VueUiTreemapDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiTreemapDatasetItem[] = [
  {
    name: 'Parent 1',
    value: 100,
    children: [
      {
        name: 'P1 C1',
        value: 70,
      },
      {
        name: 'P1 C2',
        value: 20,
      },
      {
        name: 'P1 C3',
        value: 10,
      },
    ],
  },
  {
    name: 'Parent 2',
    value: 110,
    children: [
      {
        name: 'P2 C1',
        value: 80,
      },
      {
        name: 'P2 C2',
        value: 20,
      },
      {
        name: 'P2 C3',
        value: 10,
        children: [
          {
            name: 'P2 C3 A',
            value: 4,
          },
          {
            name: 'P2 C3 B',
            value: 3,
          },
          {
            name: 'P2 C3 C',
            value: 3,
          },
        ],
      },
    ],
  },
]
export const mockConfig: VueUiTreemapConfig = { responsive: true, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, img: true, csv: true, table: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', height: 500, width: 800, padding: { top: 0, left: 6, bottom: 12, right: 6 }, layout: { sorted: true, rects: { stroke: '#1A1A1A', strokeWidth: 1, borderRadius: 0, colorRatio: 0.3, gradient: { show: true, intensity: 30 }, selected: { stroke: '#1A1A1A', strokeWidth: 1, unselectedOpacity: 0.6 } }, labels: { showDefaultLabels: true, fontSize: 24, minFontSize: 10, hideUnderProportion: 0.03, prefix: 'Value: ', suffix: '', rounding: 0 } }, legend: { backgroundColor: '#1A1A1A', color: '#CCCCCC', show: true, fontSize: 16, bold: false, roundingValue: 0, roundingPercentage: 0 }, title: { text: 'Title', color: '#fafafa', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, tooltip: { show: true, color: '#CCCCCC', backgroundColor: '#1A1A1A', fontSize: 14, roundingValue: 1, customFormat: null, borderRadius: 4, borderColor: '#3A3A3A', borderWidth: 1, backgroundOpacity: 30, position: 'center', offsetY: 24 } } }, table: { show: false, responsiveBreakpoint: 300, columnNames: { series: 'Series', value: 'Value', percentage: 'Percentage' }, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 0, roundingPercentage: 0 } } }
