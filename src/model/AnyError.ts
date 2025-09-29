import { EErrorType } from '@/enum/EErrorType'

/**
 * # 自定义错误基类 🔧
 * 所有自定义错误类型的基础类，提供统一的错误处理机制
 */
export class AnyErrorBase extends Error {
  /** 错误类型 */
  type: EErrorType
  /** 错误代码 */
  code: string
  /** 错误元数据，可携带额外信息 */
  metadata?: Record<string, any>
  /** HTTP状态码（仅适用于网络错误） */
  statusCode?: number

  constructor(
    message: string,
    type: EErrorType,
    code: string = 'UNKNOWN_ERROR',
    metadata?: Record<string, any>,
  ) {
    super(message)
    // 修复继承Error时的堆栈问题
    this.name = this.constructor.name
    this.type = type
    this.code = code
    this.metadata = metadata

    // 确保堆栈正确指向调用点
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

/**
 * # 开发错误类 🐛
 * 用于开发阶段的错误，如代码逻辑错误、类型错误等
 */
export class AnyDevError extends AnyErrorBase {
  constructor(
    message: string,
    code: string = 'DEV_ERROR',
    metadata?: Record<string, any>,
  ) {
    super(message, EErrorType.DevError, code, metadata)
  }
}

/**
 * # 业务逻辑错误类 🏢
 * 用于业务流程中的错误，如验证失败、权限不足等
 */
export class AnyBusinessError extends AnyErrorBase {
  constructor(
    message: string,
    code: string = 'BUSINESS_ERROR',
    metadata?: Record<string, any>,
  ) {
    super(message, EErrorType.BusinessError, code, metadata)
  }
}

/**
 * # 网络错误类 🌐
 * 用于网络请求相关的错误，如请求失败、超时等
 */
export class AnyNetworkError extends AnyErrorBase {
  /** HTTP状态码 */
  statusCode?: number

  constructor(
    message: string,
    code: string = 'NETWORK_ERROR',
    statusCode?: number,
    metadata?: Record<string, any>,
  ) {
    super(message, EErrorType.NetworkError, code, metadata)
    this.statusCode = statusCode
  }
}

/**
 * # 其他错误类 📌
 * 用于未分类的错误
 */
export class AnyOtherError extends AnyErrorBase {
  constructor(
    message: string,
    code: string = 'OTHER_ERROR',
    metadata?: Record<string, any>,
  ) {
    super(message, EErrorType.OtherError, code, metadata)
  }
}
