<template>
  <div class="login_container" :style="{height: height + 'px'}">
    <div class="login_child_container">
      <table class="left">
        <tr>
          <td>用户名</td>
          <td><input type="text" v-model="uname"></td>
        </tr>
        <tr>
          <td>密码</td>
          <td><input type="password" v-model="pw"></td>
        </tr>
      </table>
      <el-button class="left" @click="login_in" style="margin-left: 10px;margin-top: 10px" :disabled="disable">登入</el-button>
    </div>
  </div>
</template>

<script>
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import {UrlsLoginIn} from '../urls'
  export default {
    components: {ElButton},
    data () {
      return {
        height: this.$height,
        disable: true,
        uname: '',
        pw: ''
      }
    },
    beforeCreate () {
      this.$height = document.documentElement.clientHeight
      console.log(this.$height)
    },
    watch: {
      uname: function (newname) {   // 判断按钮是否禁用
        console.log(newname)
        if (newname !== '' && this.pw !== '') {
          this.disable = false
        }
      },
      pw: function (newpw) {
        if (newpw !== '' && this.uname !== '') {
          this.disable = false
        }
      }
    },
    methods: {
      login_in () {   // 登入方法
        console.log(this.uname)
        console.log(this.pw)
        console.log(UrlsLoginIn)
        var _this = this
        this.$ajax.post(UrlsLoginIn, {
          username: this.uname,
          password: this.pw
        }, {
          headers: {'Content-type': 'application/json', 'Access-Control-Allow-Credentials': true},
          withCredentials: true
        })
          .then(function (response) {
            console.log(response)
            let ret = response.data.ret
            if (ret === 0) {
              console.log('登入成功')
              _this.$router.push({name: 'home'})
            } else if (ret === 1 || ret === 2) {
              _this.$message.error('账号或密码错误')
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/resource';
  @import '../../style/common';

  .login_container {
    background-image: $background_image;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .login_child_container {
    float: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
