/**
 * v-hasRole 角色权限处理
 * Copyright (c) 2019 ruoyi
 */

import useUserStore from '@/store/modules/user'

export default {
  mounted(el, binding, vnode) {
    const { value } = binding
    const super_admin = 'admin'
    const roles = useUserStore().roles
    console.log('🚀 ~ mounted ~ roles:', roles)

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value
      console.log('🚀 ~ mounted ~ roleFlag:', roleFlag)

      const hasRole = roles.some(role => {
        console.log(super_admin === role)
        console.log("🚀 ~ hasRole ~ role:", role)
        console.log("🚀 ~ hasRole ~ super_admin:", super_admin)
        return super_admin === role || roleFlag.includes(role)
      })

      console.log('🚀 ~ mounted ~ hasRole:', hasRole)
      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值`)
    }
  }
}
