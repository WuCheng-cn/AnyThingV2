import nprogress from 'nprogress'

class AnyProgress {
  /** # 进度条实例 */
  private instance: any = null

  constructor() {
    this.instance = nprogress
    this.instance.configure({
      showSpinner: true,
      speed: 300,
    })
  }

  /** # 开始进度条 */
  start() {
    this.instance.start()
  }

  /** # 完成进度条 */
  done() {
    this.instance.done()
  }
}

export const anyProgress = new AnyProgress()
