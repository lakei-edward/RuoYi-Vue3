import { onDeactivated, onUnmounted, ref } from 'vue'

/**
 * 倒计时
 */
export default function () {
  const count = ref(0)
  let timer: any = null
  const countDown = (second = 60, ck = () => {}) => {
    if (count.value === 0 && timer === null) {
      ck()
      count.value = second
      timer = setInterval(() => {
        count.value--
        if (count.value === 0) {
          clearInterval(timer)
          timer = null
        }
      }, 1000)
    }
  }
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  onDeactivated(() => {
    timer && clearInterval(timer)
  })

  return {
    count,
    countDown
  }
}
