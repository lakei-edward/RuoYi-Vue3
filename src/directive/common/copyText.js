/**
 * v-copyText 复制文本内容
 * Copyright (c) 2022 ruoyi
 */

import { onBeforeUnmount, toValue } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  mounted(el, { value, arg, modifiers }) {
    el.$arg = arg || 'success'
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        ElMessage({
          message: '复制成功',
          type: el.$arg
        })
      }
      document.body.removeChild(textarea)
    }
    el.addEventListener('dblclick', el.handler)
  },
  updated(el, { value }) {
    el.$value = value
  },
  beforeUnmount(el, { value, arg }) {
    el.removeEventListener('dblclick', el.handler)
  }
}
