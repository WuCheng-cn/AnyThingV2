# Vue 指令系统

## 自动注册指令机制

本项目实现了一个自动注册 Vue 指令的机制，无需手动导入和注册每个指令。这种方式使得添加新指令变得非常简便，只需在 `src/directives` 目录下创建新文件即可。

## 工作原理

项目通过 Vite 的 `import.meta.glob` API 自动导入和注册指令，核心实现位于 `src/directives/index.ts` 文件：

```typescript
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
```

## 指令文件规范

为了使这个自动注册机制正常工作，所有指令文件需要遵循以下规范：

1. **命名规则**：文件名将直接作为指令名，例如 `permission.ts` 文件将注册为 `v-permission` 指令
2. **导出方式**：每个指令文件必须使用 `export default` 导出一个指令对象
3. **指令结构**：导出的对象应符合 Vue 的 `ObjectDirective` 类型定义

## 示例指令文件

一个典型的指令文件结构如下（以 `permission.ts` 为例）：

```typescript
import type { ObjectDirective } from 'vue'
import { usePermissionStore } from '@/stores/modules/usePermissionStore'

/**
 * # 权限指令
 */
export default {
  mounted(el: HTMLElement, binding) {
    const { value } = binding
    const { hasPermission } = usePermissionStore()
    if (!hasPermission(value)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  },
} as ObjectDirective
```

## 如何添加新指令

添加新指令只需三个简单步骤：

1. 在 `src/directives` 目录下创建新的 `.ts` 文件，例如 `highlight.ts`
2. 实现指令逻辑并使用 `export default` 导出
3. 无需修改任何其他文件，系统将自动注册该指令为 `v-highlight`

## 指令使用方式

注册的指令可在任何组件模板中直接使用：

```vue
<template>
  <button v-permission="'admin'">
    管理员操作
  </button>
  <div v-lazyResize="handleResize">
    自动监听调整大小
  </div>
</template>
```

## 优势

这种自动注册指令的方式有以下优势：

1. **可扩展性**：添加新指令不需要修改现有代码
2. **组织清晰**：每个指令都有独立的文件，便于维护
3. **按需加载**：结合 Vite 的特性，支持代码分割和按需加载
4. **减少错误**：避免手动注册时可能出现的遗漏或命名错误

通过这种机制，项目可以轻松管理和扩展自定义指令，提高开发效率和代码质量。
