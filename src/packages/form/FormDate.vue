<template>
  <el-date-picker
    v-model="modelValue"
    :size="size"
    :type="type"
    :format="format"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :placeholder="placeholder"
    :value-format="valueFormat"
    :popper-class="popperClass"
    :prefix-icon="prefixIcon"
    :append-to-body="appendToBody"
    :shortcuts="shortcuts"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    :disabled-date="isDisabled"
    @change="changeDate"
  >
  </el-date-picker>
</template>
<script setup lang="ts">
import { computed, onUnmounted, ref, toRefs } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => {}
  },
  model: {
    type: String
  },
  type: {
    type: String
  },
  size: {
    type: String
  },
  popperClass: {
    type: String
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  prefixIcon: {
    type: String
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  startTimeLabel: {
    type: String,
    default: 'startTime'
  },
  endTimeLabel: {
    type: String,
    default: 'endTime'
  },
  startPlaceholder: {
    type: String,
    default: '开始时间'
  },
  endPlaceholder: {
    type: String,
    default: '结束时间'
  },
  width: {
    type: Number
  },
  formWidth: {
    type: Number
  },
  shortcuts: {
    type: Object
  },
  disabledDate: {
    type: String
  },
  disabled: Boolean,
  editable: Boolean,
  clearable: Boolean,
  appendToBody: Boolean,
  change: Function
})

const { type, form, model, change, startTimeLabel, endTimeLabel, disabledDate } = toRefs(props)

const dateTime = ref([])

onUnmounted(() => {
  dateTime.value = []
})

/* 是否是范围选择 */
const isRange = computed(() => type!.value === 'daterange')

/* 动态绑定v-model */
const modelValue = computed({
  get() {
    return isRange.value ? dateTime.value : form.value[model!.value as string]
  },
  set(value) {
    if (isRange.value) {
      dateTime.value = value
    } else {
      form.value[model!.value as string] = value
    }
  }
})

/** 处理不可选日期 */
function isDisabled(time: Date) {
  if (disabledDate!.value) {
    const list = {
      after,
      before
    }
    return list[disabledDate!.value as string](time)
  }
}

function after(time: Date) {
  return time.getTime() > Date.now() - 8.64e6 // 如果没有后面的-8.64e6就是不可以选择今天的
}
function before(time: Date) {
  return time.getTime() < Date.now() - 8.64e7 // 如果没有后面的-8.64e7就是不可以选择今天的
}

/* change事件 */
function changeDate(val) {
  change!.value && change!.value(val)
  if (isRange.value) {
    if (val && val.length > 0) {
      form.value[startTimeLabel.value] = val[0]
      form.value[endTimeLabel.value] = val[1]
    } else {
      //值为空时,让其为空值
      form.value[startTimeLabel.value] = ''
      form.value[endTimeLabel.value] = ''
    }
  }
}
</script>
