import './public-path'

import { createApp } from 'vue'

import Cookies from 'js-cookie'

import '@/assets/styles/tailwind.css'

import '@/assets/styles/index.scss' // global css

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

// 修改ElementPlus命名空间引入
// import '@/styles/index.scss'

import App from './App.vue'
import store from './store'
import router from './router'
import directive from './directive' // directive

// 若依页面分层工具
import ryLayerPage from '@/packages/index.js'
import request from '@/utils/request'

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'

// 分页组件
import Pagination from '@/components/Pagination/index.vue'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar/index.vue'
// 富文本组件
import Editor from '@/components/Editor/index.vue'
// 文件上传组件
import FileUpload from '@/components/FileUpload/index.vue'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload/index.vue'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview/index.vue'
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect/index.vue'
// 字典标签组件
import DictTag from '@/components/DictTag/index.vue'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import useSettingsStore from '@/store/modules/settings'

function globalRegistry(app) {
  // 全局方法挂载
  app.config.globalProperties.useDict = useDict
  app.config.globalProperties.download = download
  app.config.globalProperties.parseTime = parseTime
  app.config.globalProperties.resetForm = resetForm
  app.config.globalProperties.handleTree = handleTree
  app.config.globalProperties.addDateRange = addDateRange
  app.config.globalProperties.selectDictLabel = selectDictLabel
  app.config.globalProperties.selectDictLabels = selectDictLabels

  // 全局组件挂载
  app.component('DictTag', DictTag)
  app.component('Pagination', Pagination)
  app.component('TreeSelect', TreeSelect)
  app.component('FileUpload', FileUpload)
  app.component('ImageUpload', ImageUpload)
  app.component('ImagePreview', ImagePreview)
  app.component('RightToolbar', RightToolbar)
  app.component('Editor', Editor)
  app.component('svg-icon', SvgIcon)

  // 使用element-plus 并且设置全局的大小
  app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
  })
  app.use(router)
  app.use(store)
  app.use(plugins)
  app.use(elementIcons)
  app.use(ryLayerPage, {
    http: request
  })

  directive(app)
}

let microApp: any
/* 独立打开时 */
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  const app = createApp(App)
  // 全局方法挂载
  globalRegistry(app)
  app.mount('#app')
} else {
  /* 当作微应用时 */
  renderWithQiankun({
    mount(props) {
      microApp = createApp(App)
      // 全局方法挂载
      globalRegistry(microApp)
      const { container, data } = props
      useSettingsStore().setMicroAppInfo(data)
      microApp.mount(container?.querySelector('#app'))
    },
    bootstrap(props: any) {},
    unmount(props: any) {
      microApp?.unmount()
    }
  })
}
