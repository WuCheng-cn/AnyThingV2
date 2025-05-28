const NetEvent = [
  /** # 网络连接 */
  'Net:Connect',
  /** # 网络断开 */
  'Net:Disconnect',
  /** # 网络错误 */
  'Net:Error',
  /** # 网络未授权 */
  'Net:UnAuth',
  /** # 网络超时 */
  'Net:TimeOut',
] as const

const RouterEvent = [
  /** # 路由跳转 */
  'Router:Push',
  /** # 路由替换 */
  'Router:Replace',
  /** # 路由后退 */
  'Router:Back',
  /** # 路由前进 */
  'Router:Forward',
] as const

const _Events = [
  ...NetEvent,
  ...RouterEvent,
] as const

type EventName = (typeof _Events)[number]

/**
 * # 应用级事件集散中心 😎
 * 你可以在这里注册事件、触发、移除、中断、获取事件。以达到模块间解耦的目的。
 */
class AppEventEmiter {
  /** # 事件 */
  private eventMap: Map<EventName, ((...args: any[]) => void)[]> = new Map()

  /**
   * # 注册事件
   * @param event 事件名
   * @param callback 回调函数
   */
  on(event: EventName, callback: (...args: any[]) => void) {
    const callbacks = this.eventMap.get(event) || []
    callbacks.push(callback)
    this.eventMap.set(event, callbacks)
  }

  /**
   * # 触发事件
   * @param event 事件名
   * @param args 参数
   */
  emit(event: EventName, ...args: any[]) {
    const callbacks = this.eventMap.get(event) || []
    callbacks.forEach((callback) => {
      callback(...args)
    })
  }

  /**
   * # 移除事件
   * @param event 事件名
   * @param callback 回调函数
   */
  off(event: EventName, callback: (...args: any[]) => void) {
    const callbacks = this.eventMap.get(event) || []
    this.eventMap.set(event, callbacks.filter(cb => cb !== callback))
  }

  /**
   * # 一次性事件
   * @param event 事件名
   * @param callback 回调函数
   */
  once(event: EventName, callback: (...args: any[]) => void) {
    const onceCallback = (...args: any[]) => {
      callback(...args)
      this.off(event, onceCallback)
    }
    this.on(event, onceCallback)
  }

  /** # 中断事件 */
  interrupt(event: EventName) {
    this.off(event, () => {})
  }

  /** # 移除所有事件 */
  offAll() {
    this.eventMap.clear()
  }

  /** # 获取事件 */
  getEvent(event: EventName) {
    return this.eventMap.get(event)
  }

  /** # 获取事件列表 */
  getEventList() {
    return this.eventMap
  }

  /** # 获取事件数量 */
  getEventCount() {
    return this.eventMap.size
  }
}

export default new AppEventEmiter()
