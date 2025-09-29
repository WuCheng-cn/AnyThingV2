/** # 加密解密辅助类 🔐 */
export abstract class AnyCryptoHelper {
  /** # Web Crypto API支持标志 */
  private static readonly isWebCryptoSupported = 'crypto' in window && 'subtle' in window.crypto

  /** # 用于加密的算法名称 */
  private static readonly algorithmName = 'AES-GCM'

  /** # 加密密钥缓存 */
  private static secretKey: CryptoKey | null = null

  /** # 初始化向量长度（字节） */
  private static readonly ivLength = 12

  /**
   * # 生成或获取加密密钥
   * @private
   * @returns Promise<CryptoKey> 加密密钥
   */
  private static async getEncryptionKey(): Promise<CryptoKey> {
    if (!this.secretKey) {
      // 尝试从localStorage获取密钥或生成新密钥
      const storedKey = localStorage.getItem('__encryption_key__')
      if (storedKey) {
        // 解析存储的密钥（实际项目中应考虑更安全的密钥存储方式）
        const keyData = JSON.parse(storedKey)
        const keyBuffer = Uint8Array.from(atob(keyData.key), c => c.charCodeAt(0))

        this.secretKey = await window.crypto.subtle.importKey(
          'raw',
          keyBuffer,
          { name: this.algorithmName },
          false,
          ['encrypt', 'decrypt'],
        )
      }
      else {
        // 生成新的加密密钥
        this.secretKey = await window.crypto.subtle.generateKey(
          { name: this.algorithmName, length: 256 },
          true,
          ['encrypt', 'decrypt'],
        )

        // 导出密钥并存储（实际项目中应考虑更安全的密钥存储方式）
        const exportedKey = await window.crypto.subtle.exportKey('raw', this.secretKey)
        const keyString = btoa(String.fromCharCode(...new Uint8Array(exportedKey)))
        localStorage.setItem('__encryption_key__', JSON.stringify({ key: keyString }))
      }
    }
    return this.secretKey
  }

  /**
   * # 加密数据
   * @param data 要加密的数据
   * @returns Promise<string> 加密后的字符串
   */
  static async encrypt(data: string): Promise<string> {
    if (this.isWebCryptoSupported) {
      const key = await this.getEncryptionKey()
      const iv = window.crypto.getRandomValues(new Uint8Array(this.ivLength))
      const encoder = new TextEncoder()
      const dataBuffer = encoder.encode(data)

      const encryptedData = await window.crypto.subtle.encrypt(
        { name: this.algorithmName, iv },
        key,
        dataBuffer,
      )

      // 将IV和加密数据合并为一个字符串存储
      const result = new Uint8Array(iv.length + encryptedData.byteLength)
      result.set(iv)
      result.set(new Uint8Array(encryptedData), iv.length)

      return btoa(String.fromCharCode(...result))
    }
    else {
      // 降级方案：使用base64编码
      return this.base64Encode(data)
    }
  }

  /**
   * # 解密数据
   * @param encryptedData 加密的数据
   * @returns Promise<string> 解密后的原始数据
   */
  static async decrypt(encryptedData: string): Promise<string> {
    if (this.isWebCryptoSupported) {
      const key = await this.getEncryptionKey()

      // 解码base64并分离IV和加密数据
      const rawData = atob(encryptedData)
      const dataView = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; i++) {
        dataView[i] = rawData.charCodeAt(i)
      }

      const iv = dataView.slice(0, this.ivLength)
      const encryptedBuffer = dataView.slice(this.ivLength)

      const decryptedData = await window.crypto.subtle.decrypt(
        { name: this.algorithmName, iv },
        key,
        encryptedBuffer,
      )

      const decoder = new TextDecoder()
      return decoder.decode(decryptedData)
    }
    else {
      // 降级方案：使用base64解码
      return this.base64Decode(encryptedData)
    }
  }

  /**
   * # Base64编码（降级方案）
   * @param data 要编码的数据
   * @returns string 编码后的字符串
   */
  static base64Encode(data: string): string {
    try {
      return btoa(encodeURIComponent(data))
    }
    catch (error) {
      console.error('Base64编码失败:', error)
      return data
    }
  }

  /**
   * # Base64解码（降级方案）
   * @param encodedData 编码的数据
   * @returns string 解码后的原始数据
   */
  static base64Decode(encodedData: string): string {
    try {
      return decodeURIComponent(atob(encodedData))
    }
    catch (error) {
      console.error('Base64解码失败:', error)
      return encodedData
    }
  }

  /**
   * # 简单加密（同步版本，仅使用Base64）
   * @param data 要加密的数据
   * @returns string 加密后的字符串
   */
  static encryptSync(data: string): string {
    return this.base64Encode(data)
  }

  /**
   * # 简单解密（同步版本，仅使用Base64）
   * @param encryptedData 加密的数据
   * @returns string 解密后的原始数据
   */
  static decryptSync(data: string): string {
    return this.base64Decode(data)
  }
}
