import { defineAsyncComponent } from 'vue'

export function useComponent() {
  /** # 注册异步组件 */
  function resgistAsyncComponent(path: string, delay = 20) {
    return defineAsyncComponent({
      loader: () => import(path),
      delay,
    })
  }

  /** # 异步加载图片 */
  function loadImageAsync(src: string) {
    return new Promise<string>((resolve, reject) => {
      const image = new Image()
      image.src = src
      image.onload = () => {
        resolve(src)
      }
      image.onerror = () => {
        reject(new Error('图片加载失败'))
      }
    })
  }

  return {
    resgistAsyncComponent,
    loadImageAsync,
  }
}
