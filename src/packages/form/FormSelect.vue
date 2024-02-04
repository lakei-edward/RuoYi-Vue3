<template>
  <el-select
    v-model="form[model]"
    :size="size"
    :clearable="clearable"
    :placeholder="placeholder"
    :disabled="disabled"
    :multiple="multiple"
    :filterable="filterable"
    :allow-create="allowCreate"
    :popper-class="popperClass"
    :style="setStyle"
    @change="handleChange($event)"
  >
    <el-option v-for="option in dict" :key="option[keyModel]" :label="option.label" :value="setValue(option)" />
  </el-select>
</template>
<script setup lang="ts" name="FormSelect">
import { computed, toRefs } from 'vue'

interface Dict {
  label: string
  value: string
  [propsName: number]: any
}

const props = defineProps({
  form: {
    type: Object,
    default: () => {}
  },
  ikey: {
    type: String
  },
  model: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  size: {
    type: String
  },
  keyModel: {
    type: String,
    default: 'value'
  },
  formWidth: {
    type: Number
  },
  width: {
    type: [Number, String]
  },
  dict: {
    type: Array<Dict>,
    default: () => []
  },
  popperClass: {
    type: String
  },
  filed: {
    type: Object
  },
  multiple: Boolean,
  clearable: Boolean,
  disabled: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  /* 有change时间的，传递item过去，否则传递value */
  change: Function,
  /** value返回什么值 */
  optionValue: Boolean,
  textModel: String,
  /* 什么层 */
  operateType: String,
  /* 父子联动 */
  fatherSonInteraction: Function
})

const { width, formWidth, change, optionValue, fatherSonInteraction, model, operateType, form, textModel, dict, ikey } =
  toRefs(props)

const setStyle = computed(() => {
  return {
    width: width!.value
      ? typeof width!.value === 'string'
        ? width!.value
        : width!.value + 'px'
      : formWidth!.value + 'px'
  }
})

const setValue = computed(() => option => {
  // 如果有change传参，就传递整个对象过去，否则值传递key
  if (change!.value) {
    if (optionValue.value) {
      return option.value
    } else {
      return option
    }
  } else {
    return option.value
  }
})

function handleChange(val) {
  // 父子联动
  fatherSonInteraction!.value && fatherSonInteraction!.value(val, model.value, operateType!.value)
  // 修改值对应的名称
  if (textModel!.value) {
    const v: Dict = dict!.value.find((r: any) => r.value === (change!.value ? val.value : val)) as Dict
    form.value[textModel!.value] = v.value
  }
  // 如果有change，就执行绑定的函数
  change!.value && change!.value(val, ikey!.value)
}
</script>
