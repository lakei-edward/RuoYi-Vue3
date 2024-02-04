<template>
  <div>
    <layer-page
      ref="layerPage"
      :search-layer="searchLayer"
      :operate-layer="operateLayer"
      :display-layer="displayLayer"
      :rightToolbar="false"
    />
  </div>
</template>
<script setup lang="tsx">
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { ref } from 'vue'

const { proxy } = useCurrentInstance()
const { sys_yes_no, xshc_blfs, xshc_cljy, xshc_cbdcjg } = proxy.useDict(
  `xshc_xsly`,
  `xshc_zdxsfl`,
  'xshc_status',
  'sys_yes_no',
  `xshc_blfs`,
  'xshc_cljy',
  `xshc_cbdcjg`,
  `xshc_wtxz`
)

const BASE_URL = '/xshc/xssl'
const formListOther = [
  {
    label: '是否超期',
    model: 'sfcq',
    component: 'FormSelect',
    dict: sys_yes_no,
    width: 260
  },
  {
    label: '办理方式',
    model: 'blfs',
    component: 'FormSelect',
    dict: xshc_blfs,
    width: 260
  },
  {
    label: '办理日期',
    model: 'blrq',
    type: 'daterange',
    component: 'FormDate' /* 年月日 */,
    startTimeLabel: 'blrqStartTime',
    endTimeLabel: 'blrqEndTime',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    width: 260
  },
  {
    label: '审核日期',
    model: 'shrq',
    type: 'daterange',
    component: 'FormDate' /* 年月日 */,
    startTimeLabel: 'shrqStartTime',
    endTimeLabel: 'shrqEndTime',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    width: 260
  },
  {
    label: '办结日期',
    model: 'bjrq',
    type: 'daterange',
    component: 'FormDate' /* 年月日 */,
    startTimeLabel: 'bjrqStartTime',
    endTimeLabel: 'bjrqEndTime',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    width: 260
  },
  {
    label: '初步调查结果',
    model: 'cbdcjg',
    component: 'FormSelect',
    dict: xshc_cbdcjg,
    width: 260
  },
  {
    label: '办理结果',
    model: 'bljg',
    component: 'FormSelect',
    dict: xshc_cbdcjg,
    width: 260
  },
  {
    label: '处理建议',
    model: 'cljy',
    component: 'FormSelect',
    dict: xshc_cljy,
    width: 260
  },
  {
    label: '处理结果',
    model: 'cljg',
    component: 'FormSelect',
    dict: xshc_cljy,
    width: 260
  },
  {
    label: '问题性质',
    model: 'wtxz',
    component: 'FormTreeSelect',
    treeUrl: '/xshc/xssl/parents',
    width: 260,
    multiple: true
  }
]
let allSearchForm = [...formListOther]

const searchLayer = ref({
  searchName: '查询',
  resetName: '重置',
  params: {},
  form: allSearchForm,
  //自定义搜索事件
  beforeSearch: searchCallback
})

//在自定义查询事件中，将params的值添加一个属性
//这里的params与LayerPage子组件的params引用的是同一个变量地址
function searchCallback(params) {
  params.wtxz = params.wtxz && params.wtxz.join(',')
}

const operateLayer = ref({
  search: {
    size: 'mini',
    label: '查看',
    params: {},
    show: 'table', //展示到表格操作列中
    method: 'get',
    url: `${BASE_URL}/getXshcDetail`,
    mode: {
      type: 'RouterPage',
      detail: true,
      router: {
        path: '/xscx/search/index/',
        query: {
          mode: 'search',
          type: 'xscx',
          row_status: ''
        }
      }
    }
  }
})
const displayLayer = ref({
  params: {},
  url: `${BASE_URL}/xscxList`,
  dblclick: false, // 双击可查看
  data: [
    {
      prop: 'xsbh',
      label: '线索编号'
    },
    {
      prop: 'bfydx',
      label: '被反映对象'
    },
    {
      prop: 'fyr',
      label: '反映人姓名'
    },
    {
      prop: 'zdxsflName',
      label: '重点线索分类'
    },
    {
      prop: 'slrq',
      label: '受理日期'
    },
    {
      prop: 'blqx',
      label: '办理期限',
      hidden: true
    },
    {
      prop: 'cbdwName',
      label: '承办单位'
    },
    {
      prop: 'blfsName',
      label: '办理方式'
    },
    {
      prop: 'statusName',
      label: '状态'
    },
    {
      prop: 'operate', // 当该列为操作列时，该属性为“operate”必传
      label: '操作',
      operate: true, // 当operateLayer中show字段为true时，自动把该操作放入表格列中
      width: 200
    }
  ]
})
</script>
