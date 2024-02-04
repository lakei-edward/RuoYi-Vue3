<template>
  <el-tree-select
    v-model="form[model]"
    :data="deptOptions"
    :props="dataProps"
    :value-key="valueKey"
    :style="setStyle"
    :placeholder="placeholder"
    :filterable="filterable"
    :multiple="multiple"
    :show-checkbox="showCheckbox"
    :clearable="clearable"
    check-strictly
  />
</template>
<script setup lang="ts" name="FormTreeSelect">
import { ref, computed, toRefs, onMounted } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
const { proxy } = useCurrentInstance()

const deptOptions = ref([])

const props = defineProps({
  form: {
    type: Object,
    default() {
      return {}
    }
  },
  treeUrl: {
    type: String,
    default: '/system/dept/treeselect'
  },
  model: {
    type: String,
    default: ''
  },
  dataProps: {
    type: String,
    default() {
      return { value: 'id', label: 'label', children: 'children' }
    }
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  placeholder: {
    type: String,
    default: '请选择归属部门'
  },
  width: {
    type: [Number, String]
  },
  formWidth: {
    type: Number
  },
  params: {
    type: Object
  },
  filterable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  clearable: Boolean,
  callback: Function
})

const { width, model, form, formWidth, treeUrl, params, callback } = toRefs(props)

const setStyle = computed(() => {
  return {
    width: width!.value
      ? typeof width!.value === 'string'
        ? width!.value
        : width!.value + 'px'
      : formWidth!.value + 'px'
  }
})

onMounted(() => {
  getTreeselect()
})

/** 查询部门下拉树结构 */
async function getTreeselect() {
  const depts = sessionStorage.getItem('depts')
  if (!depts) {
    if (proxy.$request) {
      let { data } = await proxy.$request({
        url: treeUrl.value,
        methods: 'get',
        params: params!.value
      })

      // 可以在回调函数中处理数据后再渲染
      if (callback!.value) data = callback!.value(data)

      // 缓存数据
      sessionStorage.setItem('depts', JSON.stringify(data))
      deptOptions.value = JSON.parse(data)
    }
  } else {
    deptOptions.value = JSON.parse(depts)
  }
}
</script>
