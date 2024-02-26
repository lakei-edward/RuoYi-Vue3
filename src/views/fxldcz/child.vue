<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let msg = ref('This is a TSX component in Vue 3!')

function setMsg() {
  msg.value = '123'
}
defineExpose({
  msg,
  setMsg
})
</script>
