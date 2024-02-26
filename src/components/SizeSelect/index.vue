<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <el-icon style="font-size: 22px"><Operation /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const size = computed(() => appStore.size)
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const sizeOptions = ref([
  { label: '较大', value: 'large' },
  { label: '默认', value: 'default' },
  { label: '稍小', value: 'small' }
])

function handleSetSize(size) {
  proxy.$modal.loading('正在设置布局大小，请稍候...')
  appStore.setSize(size)
  setTimeout('window.location.reload()', 1000)
}
</script>

<style lang="scss" scoped></style>
