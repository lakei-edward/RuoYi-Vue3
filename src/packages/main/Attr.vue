<template>
  <component
    ref="attrRefs"
    :is="c"
    :form="formParams"
    :form-width="formWidth"
    :type="attrs.type"
    :model="attrs.model"
    :startTimeLabel="attrs.startTimeLabel"
    :endTimeLabel="attrs.endTimeLabel"
    :startPlaceholder="attrs.startPlaceholder"
    :endPlaceholder="attrs.endPlaceholder"
    :editable="attrs.editable"
    :valueFormat="attrs.valueFormat"
    :buttonLabel="attrs.buttonLabel"
    :treeUrl="attrs.treeUrl"
    :placeholder="attrs.placeholder"
    :normalizer="attrs.normalizer"
    :params="attrs.params"
    :callback="attrs.callback"
    :maxHeight="attrs.maxHeight"
    :alwaysOpen="attrs.alwaysOpen"
    :appendToBody="attrs.appendToBody"
    :showCount="attrs.showCount"
    :zIndex="attrs.zIndex"
    :flat="attrs.flat"
    :keyModel="attrs.keyModel"
    :disabledAfter="attrs.disabledAfter"
    :disabledBefore="attrs.disabledBefore"
    :upload="attrs.upload"
    :reg="attrs.reg"
    :size="attrs.size"
    :describe="attrs.describe"
    :row="attrs.row"
    :limit="attrs.limit"
    :dict="attrs.dict"
    :children="attrs.children"
    :clearable="attrs.clearable"
    :maxlength="attrs.maxlength"
    :minlength="attrs.minlength"
    :width="attrs.width"
    :hidden="attrs.hidden"
    :show-password="attrs.showPassword"
    :disabled="attrs.disabled"
    :format="attrs.format"
    :readonly="attrs.readonly"
    :popper-class="attrs.popperClass"
    :filterable="attrs.filterable"
    :allow-create="attrs.allowCreate"
    :multiple="attrs.multiple"
    :reg-exp="attrs.regExp"
    :autofocus="attrs.autofocus"
    :prefix-icon="attrs.prefixIcon"
    :suffix-icon="attrs.suffixIcon"
    :icon="attrs.icon"
    :round="attrs.round"
    :circle="attrs.circle"
    :plain="attrs.plain"
    :fileListLabel="attrs.fileListLabel"
    :show-word-limit="attrs.showWordLimit"
    :drag="attrs.drag"
    :rows="attrs.rows"
    :storage="attrs.storage"
    :optionValue="attrs.optionValue"
    :list-type="attrs.listType"
    :optionProps="attrs.optionProps"
    :fieldValue="attrs.fieldValue"
    :separator="attrs.separator"
    :options="attrs.options"
    :isPhoneCode="attrs.isPhoneCode"
    :code="attrs.code"
    :click="attrs.click"
    :change="attrs.change"
    :blur="attrs.blur"
    :focus="attrs.focus"
    :ikey="ikey"
    :autosize="attrs.autosize"
    :regExpCallback="attrs.regExpCallback"
    :textModel="attrs.textModel"
    :shortcuts="attrs.shortcuts"
    :disabledDate="attrs.disabledDate"
    :valueKey="attrs.valueKey"
    :dataProps="attrs.dataProps"
    :showCheckbox="attrs.showCheckbox"
    :sendTitle="attrs.sendTitle"
    :fatherSonInteraction="fatherSonInteraction"
    :operateType="operateType"
  />
</template>
<script setup lang="ts" name="Attr">
import { ref, toRefs, watch } from 'vue'
const props = defineProps({
  attrs: {
    type: Object,
    default: () => {}
  },
  formParams: {
    type: Object,
    default: () => {}
  },
  formWidth: String,
  ikey: String,
  fatherSonInteraction: Function,
  operateType: String
})

const { attrs } = toRefs(props)

const c = ref('')
const attrRefs = ref()

watch(
  () => attrs.value.component,
  async val => {
    const v = await import(`../form/${val}.vue`)
    c.value = v.default
  },
  { immediate: true }
)

defineExpose({
  attrRefs
})
</script>
