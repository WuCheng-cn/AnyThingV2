export interface ILogoPreferences {
  /** logo是否可见 */
  enable: boolean
  /** logo图片适应方式 */
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  /** logo地址 */
  source: string
}
