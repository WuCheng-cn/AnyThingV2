<template>
  <div ref="PositionProviderRef" class="w-full h-full" :style="positionProviderStyle">
    <transition name="any-dialog" appear>
      <div
        v-if="!isClose"
        ref="AnyModelRef"
        class="fixed flex flex-col bg-white rounded-lg shadow-lg select-none overflow-hidden transition-all duration-500 transform scale-100 z-[9999]"
        :class="{ 'w-screen h-screen left-0 top-0 bottom-0 rounded-none z-[99999]': isFullScreen }"
        :style="modalPositionStyle"
        @mousedown="handleModelClick"
      >
        <!-- 标题栏 -->
        <div
          class="h-10 bg-gray-100 rounded-t-lg grid grid-cols-3 items-center px-2.5 cursor-grab active:cursor-grabbing"
          @mousedown="startDrag"
        >
          <!-- 控制按钮区域 -->
          <div class="flex space-x-2">
            <button
              class="w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white"
              @click="onClose()"
            >
              <X class="w-3.5 h-3.5" />
            </button>
            <button
              class="w-5 h-5 flex items-center justify-center rounded-full hover:bg-yellow-500 hover:text-white"
              @click="onMinimize()"
            >
              <Minus class="w-3.5 h-3.5" />
            </button>
            <button
              class="w-5 h-5 flex items-center justify-center rounded-full hover:bg-green-500 hover:text-white"
              @click="onMaximize()"
            >
              <Maximize class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- 标题 -->
          <div class="text-sm font-medium text-gray-700 text-center">
            {{ title || '弹窗标题' }}
          </div>

          <!-- 占位 -->
          <div />
        </div>

        <!-- 主体内容 -->
        <div class="flex-1 p-2.5 overflow-hidden">
          <slot />
        </div>

        <!-- 底部 -->
        <div class="p-2.5">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { AnyResizeControllerHelper } from '@/anyThing/helper/AnyResizeControllerHelper'
import useAppStore from '@/stores/modules/useAppStore'
import { Maximize, Minus, X } from 'lucide'
import { computed, nextTick, onMounted, ref, toRefs } from 'vue'

const props = defineProps<{
  title?: string
  /** # 挂载后的钩子 */
  afterMounted?: (q: any) => void
  /** # 关闭前的钩子 */
  beforClose?: () => void
  /** # 最小化前的钩子 */
  beforMinimize?: () => void
}>()

const emits = defineEmits(['onAfterLeave'])

const { clickedPosition, setHighestIndex } = useAppStore()
const { highestIndex } = toRefs(useAppStore())

const PositionProviderRef = ref<HTMLElement>()
const AnyModelRef = ref<HTMLElement>()
const isFullScreen = ref(false)
const isClose = ref(false)
const isMinimized = ref(false)

// CSS变量
const cssVars = ref({
  startX: '0px',
  startY: '0px',
  minimizeToX: '0px',
  minimizeToY: '0px',
  scaleX: '1',
  scaleY: '1',
})

// 计算属性：position provider的样式
const positionProviderStyle = computed(() => ({
  '--startX': cssVars.value.startX,
  '--startY': cssVars.value.startY,
  '--minimizeToX': cssVars.value.minimizeToX,
  '--minimizeToY': cssVars.value.minimizeToY,
  '--scaleX': cssVars.value.scaleX,
  '--scaleY': cssVars.value.scaleY,
}))

// 计算属性：对话框位置样式
const modalPositionStyle = computed(() => {
  if (isMinimized.value) {
    return {
      padding: '0',
      overflow: 'hidden',
      left: `var(--minimizeToX)`,
      bottom: `calc(100vh - var(--minimizeToY))`,
      pointerEvents: 'none' as const,
      transform: `scale(var(--scaleX), var(--scaleY))`,
      transformOrigin: 'left bottom',
      opacity: '0',
    }
  }

  const top = '12vh'
  const left = '20vw'

  return {
    top,
    left,
    width: `calc(100vw - 2 * ${left})`,
    height: `calc(100vh - 2 * ${top})`,
  }
})

// 拖拽相关数据
const dragData = ref({
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  transition: '',
})

function handleModelClick() {
  setHighestIndex(AnyModelRef.value as HTMLElement)
}

async function onClose() {
  if (props.beforClose) {
    props.beforClose()
  }
  isClose.value = true
  setTimeout(() => {
    emits('onAfterLeave')
  }, 1000)
}

async function onMinimize() {
  if (props.beforMinimize) {
    props.beforMinimize()
  }
  isMinimized.value = true
}

function setCssProperty() {
  if (clickedPosition) {
    cssVars.value.startX = `${clickedPosition.x}px`
    cssVars.value.startY = `${clickedPosition.y}px`
  }

  nextTick(async () => {
    const scaleRateX = 216 / 1920
    const scaleRateY = 150 / 1080
    cssVars.value.scaleX = `${scaleRateX}`
    cssVars.value.scaleY = `${scaleRateY}`
    cssVars.value.minimizeToX = `${0}px`
    cssVars.value.minimizeToY = `${0}px`
  })
}

function onMaximize() {
  isFullScreen.value = !isFullScreen.value
}

function mousemove(e: MouseEvent) {
  let { clientX, clientY } = e

  // 限制移动范围
  clientX = Math.max(0, Math.min(clientX, window.innerWidth))
  clientY = Math.max(0, Math.min(clientY, window.innerHeight))

  const x = clientX - dragData.value.offsetX
  const y = clientY - dragData.value.offsetY

  if (AnyModelRef.value) {
    AnyModelRef.value.style.width = `${dragData.value.width}px`
    AnyModelRef.value.style.height = `${dragData.value.height}px`
    AnyModelRef.value.style.top = `${y}px`
    AnyModelRef.value.style.left = `${x}px`
    AnyModelRef.value.style.transition = 'unset'
    AnyModelRef.value.style.zIndex = String(highestIndex.value)
  }
}

function startDrag(e: MouseEvent) {
  if (isFullScreen.value)
    return

  const element = AnyModelRef.value
  if (!element)
    return

  const { width, height, left, top } = element.getBoundingClientRect()
  const { clientX, clientY } = e

  dragData.value.transition = element.style.transition
  dragData.value.width = width
  dragData.value.height = height
  dragData.value.offsetX = clientX - left
  dragData.value.offsetY = clientY - top

  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', stopDrag)
}

function stopDrag() {
  if (AnyModelRef.value) {
    AnyModelRef.value.style.transition = dragData.value.transition
  }
  document.removeEventListener('mousemove', mousemove)
  document.removeEventListener('mouseup', stopDrag)
}

// 创建调整尺寸控制器实例并保存引用
let _resizeController: AnyResizeControllerHelper | null = null

onMounted(async () => {
  if (props.afterMounted && AnyModelRef.value) {
    props.afterMounted(AnyModelRef.value)
  }

  setCssProperty()

  if (AnyModelRef.value) {
    setHighestIndex(AnyModelRef.value)
    _resizeController = new AnyResizeControllerHelper(AnyModelRef.value)
  }
})
</script>

<style scoped>
/* 动画效果 */
.any-dialog-enter-active {
  animation: dialog-enter 1s;
}

.any-dialog-leave-active {
  animation: dialog-enter 0.5s reverse;
}

@keyframes dialog-enter {
  0% {
    position: fixed;
    width: 10px;
    height: 10px;
    padding: 0;
    overflow: hidden;
    background-color: white;
    top: calc(var(--startY) - 5px);
    left: calc(var(--startX) - 5px);
    pointer-events: none;
  }

  30% {
    position: fixed;
    width: 3px;
    padding: 0;
    overflow: hidden;
    left: calc(var(--startX) - 5px);
    pointer-events: none;
  }
}
</style>
