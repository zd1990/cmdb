<template>
  <div class="login_container" :style="{height: totalHeight + 'px'}">
    <div class="login_child_container">
      <table class="left">
        <tr>
          <td>用户名</td>
          <td><input type="text" v-model="username"></td>
        </tr>
        <tr>
          <td>密码</td>
          <td><input type="password" v-model="pw"></td>
        </tr>
      </table>
      <el-button class="left" @click="login_in" style="margin-left: 10px;margin-top: 10px" :disabled="disable">登入
      </el-button>
    </div>
  </div>
</template>

<script>
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import {UrlsLoginIn} from '../urls'
  import {mapState} from 'vuex'
  export default {
    components: {ElButton},
    data () {
      return {
        disable: true,
        pw: '',
        username: ''
      }
    },
    watch: {
      username: function (newname) {   // 判断按钮是否禁用
        console.log(newname)
        if (newname !== '' && this.pw !== '') {
          this.disable = false
        } else if (newname === '') {
          this.disable = true
        }
      },
      pw: function (newpw) {
        if (newpw !== '' && this.username !== '') {
          this.disable = false
        } else if (newpw === '') {
          this.disable = true
        }
      }
    },
    methods: {
//      ...mapMutations(
//        ['RECODE_USER_NAME']
//      ),
      login_in () {   // 登入方法
        console.log(this.username)
        console.log(this.pw)
        console.log(UrlsLoginIn)
        var _this = this
        this.$ajax.post(UrlsLoginIn, {
          username: this.username,
          password: this.pw
        })
          .then(function (response) {
            console.log(response)
            let ret = response.data.ret
            if (ret === 0) {
              console.log('登入成功')
              _this.$store.commit('RECODE_USER_NAME', _this.username)
//              _this.uname = _this.username
              _this.$router.push({name: 'home'})
            } else if (ret === 1 || ret === 2) {
              _this.$message.error('账号或密码错误')
            }
          })
      }
    },
    computed: {
      ...mapState(['totalHeight'])
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
