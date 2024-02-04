<template>
  <span>
    <el-input
      v-model="form[model]"
      :placeholder="placeholder"
      :style="setStyle"
      :maxlength="maxlength"
      :minlength="minlength"
      :show-word-limit="showWordLimit"
      :clearable="clearable"
      :show-password="showPassword"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      @input="handleOnInput(form[model])"
      @click.native="click ? click(form, ikey) : ''"
      @change="change ? change($event, ikey) : ''"
      @blur="blur ? blur(form, ikey) : ''"
      @focus="focus ? focus(form, ikey) : ''"
    />
    <el-button v-if="isPhoneCode" @click="sendCode" :disabled="setDisabled">
      <template v-if="!isSend"> {{ sendTitle }} </template>
      <template v-else> {{ fre }}</template>
    </el-button>
  </span>
</template>
<script setup lang="ts" name="FormInput">
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue'
import REGEXP from '../plugin/regExp'

const { proxy } = useCurrentInstance()

const props = defineProps({
  form: {
    type: Object,
    default: () => {}
  },
  code: {
    type: Object,
    default: () => {}
  },
  model: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  sendTitle: {
    type: String,
    default: '发送验证码'
  },
  size: {
    type: String
  },
  ikey: {
    type: String
  },
  regExp: {
    type: String
  },
  prefixIcon: {
    type: String
  },
  suffixIcon: {
    type: String
  },
  maxlength: {
    type: [Number, String]
  },
  minlength: {
    type: [Number, String]
  },
  width: {
    type: [Number, String]
  },
  formWidth: Number,
  showWordLimit: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  click: Function,
  change: Function,
  regExpCallback: Function,
  blur: Function,
  focus: Function,
  isPhoneCode: Boolean
})

const {
  form,
  code,
  model,
  placeholder,
  size,
  ikey,
  regExp,
  prefixIcon,
  suffixIcon,
  maxlength,
  minlength,
  width,
  formWidth,
  showWordLimit,
  clearable,
  showPassword,
  disabled,
  readonly,
  autofocus,
  click,
  change,
  regExpCallback,
  blur,
  focus,
  isPhoneCode
} = toRefs(props)

const fre = ref(60)
const isSend = ref(false)
const timer = ref<any>(null)

onMounted(() => {
  // 接受参数
  fre.value = isPhoneCode.value ? code.value?.second : 60
})

onUnmounted(() => {
  timer.value = null
})

/** 设置禁用情况 */
const setDisabled = computed(() => isSend.value)

const setStyle = computed(() => {
  return {
    width: width!.value
      ? typeof width!.value === 'string'
        ? width!.value
        : isPhoneCode!.value
          ? width!.value - 112 + 'px'
          : width!.value + 'px'
      : formWidth!.value + 'px'
  }
})

/* 处理输入事件 */
const handleOnInput = computed(() => val => {
  if (regExp!.value) {
    return handleRegExp(val)
  }
  return regExpCallback!.value && regExpCallback!.value(val, setFormValue)
})

//  自定义正则回调远程赋值
function setFormValue(val) {
  form.value[model.value] = val
}

/** 正则校验 */
function handleRegExp(value) {
  if (typeof regExp!.value === 'string') {
    value = value.replace(REGEXP[regExp!.value], '')
  } else {
    value = value.replace(regExp!.value, '')
  }
  form.value[model.value] = value
}

/** 发送验证码 */
async function sendCode() {
  const assign = code.value.assign
  const realPhone = form.value[assign]
  // 判断是否为空
  if (realPhone) {
    // 判断是否为真实的手机号
    if (REGEXP.phone.test(realPhone)) {
      await proxy.request({
        url: code.value.url,
        params: { [assign]: realPhone } // 这里assign指派的字段要和后端接受的字段一致
      })
      isSend.value = true
      /** 处理发送频率 */
      handleThrottle()
    } else {
      proxy.$modal.msgWarning('请输入正确的手机号码')
    }
  } else {
    proxy.$modal.msgWarning('请输入正确的手机号码')
  }
}

/** 处理发送频率 */
function handleThrottle() {
  timer.value = setInterval(() => {
    fre.value--
    // 当倒数为0的时候重置操作
    if (fre.value === 0) {
      clearInterval(timer.value)
      timer.value = null
      fre.value = code.value.second
      isSend.value = false
    }
  }, 1000)
}
</script>
