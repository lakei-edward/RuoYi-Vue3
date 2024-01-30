<template>
  <div class="p-28">
    <el-input v-model="show"></el-input>
    <Test message="Hello from TSX component!" :show="show"></Test>
    <Child message="Hello from TSX component!" :show="show"></Child>
  </div>
</template>
<script setup lang="tsx">
import Test from './test/test.vue'
import Child from './test/child'
import { ref } from 'vue'
const show = ref('werwer')
</script>
