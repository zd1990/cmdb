<template>
  <li>
    <div :class="{bold: isFolder}" class="treediv" @mouseover="toli" @mouseout="outli"
         :style="{backgroundColor:li_bkcolor}" v-if="delflag">
      <span v-if="isFolder" @click="toggle" class="curs"><icon :name="iconname"></icon></span>
      <span v-else  class="curs"><icon name="database"></icon></span>
      <span @click.left="toggle"   class="curs">{{model.name}}</span>
      <el-popover ref="popover4" width="160" v-model="visible" placement="right">
        <p style="color: red">确定要删除当前数据？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="text" size="mini" @click="dels">确定</el-button>
        </div>
      </el-popover>
      <span @mouseover="todel" @mouseout="outdel" class="span_del curs" v-popover:popover4
            :style="{color:'hsl(360,100%,'+hue_del+'%)'}">
        <icon name="minus-circle"></icon>
      </span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item class="item" v-for="model in model.children" :model="model">
      </item>
      <el-popover ref="popover5" width="160" class="pop" v-model="visible2">
        <el-radio class="radio" v-model="radio" label="group">组</el-radio>
        <el-radio class="radio" v-model="radio" label="database">数据库</el-radio>
        <el-input v-show="radio === 'group'" placeholder="请输入新组名" v-model="newgroup"></el-input>
        <el-input v-show="radio === 'database'" placeholder="请输入新数据库域名" v-model="newDomian"></el-input>
        <el-input v-show="radio === 'database'" placeholder="请输入新数据库ip" v-model="newIp"></el-input>
        <el-input v-show="radio === 'database'" placeholder="请输入新数据库端口" v-model="newPort"></el-input>
        <p v-show="grouprule" style="color: red">不符合规范，请从新输入</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="text" size="mini" @click="addChild">确定</el-button>
        </div>
      </el-popover>
      <li class="treeli">
        <span :style="{color:'hsl(240,100%,'+hue_plus+'%)'}" @mouseover="toplus" @mouseout="outplus" v-popover:popover5
              @click="grouprule=false">
          <icon name="plus"></icon>
        </span>
      </li>
    </ul>
  </li>
</template>

<script>
  import {UrlsGroup, UrlsServer} from '../page/urls'
  export default {
    name: 'item',
    props: {
      model: Object
    },
    data: function () {
      return {
        open: false,
        iconname: 'caret-right',
        hue_del: 90,
        hue_plus: 90,
        li_bkcolor: '#F5F5F5',
        visible2: false,
        visible: false,
        newgroup: '',
        grouprule: false,
        radio: 'group',
        newDomian: '',
        newIp: '',
        newPort: '',
        delflag: true
      }
    },
    computed: {
      isFolder: function () {
//        return this.model.children &&
//          this.model.children.length
        return this.model.type === 'group'
      }
    },
    methods: {
      toggle: function () {                       // 点开组
        if (this.isFolder) {
          this.open = !this.open
          if (this.open) {
            this.iconname = 'caret-down'
          } else {
            this.iconname = 'caret-right'
          }
        }
      },
      changeType: function () {
        if (!this.isFolder) {
          this.$set(this.model, 'children', [])
//          this.addChild()
          this.model.children.push({name: 'new'})
          this.open = true
          this.iconname = 'caret-down'
        } else {
          console.log(this.model.name)
        }
      },
      reName: function () {                        // 重命名
        console.log('rename')
      },
      addChild: function () {                       // 增加新组或数据库
        let _this = this
        if (this.radio === 'group') {
          if (this.newgroup) {
            this.$ajax({
              url: UrlsGroup,
              method: 'POST',
              data: {
                name: this.newgroup,
                parent: this.model.name
              },
              headers: {}
            }).then(function (response) {
              _this.model.children.push({
                name: _this.newgroup,
                type: 'group'
              })
              _this.visible2 = false
            }).catch(err => {
              _this.$message({
                message: err,
                type: 'error'
              })
            })
          } else {
            this.grouprule = true
          }
        } else {
          if (this.newDomian && this.newIp && this.newPort) {
            this.$ajax.post(UrlsServer, {
              domainName: this.newDomian,
              ip: this.newIp,
              port: this.newPort,
              groupName: this.model.name
            }).then(function (reponse) {
              _this.model.children.push({
                name: reponse.data.name,
                type: 'server'
              })
              _this.visible2 = false
            }).catch(error => {
              _this.$message({
                message: error,
                type: 'error'
              })
            })
          } else {
            this.grouprule = true
          }
        }
      },
      dels: function () { // 删除成员
        let _this = this
        if (this.model.type === 'group') {
          this.$ajax.delete(UrlsGroup + this.model.name + '/').then(function () {
            _this.$set(_this.model, 'children', [])
            _this.delflag = false
            _this.visible = false
          }).catch(error => {
            _this.$message({
              message: error,
              type: 'error'
            })
          })
        } else {
          this.$ajax.delete(UrlsServer + this.model.name + '/').then(function () {
            _this.delflag = false
            _this.visible = false
          }).catch(error => {
            _this.$message({
              message: error,
              type: 'error'
            })
          })
        }
      },
      todel: function () {
        this.hue_del = 50
      },
      outdel: function () {
        this.hue_del = 90
      },
      toplus: function () {
        this.hue_plus = 50
      },
      outplus: function () {
        this.hue_plus = 90
      },
      toli: function () {
        this.li_bkcolor = '#d2e2ff'
      },
      outli: function () {
        this.li_bkcolor = '#f5f5f5'
      }
    }
  }
</script>

<style lang="scss">
  .item {
    /*cursor: pointer;*/
  }

  .curs {
    cursor: pointer
  }

  .treediv {
    text-align: left;
  }

  .treeli {
    text-align: left;
  }

  .bold {
    font-weight: bold;
  }

  .span_del {
    margin-left: 20px;
  }

  .pop {

  }

  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }

  ul li {
    list-style-type: none;
  }

  button {
    background-color: #333333;
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
</style>
