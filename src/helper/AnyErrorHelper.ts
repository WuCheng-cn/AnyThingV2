import type { EErrorType } from '@/enum/EErrorType'
import { message } from 'ant-design-vue'
import { deserializeError, serializeError } from 'serialize-error'
import { AnyBusinessError, AnyDevError, AnyErrorBase, AnyNetworkError, AnyOtherError } from '@/model/AnyError'
import { useUserStore } from '@/stores/modules/useUserStore'

/**
 * # 错误处理助手类 🚑
 * 提供错误序列化、格式化、上报等功能
 */
export class AnyErrorHelper {
  /**
   * # 错误序列化工具
   * 将错误对象转换为可序列化的普通对象
   * @param error 错误对象
   * @returns 序列化后的普通对象
   */
  static formatError(error: Error | unknown): any {
    const serialized = serializeError(error) || {}
    const { userInfo } = useUserStore()
    return {
      ...serialized,
      timestamp: Date.now(),
      environment: import.meta.env.NODE_ENV,
      // 如果是AnyError类型，额外提取类型、代码等信息
      ...(this.isAnyError(error) && {
        type: error.type,
        code: error.code,
        statusCode: error.statusCode,
        metadata: {
          ...error.metadata,
          userInfo,
        },
      }),
    }
  }

  /**
   * # 错误反序列化工具
   * 将序列化的错误对象转换回Error对象
   * @param serializedError 序列化后的错误对象
   * @returns 反序列化后的Error对象
   */
  static parseError(serializedError: unknown) {
    return deserializeError(serializedError)
  }

  /**
   * # 格式化错误消息
   * 从错误对象中提取并格式化错误消息
   * @param error 错误对象
   * @returns 格式化后的错误消息
   */
  static getErrorMessage(error: unknown): string {
    if (this.isAnyError(error)) {
      return error.message
    }

    const serialized = serializeError(error) as any

    // 尝试从不同来源获取错误消息
    return (
      serialized.message
      || (serialized.response?.data?.message)
      || (serialized.response?.data?.error)
      || '未知错误'
    )
  }

  /**
   * # 错误上报
   * 根据错误类型进行不同级别的上报处理
   * @param error 错误对象
   * @param severity 错误严重程度 (default: 'error')
   */
  static reportError(error: Error | unknown, severity: 'debug' | 'info' | 'warn' | 'error' = 'error'): void {
    const formattedError = this.formatError(error)

    // 根据环境决定是否在控制台输出
    if (import.meta.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console[severity]('错误详情:', formattedError)
    }

    // 根据错误类型进行不同的处理
    if (this.isNetworkError(error)) {
      // 网络错误的特殊处理
      this.handleNetworkError(error)
    }
    else if (this.isBusinessError(error)) {
      // 业务错误的特殊处理
      this.handleBusinessError(error)
    }
    else if (this.isDevError(error)) {
      // 开发错误的特殊处理
      this.handleDevError(error)
    }

    // 上报到服务器（实际项目中替换为真实的上报接口）
    // 仅在生产环境上报非调试错误
    if (import.meta.env.NODE_ENV === 'production' && severity !== 'debug') {
      this.sendErrorToServer(formattedError)
    }
  }

  /**
   * # 处理网络错误
   * @param error 网络错误对象
   */
  private static handleNetworkError(error: any): void {
    const statusCode = error.statusCode || (error.response?.status)

    switch (statusCode) {
      case 401:
        // 未授权错误，可以跳转到登录页面
        message.error('登录已过期，请重新登录')
        // router.push('/login')
        break
      case 403:
        message.error('您没有权限执行此操作')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器内部错误，请稍后重试')
        break
      default:
        message.error(this.getErrorMessage(error) || '网络请求失败')
    }
  }

  /**
   * # 处理业务错误
   * @param error 业务错误对象
   */
  private static handleBusinessError(error: any): void {
    // 业务错误通常需要展示给用户具体的错误信息
    message.error(this.getErrorMessage(error))
  }

  /**
   * # 处理开发错误
   * @param error 开发错误对象
   */
  private static handleDevError(error: any): void {
    // 开发错误通常包含详细的技术信息，在开发环境下可以显示完整信息
    if (import.meta.env.NODE_ENV !== 'production') {
      console.error('开发错误:', error)
    }
    else {
      // 生产环境下只显示通用错误信息
      message.error('系统发生错误，请稍后重试')
    }
  }

  /**
   * # 发送错误到服务器
   * @param formattedError 格式化后的错误对象
   */
  private static sendErrorToServer(formattedError: any): void {
    try {
      // 这里应该是实际的错误上报API调用
      // 例如：axios.post('/api/error-report', formattedError)
      console.warn('错误已上报:', formattedError)
    }
    catch (reportError) {
      console.error('错误上报失败:', reportError)
    }
  }

  /**
   * # 全局错误处理
   * 用于捕获全局未处理的错误
   * @param error 错误对象
   * @param context 错误上下文信息
   */
  static handleGlobalError(error: Error, context?: string): void {
    const enhancedError = new AnyOtherError (
      this.getErrorMessage(error),
      'GLOBAL_ERROR',
      { context, originalStack: error.stack },
    )

    this.reportError(enhancedError)
  }

  /**
   * # 异步错误处理包装器
   * 用于包装异步函数，自动捕获和处理错误
   * @param fn 需要包装的函数
   * @returns 包装后的函数
   */
  static asyncHandler<T extends (...args: any[]) => Promise<any>>(fn: T): (...args: Parameters<T>) => Promise<ReturnType<T> | null> {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
      try {
        return await fn(...args)
      }
      catch (error) {
        this.reportError(error)
        return null
      }
    }
  }

  /** # 判断错误是否为AnyErrorBase类型 */
  static isAnyError(error: unknown): error is AnyErrorBase {
    return error instanceof AnyErrorBase
  }

  /** # 判断错误是否为特定类型 */
  static isErrorType(error: unknown, type: EErrorType): boolean {
    return this.isAnyError(error) && error.type === type
  }

  /** # 判断错误是否为开发错误 */
  static isDevError(error: unknown): error is AnyDevError {
    return error instanceof AnyDevError
  }

  /** # 判断错误是否为业务逻辑错误 */
  static isBusinessError(error: unknown): error is AnyBusinessError {
    return error instanceof AnyBusinessError
  }

  /** # 判断错误是否为网络错误 */
  static isNetworkError(error: unknown): error is AnyNetworkError {
    return error instanceof AnyNetworkError
  }

  /** # 判断错误是否为其他错误 */
  static isOtherError(error: unknown): error is AnyOtherError {
    return error instanceof AnyOtherError
  }
}
