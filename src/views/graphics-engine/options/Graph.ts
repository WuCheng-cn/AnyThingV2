// import {NodeView} from '@antv/x6'
import type { Cell, Graph, Node } from '@antv/x6'
import type { Options } from '@antv/x6/lib/graph/options'
import type { IWidgetUnknown } from '../interface/IWidget'

export const GraphOption: Partial<Options.Manual> = {
  // 启用滚轮缩放画布
  mousewheel: {
    enabled: true,
    modifiers: ['ctrl', 'meta'],
  },
  // 启用拖拽
  panning: {
    enabled: true,
    eventTypes: ['rightMouseDown'],
  },
  // 自动调整画布大小
  autoResize: true,
  // 画布背景颜色
  background: {
    color: 'var(--body-color)',
  },
  grid: {
    // 网格大小
    size: 16,
    // 渲染网格背景 默认点状
    visible: true,
  },
  embedding: {
    enabled: true,
    findParent({ node }: { node: Node }): Cell[] {
      const bbox = node.getBBox()
      return (this as unknown as Graph).getNodes().filter((node: Cell) => {
        const data = node.getData<IWidgetUnknown>()
        if (data?.isParent) {
          const targetBBox = node.getBBox()
          return bbox.isIntersectWithRect(targetBBox)
        }
        return false
      })
    },
  },
  highlighting: {
    embedding: {
      name: 'stroke',
      args: {
        padding: -1,
        attrs: {
          stroke: 'var(--colorPrimary)',
          strokeWidth: 2,
          strokeDasharray: '6 4',
        },
      },
    },
  },
  // translating:{
  //   /**
  //    * # 限制节点移动范围
  //    * @param CellView 节点实例
  //    * @returns 返回限制后的范围
  //    * @description 限制节点在画布内移动
  //    */
  //   restrict:(CellView:CellView):Rectangle.RectangleLike=>{
  //     //节点移动在画布中保持的最小宽/高
  //     const minSize = 50
  //     // 判断节点在即将完全移出画布时，禁止移动
  //     const { x, y, width, height } = CellView.getBBox()
  //     const { width: graphWidth, height: graphHeight } = CellView.graph.getGraphArea()
  //     return{
  //       x: minSize - width ,
  //       y: minSize - height,
  //       width: graphWidth + 2*(width - minSize),
  //       height: graphHeight + 2*(height - minSize),
  //     }

  //   },
  // }
}
