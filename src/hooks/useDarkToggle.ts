/**
 * 切换暗黑模式
 */
import emitter from '@/utils/emitter'

import { useDark, useToggle } from '@vueuse/core'
/** 暗黑模式切换 */
export default function () {
  const isDark = useDark()
  /* 暗黑模式切换 */

  async function toggleDark(event) {
    const x = event.clientX
    const y = event.clientY
    // 画圆
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    // @ts-ignore
    if (document.startViewTransition == undefined) {
      isDark.value = !isDark.value
      useToggle(isDark)
      emitter.emit('toggleTheme', isDark)
      /** 明亮和暗黑模式核心逻辑 */
    } else {
      // @ts-ignore
      const transition = document.startViewTransition(() => {
        /** 明亮和暗黑模式核心逻辑 */
        // 定义图标切换变量(true-月亮，false-太阳)
        isDark.value = !isDark.value
        useToggle(isDark)
        emitter.emit('toggleTheme', isDark)
        /** 明亮和暗黑模式核心逻辑 */
      })
      await transition.ready
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      document.documentElement.animate(
        {
          clipPath: isDark.value ? clipPath : [...clipPath].reverse()
        },
        {
          duration: 300,
          easing: 'ease-in',
          pseudoElement: isDark.value ? '::view-transition-new(root)' : '::view-transition-old(root)'
        }
      )
    }
  }
  return {
    isDark,
    toggleDark
  }
}
