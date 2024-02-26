<template>
  <div class="flex items-center">
    <el-icon v-if="isDark" class="text-base" @click="toggleDark">
      <Moon />
    </el-icon>
    <el-icon v-else class="text-base mr-2" @click="toggleDark">
      <Sunny />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDarkToggle } from '@/hooks/core'
const { isDark, toggleDark } = useDarkToggle()
</script>
