import type { VueUiParallelCoordinatePlotConfig, VueUiParallelCoordinatePlotDatasetItem } from 'vue-data-ui'

export const mockDataset: VueUiParallelCoordinatePlotDatasetItem[] = [
  {
    name: 'Series 1',
    shape: 'triangle',
    series: [
      {
        name: 'Item 1.1',
        values: [1200, 300, 12, 1.2],
      },
      {
        name: 'Item 1.2',
        values: [1000, 100, 10, 1],
      },
      {
        name: 'Item 1.3',
        values: [-800, 85, 8.5, 0.85],
      },
    ],
  },
  {
    name: 'Series 2',
    series: [
      {
        name: 'Item 2.1',
        values: [2300, 230, 23, 2.3],
      },
      {
        name: 'Item 2.2',
        values: [2500, 250, 25, 2.5],
      },
      {
        name: 'Item 2.3',
        values: [2800, 280, 28, 2.8],
      },
    ],
  },
]

export const mockConfig: VueUiParallelCoordinatePlotConfig = { responsive: true, theme: '', useCssAnimation: true, customPalette: [], userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: true, pdf: true, img: true, csv: true, table: true, labels: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', tooltip: 'Toggle tooltip', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', table: 'Toggle table', labels: 'Toggle labels', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', height: 600, width: 1000, padding: { top: 24, left: 0, right: 0, bottom: 36 }, lines: { smooth: true, strokeWidth: 2, opacity: 0.8 }, plots: { show: true, radius: 6, opacity: 0.8 }, yAxis: { scaleTicks: 10, stroke: '#4A4A4A', strokeWidth: 1, labels: { showAxisNames: true, axisNames: ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4'], axisNamesColor: '#6A6A6A', axisNamesFontSize: 16, axisNamesBold: true, roundings: [0, 0, 0, 2], prefixes: ['$', '', '', ''], suffixes: ['', '', '%', '°'], ticks: { show: true, fontSize: 14, color: '#6A6A6A', bold: false, offsetX: 0, offsetY: 0 }, datapoints: { show: true, fontSize: 14, useSerieColor: true, color: '#2D353C', offsetX: 0, offsetY: 0, bold: true } } }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } }, comments: { show: true, showInTooltip: true, width: 200, offsetX: 0, offsetY: 0 }, legend: { backgroundColor: '#1A1A1A', color: '#CCCCCC', show: true, fontSize: 16, bold: false }, tooltip: { show: true, color: '#CCCCCC', backgroundColor: '#1A1A1A', fontSize: 14, customFormat: null, borderRadius: 4, borderColor: '#3A3A3A', borderWidth: 1, backgroundOpacity: 30, position: 'center', offsetY: 24 } } }, table: { show: false, responsiveBreakpoint: 400, columnNames: { series: 'Series', item: 'Item' }, th: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' }, td: { backgroundColor: '#1A1A1A', color: '#CCCCCC', outline: 'none' } } }
