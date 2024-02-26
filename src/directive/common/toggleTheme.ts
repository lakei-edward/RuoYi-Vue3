import emitter from '@/utils/emitter'
import { useDarkToggle } from '@/hooks/core'
import { toValue } from 'vue'

export default {
  mounted(el, { value, arg, modifiers }) {
    /* 修饰符，针对不同类型的样式修改，不止background */
    const mode = Object.keys(modifiers)

    const { isDark } = useDarkToggle()

    /* 亮色，暗色 */
    const [light, dark] = value

    let toggleMode
    ;(function setStyle(isDark) {
      const themeColor = toValue(isDark) ? light : dark
      if (arg === 'svg') {
        el.setAttribute('fill', themeColor)
      } else {
        if (mode.length > 0) {
          el.style[mode[0]] = themeColor
        } else {
          el.style.background = themeColor
        }
      }
      toggleMode = setStyle
    })(isDark)

    emitter.on('toggleTheme', val => {
      toggleMode(val)
    })
  }
}
