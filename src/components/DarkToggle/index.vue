<template>
  <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" @change="toggleDark" />
</template>
<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDarkToggle } from '@/hooks/core'
const { isDark, toggleDark } = useDarkToggle()
</script>
