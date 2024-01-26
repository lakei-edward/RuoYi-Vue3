/**
 * 节流函数
 */
export default function () {
  const throttle = (func: Function, delay: number = 1000) => {
    let timer: any = null
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this, arguments)
          timer = null
        }, delay)
      }
    }
  }
  return { throttle }
}
