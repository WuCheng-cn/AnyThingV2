import type { VueUiGaugeConfig, VueUiGaugeDataset } from 'vue-data-ui'

export const mockDataset: VueUiGaugeDataset = {
  base: 12250,
  value: 4.2,
  series: [
    {
      from: 1,
      to: 3,
      color: '#ff6400',
      name: 'bad',
    },
    {
      from: 3,
      to: 4,
      color: '#5f8bee',
      name: 'acceptable',
    },
    {
      from: 4,
      to: 5,
      color: '#42d392',
      name: 'very good',
    },
  ],
}
export const mockConfig: VueUiGaugeConfig = { responsive: true, style: { fontFamily: 'inherit', chart: { backgroundColor: '#1A1A1A', color: '#CCCCCC', animation: { use: true, speed: 1, acceleration: 1 }, layout: { radiusRatio: 1, track: { size: 1, useGradient: true, gradientIntensity: 20 }, markers: { show: true, prefix: '', suffix: '', color: '#CCCCCC', bold: true, fontSizeRatio: 1, offsetY: 0, roundingValue: 0 }, segmentSeparators: { show: false, offsetOut: 0, offsetIn: 0, stroke: '#4A4A4A', strokeWidth: 2 }, segmentNames: { show: true, curved: true, offsetRatio: 1.1, fontSize: 16, useSerieColor: true, color: '#CCCCCC', bold: false }, indicatorArc: { show: true, radius: 123, fill: '#3A3A3A' }, pointer: { show: true, type: 'pointy', size: 1, stroke: '#CCCCCC', strokeWidth: 12, useRatingColor: true, color: '#1A1A1A', circle: { radius: 10, stroke: '#CCCCCC', strokeWidth: 2, color: '#1A1A1A' } } }, legend: { show: true, fontSize: 48, prefix: '', suffix: '', roundingValue: 1, showPlusSymbol: true, useRatingColor: true, color: '#CCCCCC' }, title: { text: 'Title', color: '#E1E5E8', fontSize: 20, bold: true, textAlign: 'center', paddingLeft: 0, paddingRight: 0, subtitle: { color: '#A1A1A1', text: 'Subtitle', fontSize: 16, bold: false } } } }, userOptions: { show: true, showOnChartHover: false, keepStateOnChartLeave: true, position: 'right', buttons: { pdf: true, img: true, fullscreen: true, annotator: true }, buttonTitles: { open: 'Open options', close: 'Close options', pdf: 'Download PDF', img: 'Download PNG', fullscreen: 'Toggle fullscreen', annotator: 'Toggle annotator' }, print: { scale: 2 } }, translations: { base: 'Base' } }
