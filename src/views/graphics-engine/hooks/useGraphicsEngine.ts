import type { Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Dnd } from '@antv/x6-plugin-dnd'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Transform } from '@antv/x6-plugin-transform'
import { register } from '@antv/x6-vue-shape'
import { HotKeys, HotKeysDict } from '../config/HotkeysConfig'
import {
  ClipboardOption,
  GraphOption,
  HistoryOption,
  KeyboardOption,
  SelectionOption,
  SnaplineOption,
  TransformOption,
} from '../options/index'
import { Registry } from '../widgets'

export function useGraphicsEngine(container: HTMLElement) {
  const graph = new Graph({ container, ...GraphOption })

  Registry.forEach((item) => {
    register({
      shape: item.nodeShape.toString(),
      width: item.width,
      height: item.height,
      component: item.component,
      data: item,
    })
  })

  if (import.meta.env.DEV) {
    ;(window as any).__x6_instances__ = (window as any).__x6_instances__ || []
    ;(window as any).__x6_instances__.push(graph)
  }

  /** # 拖拽插件 */
  const dnd = new Dnd({
    target: graph as Graph,
    getDragNode: (node: Node) => node.clone({ keepId: true }),
    getDropNode: (node: Node) => node.clone({ keepId: true }),
  })

  graph.use(new Snapline(SnaplineOption)) // 启用对齐线
  graph.use(new Transform(TransformOption)) // 启用变换
  graph.use(new Selection(SelectionOption)) // 启用选择
  graph.use(new Clipboard(ClipboardOption)) // 启用剪贴板
  graph.use(new Keyboard(KeyboardOption)) // 启用键盘
  graph.use(new History(HistoryOption)) // 启用历史

  graph.bindKey(HotKeysDict.getDictByValue(HotKeys.COPY)!.shortcut, () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
  })

  graph.bindKey(HotKeysDict.getDictByValue(HotKeys.PASTE)!.shortcut, () => {
    graph.paste()
  })

  graph.bindKey(HotKeysDict.getDictByValue(HotKeys.UNDO)!.shortcut, () => {
    graph.undo()
  })

  graph.bindKey(HotKeysDict.getDictByValue(HotKeys.REDO)!.shortcut, () => {
    graph.redo()
  })

  graph.bindKey(HotKeysDict.getDictByValue(HotKeys.DELETE)!.shortcut, () => {
    const cells = graph.getSelectedCells()
    graph.removeCells(cells)
  })

  return {
    /** # 画布实例 */
    graphInstance: graph,
    /** # 拖拽插件实例 */
    dndInstance: dnd,
  }
}
