import LayerPage from './main/LayerPage.vue'
import LayerForm from './main/LayerForm'
import LayerFormItem from './main/LayerFormItem.vue'
import ChoosePerson from './components/ChoosePerson.vue'
// import Dict from './dict/index'
import $util from './plugin/$util'
const install = function (app, opts = {}) {
  if (opts) {
    if (!(opts.http instanceof Function)) throw Error('ry-layer-page http is not a function!')
    // 处理全局注册
    handleGlobalRegister(app, opts)
  }
}

// 处理全局注册
function handleGlobalRegister(app, opts) {
  // 注册全局组件
  app.component('ChoosePerson', ChoosePerson)
  app.component('LayerPage', LayerPage)
  app.component('LayerForm', LayerForm)
  app.component('LayerFormItem', LayerFormItem)
  // 全局注册使用
  app.config.globalProperties.$request = opts.http
  app.config.globalProperties.$getDicts = opts.dict
  // 注册全局的工具函数
  for (let i in $util) {
    app.config.globalProperties[i] = $util[i]
  }
}

export default { install }
