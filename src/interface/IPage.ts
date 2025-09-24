import type { AnyDataBaseEntity } from '@arayui/core'

export interface IPage<T extends AnyDataBaseEntity> {
  [key: string]: T[] | any
}
