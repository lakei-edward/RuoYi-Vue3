/**
 * 防抖函数
 */
export default function () {
  const debounce = (func: Function, delay: number = 1000) => {
    let timer: any = null
    return function (...args: any) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
  return { debounce }
}
