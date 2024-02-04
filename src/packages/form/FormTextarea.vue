<template>
  <div id="FormTextarea">
    <el-input
      type="textarea"
      v-model="form[model]"
      :placeholder="placeholder"
      :style="setStyle"
      :autosize="autosize"
      :maxlength="maxlength"
      :minlength="minlength"
      :show-word-limit="showWordLimit"
      :clearable="clearable"
      :show-password="showPassword"
      :size="size"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => {}
  },
  model: {
    type: String,
    default: ''
  },
  rows: {
    type: Number
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  size: {
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
  autosize: {
    type: [Boolean, Object]
  },
  formWidth: {
    type: Number
  },
  showWordLimit: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean
})

const { width, formWidth } = toRefs(props)

const setStyle = computed(() => {
  return {
    width: width!.value
      ? typeof width!.value === 'string'
        ? width!.value
        : width!.value + 'px'
      : formWidth!.value + 'px'
  }
})
</script>
