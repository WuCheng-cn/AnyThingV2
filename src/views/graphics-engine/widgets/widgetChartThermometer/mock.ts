import type { VueUiThermometerConfig, VueUiThermometerDataset } from 'vue-data-ui'

export const mockDataset: VueUiThermometerDataset = {
  value: 37,
  from: -100,
  to: 100,
  steps: 20,
  colors: {
    from: '#dc3912',
    to: '#3366cc',
  },
}
export const mockConfig: VueUiThermometerConfig = { style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', height: 360, thermometer: { width: 48 }, padding: { top: 12, bottom: 12, left: 64, right: 64 }, graduations: { show: true, sides: 'both', height: 2, stroke: '#e1e5e8', strokeWidth: 1, showIntermediate: true, gradient: { show: true, intensity: 40 } }, animation: { use: true, speedMs: 1000 }, label: { fontSize: 20, rounding: 1, bold: true, color: '#CCCCCC', prefix: '', suffix: '' } }, title: { text: 'Title', color: '#FAFAFA', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { pdf: true, img: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', pdf: 'Download PDF', img: 'Download PNG', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } } }
