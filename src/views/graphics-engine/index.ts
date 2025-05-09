import type { IRegistItem } from './interface/IRegistItem'
import { Graph } from '@antv/x6'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Transform } from '@antv/x6-plugin-transform'
import { register } from '@antv/x6-vue-shape'
import { HotKeys, HotKeysRecord } from './config/HotkeysConfig'
import {
  ClipboardOption,
  GraphOption,
  HistoryOption,
  KeyboardOption,
  SelectionOption,
  SnaplineOption,
  TransformOption,
} from './options/index'
import { Registry } from './widgets'

export default class GraphicsHelper extends Graph {
  /**
   * # 创建画布实例
   * @param container 画布容器
   * @returns 画布实例
   */
  static create(container: HTMLElement): Graph {
    this.registComponent(Registry)
    const graph = new Graph({ container, ...GraphOption })
    if (import.meta.env.DEV) {
      this.createdDevTools(graph)
    }
    this.moduleRegister(graph)
    this.hotKeysRegister(graph)
    return graph
  }

  /**
   * # 创建开发者工具
   * @param instance 画布实例
   */
  private static createdDevTools(instance: Graph): void {
    ;(window as any).__x6_instances__ = (window as any).__x6_instances__ || []
    ;(window as any).__x6_instances__.push(instance)
  }

  /**
   * # 功能模块注册
   * @param instance 画布实例
   * @returns 画布实例
   */
  private static moduleRegister(instance: Graph): Graph {
    instance
      .use(new Snapline(SnaplineOption)) // 启用对齐线
      .use(new Transform(TransformOption)) // 启用变换
      .use(new Selection(SelectionOption)) // 启用选择
      .use(new Clipboard(ClipboardOption)) // 启用剪贴板
      .use(new Keyboard(KeyboardOption)) // 启用键盘
      .use(new History(HistoryOption)) // 启用历史
    return instance
  }

  /**
   * # 快捷键注册
   * @param instance 画布实例
   * @returns 画布实例
   */
  private static hotKeysRegister(instance: Graph): Graph {
    // 复制
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.COPY)!.value, () => {
      const cells = instance.getSelectedCells()
      if (cells.length) {
        instance.copy(cells)
      }
      return false
    })
    // 粘贴
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.PASTE)!.value, () => {
      instance.paste()
    })
    // 撤销
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.UNDO)!.value, () => {
      instance.undo()
    })
    // 重做
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.REDO)!.value, () => {
      instance.redo()
    })
    // 删除
    instance.bindKey(HotKeysRecord.find(item => item.key === HotKeys.DELETE)!.value, () => {
      const cells = instance.getSelectedCells()
      instance.removeCells(cells)
    })
    return instance
  }

  /**
   * 注册自定义组件
   */
  private static registComponent(Registry: IRegistItem[]): void {
    Registry.forEach((item) => {
      register({
        shape: item.nodeShape,
        width: item.width,
        height: item.height,
        component: item.component,
        data: item.defaultOption,
      })
    })
  }
}
