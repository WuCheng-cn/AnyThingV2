import type { RouteLocationNormalized } from 'vue-router'

export interface ITabDefinition extends RouteLocationNormalized {
  /** # 标签页的key */
  key: string
}
