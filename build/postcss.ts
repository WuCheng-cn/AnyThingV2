import autoprefixer from 'autoprefixer'
import viewport from 'postcss-mobile-forever'

export function createPostcssPlugins() {
  return [
    autoprefixer(),

    // https://github.com/wswmsword/postcss-mobile-forever
    viewport({
      appSelector: '#app',
      viewportWidth: 375,
      disableDesktop: true,
      enableMediaQuery: true,
      rootContainingBlockSelectorList: [
        'van-tabbar',
        'van-popup',
      ],
      border: true,
    }),
  ]
}
