<template>
  <div>
    <el-form ref="forms" :inline="$isDeTrue(operateLayer.inline)" :model="operateLayer.params" :label-width="operateLayer.labelWidth">
      <template v-for="item in operateLayer.mode.form">
        <el-form-item
          v-if="$judgeTypeCom(item.component, item.hidden)"
          :key="item.model"
          :prop="item.model"
          :label="$setLabel(item.label, operateLayer.labelAfter)"
          :rules="$isUndef(operateLayer.mode.readonly) ? item.rules : []"
        >
          <!-- 操作项 -->
          <template v-if="!operateLayer.mode.readonly">
            <Attr :formParams="operateLayer.params" :attrs="item" :fatherSonInteraction="fatherSonInteraction"></Attr>
          </template>
          <!-- 仅阅读 用于查看 -->
          <div v-else :style="{ width: $setInfoWidth(item) }">
            <!-- 附件 -->
            <template v-if="item.component === 'FormUpdate'">
              <div v-for="file in operateLayer.params[item.fileListLabel]" :key="file.id">
                <el-link type="primary" @click="$minioDownFiles(file, item)"><i class="el-icon-paperclip"></i>{{ file.name }}</el-link>
              </div>
            </template>
            <!-- 普通文本 -->
            <template v-else> {{ operateLayer.params[item.model] || '--' }}{{ item.unit }}</template>
          </div>
        </el-form-item>
        <!-- 自定义单表单组件 -->
        <component
          v-if="$isFunction(item.component)"
          v-bind="$attrs"
          :is="item.component"
          :key="item.name"
          :ref="item.name"
          :readonly="operateLayer.mode.readonly"
          :params="operateLayer.params"
        />
      </template>
      <!-- 自定义操作 比如操作项 -->
      <template>
        <slot></slot>
      </template>
    </el-form>
  </div>
</template>
<script>
/**
 * 传入单个operateLayer，直接使用操作层的表单，不需要与整体的三层捆绑
 */
import Attr from './Attr.vue';
import mixins from '../plugin/mixin';
import { handleDicts } from '../plugin/util.js';
export default {
  name: 'LayerForm',
  /** 单表单组件 */
  components: {
    Attr,
  },
  mixins: [mixins],
  props: {
    // 操作
    operateLayer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    /** 处理选择器的父子联动 */
    async fatherSonInteraction(val, model) {
      // 根据层级类型判断赋值
      let form = this.operateLayer.mode.form;
      let target = form.find((r) => r.model === model);
      if (target.child) {
        for (let i = 0; i < form.length; i++) {
          if (form[i].model === target.child) {
            let data = await this.$requestAssignDict(val);
            // 给字典项赋值
            this.$set(form[i], 'dict', data);
            // 重新选择父级子级置空
            this.$set(this.operateLayer.params, form[i].model, '');
            break;
          }
        }
      }
    },
    /** 初始化字典项 */
    initDicts(dict) {
      // 弹框中的字典赋值
      handleDicts(this.operateLayer, dict, false);
    },
  },
};
</script>
