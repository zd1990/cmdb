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
    <div class="cmdbtab">
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
          header-align="center"
          width="280">
        </el-table-column>
        <el-table-column
          prop="domainName"
          label="域名"
          sortable
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP"
          sortable
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="port"
          label="端口"
          sortable
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="groupId"
          label="所属组"
          sortable
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="describe"
          header-align="center"
          label="描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {UrlsServer} from '../urls'
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
        this.$ajax.get(UrlsServer, {params: {format: 'json'}}).then(function (response) {
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

