import { AnyCryptoHelper } from './AnyCryptoHelper'

/** # 本地存储辅助类 🔒 */
export abstract class AnyStorageHelper {
  /** # 存储数据（同步版本，无加密） */
  static setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  /** # 获取数据（同步版本，无加密） */
  static getItem(key: string): string | null {
    return localStorage.getItem(key)
  }

  /**
   * # 存储任意类型数据（同步版本，无加密）
   * @param key 存储键名
   * @param value 要存储的任意类型数据
   */
  static setItemAny<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    }
    catch (error) {
      console.error('序列化数据失败:', error)
      throw new Error('Failed to serialize data for storage')
    }
  }

  /**
   * # 获取任意类型数据（同步版本，无加密）
   * @param key 存储键名
   * @returns T | null 解析后的原始数据或null
   */
  static getItemAny<T>(key: string): T | null {
    try {
      const storedValue = localStorage.getItem(key)
      if (!storedValue)
        return null

      return JSON.parse(storedValue) as T
    }
    catch (error) {
      console.error('解析数据失败:', error)
      return null
    }
  }

  /**
   * # 存储加密数据（异步版本）
   * @param key 存储键名
   * @param value 要存储的原始数据
   * @returns Promise<void>
   */
  static async setItemEncrypted(key: string, value: string): Promise<void> {
    try {
      const encryptedData = await AnyCryptoHelper.encrypt(value)
      localStorage.setItem(key, encryptedData)
    }
    catch (error) {
      console.error('加密存储失败:', error)
      // 发生错误时，使用原始方式存储
      localStorage.setItem(key, value)
    }
  }

  /**
   * # 获取并解密数据（异步版本）
   * @param key 存储键名
   * @returns Promise<string | null> 解密后的原始数据
   */
  static async getItemDecrypted(key: string): Promise<string | null> {
    try {
      const storedValue = localStorage.getItem(key)
      if (!storedValue)
        return null

      return await AnyCryptoHelper.decrypt(storedValue)
    }
    catch (error) {
      console.error('解密获取失败:', error)
      // 发生错误时，返回原始存储值
      return localStorage.getItem(key)
    }
  }

  /**
   * # 存储加密的任意类型数据（异步版本）
   * @param key 存储键名
   * @param value 要存储的任意类型数据
   * @returns Promise<void>
   */
  static async setItemAnyEncrypted<T>(key: string, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value)
      const encryptedData = await AnyCryptoHelper.encrypt(serializedValue)
      localStorage.setItem(key, encryptedData)
    }
    catch (error) {
      console.error('加密存储复杂数据失败:', error)
      // 发生错误时，尝试使用非加密方式存储
      try {
        this.setItemAny(key, value)
      }
      catch (fallbackError) {
        console.error('降级存储也失败:', fallbackError)
        throw new Error('Failed to store complex data')
      }
    }
  }

  /**
   * # 获取并解密任意类型数据（异步版本）
   * @param key 存储键名
   * @returns Promise<T | null> 解密并解析后的原始数据
   */
  static async getItemAnyDecrypted<T>(key: string): Promise<T | null> {
    try {
      const storedValue = localStorage.getItem(key)
      if (!storedValue)
        return null

      const decryptedData = await AnyCryptoHelper.decrypt(storedValue)
      return JSON.parse(decryptedData) as T
    }
    catch (error) {
      console.error('解密并解析数据失败:', error)
      // 尝试直接解析（如果数据可能未加密存储）
      try {
        return this.getItemAny<T>(key)
      }
      catch (fallbackError) {
        console.error('直接解析也失败:', fallbackError)
        return null
      }
    }
  }

  /**
   * # 移除存储项
   * @param key 要移除的存储键名
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  /**
   * # 清空所有存储项
   */
  static clear(): void {
    localStorage.clear()
  }
}
