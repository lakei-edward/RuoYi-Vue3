<template>
  <div>{{ props.message }}</div>
  <div>{{ show }}</div>
</template>

<script setup lang="ts">
import { toRef, toRefs } from 'vue'

const props = defineProps({
  message: {
    type: String
  },
  show: String
})

// const show = toRefs(props)
const show = toRef(props, 'show')
console.log('🚀 ~ show:', show)
</script>
