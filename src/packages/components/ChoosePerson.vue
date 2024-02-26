<template>
  <el-dialog
    :close-on-click-modal="false"
    title="警员列表"
    width="1000px"
    v-model="policeVisable"
    :before-close="dialogCancel"
    class="el-dialog-item"
  >
    <div>
      <!--查询条件-->
      <el-form :model="queryParams" :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="queryParams.nickName" placeholder="请输入" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="警号">
          <el-input v-model="queryParams.userName" placeholder="请输入" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <el-icon><Search />&nbsp;</el-icon>查询</el-button
          >
          <el-button @click="resetQuery"
            ><el-icon><RefreshRight />&nbsp;</el-icon>重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="queryList" ref="multipleTable" @selection-change="selectionChange" @row-click="clickRows">
        <el-table-column type="selection" align="center" />
        <el-table-column label="姓名" align="center" key="xm" prop="nickName" v-if="columns[0].visible" />
        <el-table-column
          label="身份证号"
          align="center"
          width="150"
          key="sfzh"
          prop="sfzh"
          v-if="columns[1].visible"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="警号"
          align="center"
          key="userName"
          prop="userName"
          v-if="columns[2].visible"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="联系电话"
          align="center"
          key="phonenumber"
          prop="phonenumber"
          v-if="columns[3].visible"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="性别"
          align="center"
          key="sex"
          prop="sex"
          v-if="columns[3].visible"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            {{ scope.row.sex === '0' ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column
          label="工作单位"
          align="center"
          key="deptName"
          prop="dept.deptName"
          v-if="columns[5].visible"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="现任职务"
          align="center"
          key="zw"
          prop="zw"
          v-if="columns[6].visible"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <pagination
        v-show="totalPerson > 0"
        :total="totalPerson"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getPoliceList"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts" name="ChoosePerson">
import { ref, toRefs, reactive } from 'vue'
import { listUser } from '@/api/system/user'

const emit = defineEmits(['choosedPoliceEmit'])

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  }
})

const { multiple } = toRefs(props)

/* 显隐 */
const policeVisable = ref(false)
const queryList = ref([])
const columns = ref([
  { key: 0, label: `用户编号`, visible: true },
  { key: 1, label: `民警姓名`, visible: true },
  { key: 2, label: `民警姓名`, visible: true },
  { key: 3, label: `部门`, visible: true },
  { key: 4, label: `手机号码`, visible: true },
  { key: 5, label: `状态`, visible: true },
  { key: 6, label: `创建时间`, visible: true }
])
const totalPerson = ref(0)
const checkedRyDetail = ref([]) // 已选中的人
const state = reactive({
  queryParams: {
    pageSize: 10,
    pageNum: 1
  }
})

const { queryParams } = toRefs(state)

const multipleTable = ref()

/* 勾选警员 */
function selectionChange(selection) {
  if (multiple.value) {
    checkedRyDetail.value = selection
  } else {
    if (selection.length > 1) {
      multipleTable.value.clearSelection()
      multipleTable.value.toggleRowSelection(selection.pop())
    } else {
      checkedRyDetail.value = selection
    }
  }
}

/* 点击行选中复选框 */
function clickRows(row) {
  multipleTable.value.toggleRowSelection(row)
}

/* 查询 */
function handleQuery() {
  queryParams.value.pageSize = 10
  queryParams.value.pageNum = 1
  getPoliceList()
}

/* 重置 */
function resetQuery() {
  clearParams()
  getPoliceList()
}

/** 查询数据 */
function getPoliceList(currentPage?) {
  if (currentPage) {
    queryParams.value.pageNum = currentPage.page
    queryParams.value.pageSize = currentPage.limit
  }
  listUser(queryParams.value).then(async data => {
    queryList.value = data.rows
    totalPerson.value = data.total
  })
}

/** 初始化数据 */
function clearParams() {
  state.queryParams = {
    pageSize: 10,
    pageNum: 1
  }
}

/* 确定警员列表选择人 */
function dialogSubmit() {
  policeVisable.value = false
  if (multiple.value) {
    emit('choosedPoliceEmit', checkedRyDetail.value)
  } else {
    emit('choosedPoliceEmit', checkedRyDetail.value[0])
  }
  clearParams()
}

/* 取消警员列表选择人 */
function dialogCancel() {
  policeVisable.value = false
}

/** 获取警员*/
function init(id) {
  policeVisable.value = true
  /* 工作单位Id */
  if (id) {
    queryParams.value.gzdw = id
  } else {
    queryParams.value.gzdw = ''
  }
  getPoliceList()
}

defineExpose({
  init
})
</script>
<style scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
