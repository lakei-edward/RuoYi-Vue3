/**
 * 切换暗黑模式
 */
import { useDark, useToggle } from '@vueuse/core'
/** 暗黑模式切换 */
export default function () {
  const isDark = useDark()
  /* 暗黑模式切换 */
  function toggleDark(): void {
    useToggle(isDark)
  }
  return {
    isDark,
    toggleDark
  }
}
