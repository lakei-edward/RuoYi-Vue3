<template>
  <div>{{ form }}</div>
</template>

<script setup lang="ts">
import { isProxy, isReactive, isReadonly, onMounted, reactive, readonly, toRefs } from 'vue'

// API call
const getArticleInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const article = {
    title: 'Vue3 中使用 defineAsyncComponent 延迟加载组件',
    author: 'lio'
  }
  return article
}

let state = reactive({
  form: {},
  arr: []
})
const copy = readonly(state)

const { form } = toRefs(state)

onMounted(async () => {
  const data = await getArticleInfo()
  state.form = data
})
</script>
