<template>
  <div class="flex items-center">
    <el-icon v-if="isDark" class="text-base" @click="toggleDark">
      <Moon />
    </el-icon>
    <el-icon v-else class="text-base" @click="toggleDark">
      <Sunny />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDarkToggle } from '@/hooks/core'
const { isDark, toggleDark } = useDarkToggle()
</script>
<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
</style>
