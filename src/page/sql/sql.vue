<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="sql_div">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="sql名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="sql类型" prop="sqltype">
            <el-select v-model="ruleForm.sqltype" placeholder="请选择sql类型" class="sql_select">
              <el-option label="DDl" value="ddl"></el-option>
              <el-option label="DML" value="dml"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据库地址" prop="hosts">
            <el-select v-model="ruleForm.hosts" multiple filterable remote placeholder="请输入关键词"
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据库名" prop="dbname">
            <el-input v-model="ruleForm.dbname" class="sql_select"></el-input>
          </el-form-item>
          <el-form-item label="sql内容" prop="desc" style="text-align: left">
            <!--<el-input type="textarea" v-model="ruleForm.desc" class="sql_txtinput"></el-input>-->
            <editor v-model="ruleForm.desc" @init="editorInit" lang="sql" theme="chrome" height="500"
                    class="edit"></editor>
          </el-form-item>
          <el-button type="primary" @click="submitForm('test')">测试</el-button>
          <el-button type="primary" @click="submitForm('put')">提交</el-button>
        </el-form>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="ret_div">
        <el-input type="textarea" resize="none" :disabled="true" v-model="sqlRet"
                  :rows="rownum"></el-input>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {mapState} from 'vuex'
  import {UrlsExecSql, UrlsGetRet, UrlsServer} from '../urls'
  export default {
    data () {
      return {
        hashList: [],
        options: [],
        list: [],
        loading: false,
        ruleForm: {
          name: '',
          sqltype: '',
          desc: '',
          dbname: '',
          hosts: [],
          host_flag: ''
        },
        sqlRet: '',
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          sqltype: [
            {required: true, message: '请选择sql类型', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ],
          host_flag: [
            {required: true, message: '请选择数据库', trigger: 'blur'}
          ],
          dbname: [
            {required: true, message: '请填写数据库名', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.initData()
    },
    computed: {
      ...mapState(['bodyHeight']),
      rownum: function () {
        return this.bodyHeight / 21
      }
    },
    components: {editor: require('vue2-ace-editor-support-chinese')},
    methods: {
      initData () {
        let _this = this
        this.$ajax.get(UrlsServer).then(function (response) {
          _this.states = response.data.map(item => {
            return item.name
          })
          _this.list = _this.states.map(item => {
            return {value: item, label: item}
          })
        }).catch(error => {
          console.log(error)
          this.$message({
            message: error,
            type: 'error'
          })
        })
      },
      editorInit: function (editor) {
        require('vue2-ace-editor-support-chinese/node_modules/brace/mode/sql')
        require('vue2-ace-editor-support-chinese/node_modules/brace/theme/chrome')
      },
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.options = []
        }
      },
      submitForm (modle) {
        if (this.ruleForm.hosts) {
          this.ruleForm.host_flag = '1'
        } else {
          this.ruleForm.host_flag = ''
        }
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            console.log('sucess')
            if (modle === 'test') {
              console.log('test')
              this.submitSql(this.ruleForm.desc, 0)
            } else if (modle === 'put') {
              console.log('put')
              this.submitSql(this.ruleForm.desc, 1)
            }
          } else {
            console.log('faild')
            console.log(this.ruleForm.hosts)
          }
        })
      },
      submitSql (sql, exec) {
        let _this = this
        _this.sqlRet = ''
        this.$ajax.post(UrlsExecSql, {
          host: _this.ruleForm.hosts,
          databases: _this.ruleForm.dbname,
          cmd: sql,
          exec: exec
        }).then(function (response) {
          console.log(response)
          let ret = response.data.ret
          if (ret === 1) {
            let msg = response.data.msg
            _this.$message.err(msg)
          } else if (ret === 0) {
            _this.hashList = response.data.hash_list
            _this.$message({
              message: '执行成功，等待结果',
              type: 'success'
            })
            _this.getRet(_this.hashList)
          }
        }).catch(function (error) {
          _this.$message({
            message: error,
            type: 'error'
          })
        })
      },
      getRet (idList) {
        let _this = this
        let tid = null
        tid = setInterval(function () {
          let tmplist = []
          idList.forEach(function (i) {
            _this.$ajax.get(UrlsGetRet, {
              params: {
                hash_id: i
              }
            }).then(function (response) {
              console.log(response)
              let ret = response.data.ret
              if (ret === 0) {
                let tmpret = response.data.sql_info
                let host = tmpret['host']
                let description = tmpret['description']
                let result = tmpret['result']
                _this.sqlRet += '#########################################################################\n'
                _this.sqlRet += 'host:    ' + host + '\n' + '描述:    ' + description + '\n' + '结果:    ' + result + '\n'
              } else if (ret === 1) {
                console.log('ret is null')
                tmplist.push(i)
              } else if (ret === 2) {
                _this.$message({
                  message: '未知错误',
                  type: 'error'
                })
              }
              idList = tmplist
              if (idList === []) {
                console.log('查询完毕')
                clearInterval(tid)
              }
            }).catch(error => {
              _this.$message({
                message: '未知错误',
                type: 'error'
              })
              console.log(error)
              clearInterval(tid)
            })
          })
        }, 2000)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/resource';
  @import '../../style/common';

  .sql_div {
    width: 90%;
    margin-top: 50px;
    margin-left: 20px;
    padding-right: 20px;
    .el-textarea__inner {
      height: 500px;
    }
  ;
  }

  .sql_select {
    width: 50%;
    float: left;
  }

  .ret_div {
    .el-textarea {
      .el-textarea__inner {
        background-color: rgba(51, 51, 51, 0.85);
      }
    }
  }

</style>
