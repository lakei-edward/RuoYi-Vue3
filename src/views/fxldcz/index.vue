<template>
  <div class="p-10">
    <layer-page
      ref="layerPage"
      :search-layer="searchLayer"
      :operate-layer="operateLayer"
      :display-layer="displayLayer"
      :loading="false"
    />
  </div>
</template>
<script setup lang="tsx">
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { ref } from 'vue'
import { getToken } from '@/utils/auth'

const { proxy } = useCurrentInstance()
const { sys_normal_disable } = proxy.useDict('sys_normal_disable', 'sys_user_sex')

const searchLayer = ref({
  labelAfter: ':',
  labelWidth: '100px',
  size: 'mini',
  formWidth: 317,
  params: {
    deptLeader2: '1'
  },
  searchName: '查询',
  resetName: '重置',
  form: [
    {
      label: '科室负责人',
      model: 'deptLeader',
      regExp: 'english',
      component: 'FormInput' //内置组件
    },
    {
      label: '科室负责人',
      model: 'deptLeader2',
      dict: sys_normal_disable,
      component: 'FormSelect' //内置组件
    },
    {
      label: '科室负责人',
      model: 'deptLeader3',
      component: 'FormTextarea' //内置组件
    },
    {
      label: '附件',
      model: 'fileId',
      component: 'FormUpdate',
      width: 565,
      icon: 'el-icon-receiving',
      fileListLabel: 'fileInfo',
      multiple: false,
      buttonLabel: '上传图片',
      upload: {
        action: `${import.meta.env.VITE_APP_BASE_API}/minio/upload`,
        headers: {
          Authorization: getToken()
        },
        reg: /^.*\.(?:jpg|jpeg|png)$/i,
        size: 5,
        textLabel: "请上传 大小不超过 <span style='color:#ff0078'>5MB</span> 格式为 jpg/jpeg/png的图片",
        sizeLabel: '上传文件大小不能超过5MB'
      }
    },
    {
      label: '预警时间',
      type: 'daterange',
      startTimeLabel: 'startTimeYJ',
      endTimeLabel: 'endTimeYJ',
      component: 'FormDate' //内置组件
    }
  ]
})

const operateLayer = ref({})
const displayLayer = ref({})
</script>
