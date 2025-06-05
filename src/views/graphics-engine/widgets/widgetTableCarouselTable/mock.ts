import type { VueUiCarouselTableConfig } from 'vue-data-ui'

export const mockDataset = {
  head: ['col1', 'col2', 'col3', 'col4', 'col5'],
  body: [
    [10000, 1000, 100, 10, 0],
    [10001, 1001, 101, 11, 1],
    [10002, 1002, 102, 12, 2],
    [10003, 1003, 103, 13, 3],
    [10004, 1004, 104, 14, 4],
    [10005, 1005, 105, 15, 5],
    [10006, 1006, 106, 16, 6],
    [10007, 1007, 107, 17, 7],
    [10008, 1008, 108, 18, 8],
    [10009, 1009, 109, 19, 9],
  ],
}
export const mockConfig: VueUiCarouselTableConfig = { responsiveBreakpoint: 400, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { tooltip: false, pdf: true, csv: true, img: true, table: false, labels: false, fullscreen: true, sort: false, stack: false, animation: true }, buttonTitles: { open: 'Open options', close: 'Close options', pdf: 'Download PDF', csv: 'Download CSV', img: 'Download PNG', fullscreen: 'Toggle fullscreen', animation: 'Toggle animation' }, print: { scale: 2 } }, animation: { type: 'scroll', use: true, speedMs: 1000, pauseOnHover: true }, style: { backgroundColor: '#2A2A2A', color: '#CCCCCC', fontFamily: 'inherit' }, border: { size: 0, color: '#2D353C' }, scrollbar: { showOnlyOnHover: false, hide: false }, caption: { text: 'Gentle random data', padding: { top: 12, right: 12, bottom: 12, left: 12 }, style: { backgroundColor: '#2A2A2A', color: '#42d392', fontSize: '20px', fontWeight: 'bold', textAlign: 'left' } }, thead: { style: { verticalAlign: 'middle' }, tr: { height: 32, border: { size: 0, color: '#2D353C' }, style: { backgroundColor: '#3A3A3A', color: '#CCCCCC', boxShadow: '0px 6px 12px -6px #1A1A1A' }, th: { border: { size: 0, color: '#2D353C' }, padding: { top: 0, right: 12, bottom: 0, left: 0 }, style: { borderSpacing: 0, border: 'none', textAlign: 'right', fontVariantNumeric: 'tabular-nums' } } } }, tbody: { backgroundColor: '#2A2A2A', tr: { visible: 5, height: 32, border: { size: 0, color: '#2D353C' }, style: { backgroundColor: '#4A4A4A', color: '#CCCCCC' }, td: { alternateColor: true, alternateOpacity: 0.8, border: { size: 0, color: '#2D353C' }, padding: { top: 0, right: 12, bottom: 0, left: 0 }, style: { fontVariantNumeric: 'tabular-nums', textAlign: 'right', backgroundColor: '#2A2A2A' } } } } }
