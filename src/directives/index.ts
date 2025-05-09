import type { App } from 'vue'

/**
 * # 批量注册指令
 */
export const directivePlugin = {
  install(app: App<Element>) {
    // 动态导入所有指令文件
    const directiveModules = import.meta.glob('./*.ts', { eager: true })

    // 遍历所有指令模块并注册
    Object.entries(directiveModules).forEach(([path, module]) => {
      // 跳过index.ts文件
      if (path === './index.ts')
        return

      // 提取文件名作为指令名称（去除.ts后缀）
      const directiveName = path.replace(/^\.\/(.+)\.ts$/, '$1')

      // 注册指令
      app.directive(directiveName, (module as any).default)
    })
  },
}
