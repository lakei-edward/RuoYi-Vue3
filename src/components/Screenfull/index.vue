<template>
    <el-icon @click="toggle"><FullScreen /></el-icon>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>
