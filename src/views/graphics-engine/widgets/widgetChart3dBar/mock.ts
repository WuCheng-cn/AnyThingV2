import type { VueUi3dBarConfig, VueUi3dBarDataset } from 'vue-data-ui'

export const mockDataset: VueUi3dBarDataset = {
  series: [
    {
      name: 'Serie 1 with a long name that should be shorter but we do not have the choice',
      value: 256,
      breakdown: [
        {
          name: 'Sub serie 1',
          value: 100,
        },
        {
          name: 'Sub serie 2',
          value: 90,
        },
        {
          name: 'Sub serie 3',
          value: 66,
        },
      ],
    },
    {
      name: 'Serie 2',
      value: 128,
    },
    {
      name: 'Serie 3',
      value: 64,
    },
    {
      name: 'Serie 4',
      value: 32,
    },
    {
      name: 'Serie 5',
      value: 16,
    },
    {
      name: 'Serie 6',
      value: 8,
    },
  ],
}
export const mockConfig: VueUi3dBarConfig = { style: { fontFamily: 'inherit', shape: 'bar', chart: { animation: { use: true, speed: 1, acceleration: 1 }, backgroundColor: '#1A1A1A', color: '#CCCCCC', bar: { color: '#5f8bee', stroke: '#5f8bee', strokeWidth: 0.7, shadeColor: '#1A1A1A' }, box: { stroke: '#5A5A5A', strokeWidth: 0.7, strokeDasharray: 2, dimensions: { width: 128, height: 256, top: 27, bottom: 9, left: 24, right: 24, perspective: 18 } }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, legend: { showDefault: true, fontSize: 10, color: '#CCCCCC', bold: false, roundingValue: 0, roundingPercentage: 0, prefix: '', suffix: '', hideUnderPercentage: 3 }, dataLabel: { show: true, bold: true, color: '#5f8bee', fontSize: 12, rounding: 1 } } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { pdf: true, img: true, csv: true, table: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, table: { show: false, responsiveBreakpoint: 300, columnNames: { series: 'Series', value: 'Value', percentage: 'Percentage' }, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none', roundingValue: 0, roundingPercentage: 0 } } }
