import { AnyDictionaryHelper } from '@/anyThing/helper/AnyDictionaryHelper'

/**
 * graph 绑定事件
 * ctrl + c 剪切节点/边
 * ctrl + v 粘贴节点/边
 * ctrl + z 上一步
 * ctrl + shift + z 下一步
 * Mac系统的 ctrl 键是 meta
 * # 判断Mac/Windows下的控制按钮
 */
const isMac = navigator.userAgent.includes('Mac')
const command = isMac ? 'meta' : 'ctrl'

/**
 * # 快捷键枚举
 */
export enum HotKeys {
  /** # 复制 */
  COPY = 'c',
  /** # 粘贴 */
  PASTE = 'v',
  /** # 撤销 */
  UNDO = 'z',
  /** # 重做 */
  REDO = 'shift+z',
  /** # 删除 */
  DELETE = 'delete',
}

/**
 * # 快捷键字典
 */
export const HotKeysDict = AnyDictionaryHelper.createDictionaryArray([
  { value: HotKeys.COPY, label: '复制', shortcut: `${command}+${HotKeys.COPY}` },
  { value: HotKeys.PASTE, label: '粘贴', shortcut: `${command}+${HotKeys.PASTE}` },
  { value: HotKeys.UNDO, label: '撤销', shortcut: `${command}+${HotKeys.UNDO}` },
  { value: HotKeys.REDO, label: '重做', shortcut: `${command}+${HotKeys.REDO}` },
  { value: HotKeys.DELETE, label: '删除', shortcut: `${HotKeys.DELETE}` },
])
