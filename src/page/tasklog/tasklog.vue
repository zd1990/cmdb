<template>
  <div>
    <div class="tabsearch">
      <el-input
        placeholder="请输入内容"
        icon="search"
        v-model="search"
        :on-icon-click="handleIconClick">
      </el-input>
    </div>
    <div class="sqltab">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :stripe="true"
        :default-sort="{prop: 'date',order: 'descending'}"
      >
        <el-table-column
          prop="name"
          label="名称"
          sortable
          :show-overflow-tooltip="true"
          header-align="center"
          width="280">
        </el-table-column>
        <el-table-column
          prop="hashId"
          label="ID"
          :show-overflow-tooltip="true"
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="database"
          label="数据库"
          sortable
          :show-overflow-tooltip="true"
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          sortable
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user"
          label="申请人"
          sortable
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="timeStart"
          header-align="center"
          sortable
          label="开始时间">
        </el-table-column>
        <el-table-column
          prop="timeEnd"
          header-align="center"
          sortable
          label="结束时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {UrlsGetSqlLog} from '../urls'
  export default {
    data () {
      return {
        tableData: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      handleIconClick (ev) {
        console.log(ev)
      },
      initData () {
        let _this = this
        this.$ajax.get(UrlsGetSqlLog, {params: {format: 'json', order: '-timeStart'}}).then(function (response) {
          response.data.map(item => {
            if (item.type === 0) {
              item.type = '测试'
            } else if (item.type === 1) {
              item.type = '执行'
            }
            if (item.status === 0) {
              item.status = '正在审核'
            } else if (item.status === 1) {
              item.status = '正在执行'
            } else if (item.status === 2) {
              item.status = '执行成功'
            } else if (item.status === 3) {
              item.status = '执行失败'
            }
          })
          _this.tableData = response.data
        }).catch(error => {
          _this.$message({
            message: error,
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .tabsearch {
    float: right;
    .el-input {
      width: 180px;
    }
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .cmdbtab {
  }
</style>

