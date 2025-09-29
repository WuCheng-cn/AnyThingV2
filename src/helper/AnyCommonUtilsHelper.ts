import type { IOpenWindowOptions } from '@/interface/preferences/IOpenWindowOptions'

/** # 通用工具辅助类 🎊 */
export abstract class AnyCommonUtilsHelper {
  /** # 新窗口打开URL 🪟 */
  static openWindow(url: string, options: IOpenWindowOptions = {}): void {
    // 解构并设置默认值
    const { noopener = true, noreferrer = true, target = '_blank' } = options
    // 基于选项创建特性字符串
    const features = [noopener && 'noopener=yes', noreferrer && 'noreferrer=yes']
      .filter(Boolean)
      .join(',')
    window.open(url, target, features)
  }

  /** # 在新窗口中打开路由 🪟 */
  static openRouteInNewWindow(path: string) {
    const { hash, origin } = location
    const fullPath = path.startsWith('/') ? path : `/${path}`
    const url = `${origin}${hash && !fullPath.startsWith('/#') ? '/#' : ''}${fullPath}`
    this.openWindow(url, { target: '_blank' })
  }
}
