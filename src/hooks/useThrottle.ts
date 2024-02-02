/**
 * 节流函数
 */
export default function () {
  const throttle = (func: Function, delay: number = 1000) => {
    let wait: boolean = false
    return function () {
      if (wait) return
      func.apply(this, arguments)
      wait = true
      setTimeout(() => {
        wait = false
      }, delay)
    }
  }
  return { throttle }
}
