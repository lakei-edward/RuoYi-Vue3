<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      title="警员列表"
      width="1000px"
      :visible="policeVisable"
      :before-close="dialogCancel"
      class="el-dialog-item"
    >
      <!-- {{ multiple }} -->
      <div>
        <!--查询条件-->
        <el-form :model="queryParams" :inline="true">
          <el-form-item label="姓名">
            <el-input v-model="queryParams.nickName" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="警号">
            <el-input v-model="queryParams.userName" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          <el-table-column label="性别" align="center" key="sex" prop="sex" v-if="columns[3].visible" :show-overflow-tooltip="true">
            <template slot-scope="scope">
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
          <el-table-column label="现任职务" align="center" key="zw" prop="zw" v-if="columns[6].visible" :show-overflow-tooltip="true" />
        </el-table>
        <pagination
          v-show="totalPerson > 0"
          :total="totalPerson"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getPoliceList('')"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from '@/api/system/user';
export default {
  name: 'ChoosePerson',
  props: ['multiple'],
  data() {
    return {
      /* 显隐 */
      policeVisable: false,
      queryList: [],
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `民警姓名`, visible: true },
        { key: 2, label: `民警姓名`, visible: true },
        { key: 3, label: `部门`, visible: true },
        { key: 4, label: `手机号码`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `创建时间`, visible: true },
      ],
      totalPerson: 0,
      checkedRyDetail: [], // 已选中的人
      queryParams: {
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  methods: {
    /* 勾选警员 */
    selectionChange(selection) {
      // console.log(this.multiple);
      if (this.multiple) {
        this.checkedRyDetail = selection;
        // console.log(this.checkedRyDetail);
      } else {
        if (selection.length > 1) {
          this.$refs.multipleTable.clearSelection();
          this.$refs.multipleTable.toggleRowSelection(selection.pop());
        } else {
          this.checkedRyDetail = selection;
        }
      }
    },

    /************yufei*****************/
    /************只允许选中一个警员记录*****************/
    select(selection, row) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        this.$refs.multipleTable.toggleRowSelection(del_row, false);
      }
    },
    /*****************************/

    /************yufei*****************/
    /************只允许选中一个警员记录*****************/
    selectAll(selection) {
      if (selection.length > 1) {
        selection.length = 1;
      }
    },
    /*****************************/

    /* 点击行选中复选框 */
    clickRows(row) {
      // this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    /* 查询 */
    handleQuery() {
      this.queryParams.pageSize = 10;
      this.queryParams.pageNum = 1;
      this.getPoliceList();
    },

    /* 重置 */
    resetQuery() {
      this.clearParams();
      this.getPoliceList();
    },

    /** 查询数据 */
    getPoliceList() {
      listUser(this.queryParams).then(async (data) => {
        this.queryList = data.rows;
        this.totalPerson = data.total;
      });
    },

    /** 初始化数据 */
    clearParams() {
      this.queryParams = this.$options.data().queryParams;
    },

    /* 确定警员列表选择人 */
    dialogSubmit() {
      this.policeVisable = false;
      if (this.multiple) {
        this.$emit('choosedPoliceEmit', this.checkedRyDetail);
      } else {
        this.$emit('choosedPoliceEmit', this.checkedRyDetail[0]);
      }
      this.queryParams = this.$options.data().queryParams;
    },

    /* 取消警员列表选择人 */
    dialogCancel() {
      this.policeVisable = false;
    },

    /** 获取警员*/
    init(id) {
      this.policeVisable = true;
      /* 工作单位Id */
      if (id) {
        this.queryParams.gzdw = id;
      } else {
        this.queryParams.gzdw = '';
      }
      this.getPoliceList();
    },
  },
};
</script>
