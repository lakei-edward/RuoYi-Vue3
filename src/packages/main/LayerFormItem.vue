<template>
  <div>
    <!-- 展示组件 -->
    <Attr v-if="!text" :formParams="formParams" :attrs="attrs"></Attr>
    <!-- 展示详情 -->
    <template v-else>
      <!-- 附件 -->
      <template v-if="attrs.fileListLabel">
        <div v-for="file in formParams[attrs.fileListLabel]" :key="file.id">
          <el-link type="primary" @click="$minioDownFiles(file, attrs)"> <i class="el-icon-paperclip"></i>{{ file.name }} </el-link>
        </div>
      </template>
      <!-- 普通文本 -->
      <template v-else>
        <div class="yf-normal-text">{{ attrs.textModel ? formParams[attrs.textModel] || '--' : formParams[attrs.model] || '--' }}{{ formParams.unit }}</div>
      </template>
    </template>
  </div>
</template>

<script>
/**
 * 可以使用ry-layer-page中单个表单组件，通过该组件来转一下！
 */
import Attr from '../form/Attr.vue';
import mixins from '../plugin/mixin';
export default {
  name: 'LayerFormItem',
  components: {
    Attr,
  },
  mixins: [mixins],
  provide() {
    return {
      /** 一开始加载获取到。传递函数，等获取到时候再调用这个方法即可 */
      refForms: this.formRef,
    };
  },
  props: {
    text: {
      type: Boolean,
      default: false,
    },
    attrs: {
      type: Object,
    },
    formParams: {
      type: Object,
    },
    formRef: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.yf-normal-text{
  /*用于解决纯数字或一个字母不换行等问题*/
  word-wrap: break-word;
}
</style>
