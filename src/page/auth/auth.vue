<template>
  <div>
    <el-dialog
      title="新增用户"
      width="30%"
      :visible.sync="centerDialogVisible"
      center
      class="user_dialog">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="useradd">确 定</el-button>
      </span>
    </el-dialog>
    <div class="tabsearch">
      <el-button type="primary" @click="centerDialogVisible = true">新增</el-button>
      <el-button type="danger" @click="userdel" :disabled="delbutton" style="margin-right: 10px">删除</el-button>
      <el-input
        placeholder="请输入内容"
        icon="search"
        v-model="search"
        :on-icon-click="handleIconClick">
      </el-input>
    </div>
    <el-table
      :data="tableData"
      border
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      height=450
        style="width: 100%"
      :stripe="true"
      :default-sort="{prop: 'date',order: 'descending'}"
    >
      <el-table-column
        type="selection"
        header-align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        sortable
        header-align="center"
        :show-overflow-tooltip="true"
        width="280">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        sortable
        header-align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="last_login"
        label="最后登入时间"
        :show-overflow-tooltip="true"
        sortable
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="date_joined"
        label="创建时间"
        :show-overflow-tooltip="true"
        sortable
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="butn"
        header-align="center"
        label="操作">
        <template scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transfer :group="group"></transfer>
  </div>
</template>

<script>
  import {UrlsUser, UrlsGroupWeb} from '../urls'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import transfer from './transfer'
  export default {
    components: {ElButton, transfer},
    data () {
      return {
        tableData: [],
        group: [],
        search: '',
        delbutton: true,
        multipleSelection: [],
        centerDialogVisible: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.getuser()
      },
      getuser () {
        let _this = this
        this.$ajax.get(UrlsUser, {params: {msg: 1}}).then(function (response) {
          _this.tableData = response.data
          _this.$ajax.get(UrlsGroupWeb + 'root/', {
            params: {
              format: 'json'
            }
          }).then(function (response) {
            console.log(response)
            _this.group = response.data.children
          }).catch(err => {
            console.log(err)
            _this.$message({
              message: '获取组失败',
              type: 'error'
            })
          })
        }).catch(error => {
          console.log(error)
          this.$message({
            message: error,
            type: 'error'
          })
        })
      },
      handleDelete (index, row) {
        let _this = this
        console.log(index, row)
        this.$confirm('确定删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.delete(UrlsUser + row.username + '/').then(function (response) {
            _this.getuser()
            _this.$message({
              type: 'success',
              message: '删除成功'
            })
          }).catch(err => {
            console.log(err)
            _this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      useradd () {
        let _this = this
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            console.log(_this.ruleForm.username, _this.ruleForm.password)
            _this.$ajax.post(UrlsUser, {
              username: _this.ruleForm.username,
              password: _this.ruleForm.password
            }).then(function (response) {
              _this.centerDialogVisible = false
              _this.getuser()
              _this.$message({
                message: '增加用户成功',
                type: 'success'
              })
            }).catch(err => {
              _this.centerDialogVisible = false
              console.log(err)
              _this.$message({
                message: '增加用户失败',
                type: 'error'
              })
            })
          }
        })
      },
      handleSelectionChange (val) {
        console.log(val)
        this.multipleSelection = val
        if (val.length === 0) {
          console.log('asdasd')
          this.delbutton = true
        } else {
          this.delbutton = false
        }
      },
      userdel () {
        let _this = this
        this.multipleSelection.forEach(item => {
          this.$ajax.delete(UrlsUser + item.username + '/').then(function (response) {
            console.log('delete' + item.username + 'success')
          }).catch(err => {
            console.log(err)
            _this.$message({
              message: '删除用户失败',
              type: 'error'
            })
          })
        })
      },
      handleIconClick () {
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

  .user_dialog {
    .el-dialog--small {
      width: 20%;
    }
    .el-input {
      float: left;
      width: 200px;
    }
  }
</style>
