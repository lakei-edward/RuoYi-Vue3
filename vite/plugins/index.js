import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import qiankun from 'vite-plugin-qiankun'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [
    vue(),
    vueJsx(),
    qiankun('warn', {
      useDevMode: true
    }),
    // AutoImport({
    //   resolvers: [
    //     ElementPlusResolver({
    //       // 自动引入修改主题色添加这一行，使用预处理样式
    //       // 不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
    //       importStyle: 'sass'
    //     })
    //   ]
    // }),
    // Components({
    //   resolvers: [
    //     ElementPlusResolver({
    //       // 按需引入修改主题色添加这一行，使用预处理样式
    //       importStyle: 'sass'
    //     })
    //   ]
    // })
  ]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
