<template>
  <div id="FormUpdate">
    <el-upload
      :ref="uploadRef"
      :drag="drag"
      :multiple="handleMultiple"
      :action="upload.action"
      :before-upload="beforeFileUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-remove="handleRemoveFile"
      :disabled="disabled"
      :limit="limit"
      :file-list="form[fileListLabel]"
      :headers="upload.headers"
      :list-type="listType"
      :style="{ width: width ? width + 'px' : formWidth + 'px' }"
    >
      <template v-if="!drag">
        <el-button
          :type="upload.btype"
          :circle="upload.bcircle"
          :round="upload.bround"
          :plain="upload.bplain"
          :icon="upload.bicon"
          :size="upload.bsize"
          :disabled="disabled"
        >
          <template v-if="buttonLabel === 'string' && buttonLabel.length === 0"></template>
          <template v-else>
            {{ buttonLabel }}
          </template>
        </el-button>
        <div slot="tip" class="el-upload__tip">
          <span v-html="getTextLabel"></span>
        </div>
      </template>
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <div>将文件拖到此处，或<em>点击上传</em></div>
          <div v-if="upload.textLabelSite === 'insert'" class="textLabel">
            <span v-html="getTextLabel"></span>
          </div>
        </div>
        <div v-if="upload.textLabelSite === 'outer'" class="el-upload__tip" slot="tip">
          <span v-html="getTextLabel"></span>
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script setup lang="ts" name="FormUpdate">
import { computed, inject, onUnmounted, ref, toRefs, watch } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
const { proxy } = useCurrentInstance()

const defaultTextLabel = ref('请上传 大小不超过 10MB 格式为 doc/docx/xls/xlsx/txt/pdf/jpg/png 的文件')
const fileIdList = ref<Array<string>>([])
const uploadRef = ref()

const props = defineProps({
  form: {
    type: Object,
    default() {
      return {}
    }
  },
  model: {
    type: String
  },
  upload: {
    type: Object,
    required: true,
    default: () => {}
  },
  fileListLabel: {
    type: String,
    default: 'fileList'
  },
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'small'
  },
  buttonLabel: {
    type: String,
    default: '点击上传'
  },
  storage: {
    type: String,
    default: 'multiple'
  },
  formWidth: {
    type: Number
  },
  listType: {
    type: String,
    default: 'text'
  },
  width: Number,
  limit: Number,
  disabled: Boolean,
  circle: Boolean,
  round: Boolean,
  plain: Boolean,
  icon: String,
  multiple: Boolean,
  drag: Boolean
})

const { form, upload, model, fileListLabel, multiple, storage } = toRefs(props)

const refForms = inject('refForms')

/** 文本描述 */
const getTextLabel = computed(() => upload.value.textLabel || defaultTextLabel.value)

/** 处理上传方式 */
// 存储文件方式，如果存储方式为单文件，则不允许多选文件上传，否则允许多选或单选上传

const handleMultiple = computed(() => (isSingle.value ? false : multiple.value))

/** 是单存储 */
const isSingle = computed(() => storage.value === 'single')

watch(form.value, v => {
  if (v[fileListLabel.value]) {
    v[fileListLabel.value].forEach(item => {
      fileIdList.value.push(item.fileId)
    })
    form.value[model!.value as string] = fileIdList.value.join(',')
  }
})

onUnmounted(() => {
  fileIdList.value = []
})

// 导入文件之前
function beforeFileUpload(file) {
  // 默认设置
  const reg = upload.value.reg //
  const _size = upload.value.size || 10
  if (reg && !reg.test(file.name)) {
    // 校验不通过
    proxy.$modal.msgWarning('暂不支持该格式！')
    return false
  } else if (file.size / 1024 / 1024 > _size) {
    proxy.$modal.msgWarning(upload.value.sizeLimitTip || `上传文件大小不能超过10MB`)
    return false
  } else {
    return true
  }
}

// 上传成功
function uploadSuccess(file) {
  if (file.code === 200) {
    if (isSingle.value) {
      form.value[model!.value as string] = file.data.fileId
    } else {
      if (file.data) {
        fileIdList.value.push(file.data.fileId)
        form.value[model!.value as string] = fileIdList.value.join(',')
      }
    }
    if (refForms) {
      // @ts-ignore
      const reff = refForms()
      reff && reff.validateField(model!.value)
    }
    proxy.$modal.msgSuccess(file.msg || '上传成功')
  } else {
    proxy.$modal.msgError(file.msg || '上传失败')
  }
}

// 上传失败
function uploadError() {
  proxy.$modal.msgError('上传失败')
}

//  移除文件
function handleRemoveFile(file) {
  if (file) {
    if (isSingle.value) {
      form.value[model!.value as string] = ''
    } else {
      if (file.response.code === 200) {
        const id = file.response ? file.response.data.fileId[0] : file.fileId
        fileIdList.value.splice(fileIdList.value.indexOf(id), 1)
        form.value[model!.value as string] = fileIdList.value.join(',')
      }
    }
  }
}
</script>
<style scoped>
.textLabel {
  opacity: 0.7;
  font-size: 13px;
}
</style>
