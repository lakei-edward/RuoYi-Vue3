<template>
  <div class="grid grid-cols-4 gap-4 p-16">
    <div v-for="item in 9">{{ item }} <el-button type="primary" @click="debounceClick">Primary</el-button></div>
  </div>
</template>
<script setup lang="ts">
import { useDebounce, useThrottle } from '@/hooks/core'
const { debounce } = useDebounce()
const { throttle } = useThrottle()

const debounceClick = debounce((e: Event) => {
  console.log(e)
})
</script>
