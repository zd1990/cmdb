<template>
  <div class="head_contain" :style="{height:headerHeight+'px'}">
    <div class="head_name">
      <span><h2>数据库管理平台</h2></span>
    </div>
    <div class="head_info">
      <el-popover
        ref="userinfo"
        placement="bottom"
        width="200"
        trigger="click">
        <table>
          <tr>
            <td>用户名:</td>
            <td>&#8195{{this.$store.state.uname}}</td>
          </tr>
          <tr>
            <td>&#8195角色:</td>
            <td>&#8195{{this.$store.state.urole}}</td>
          </tr>
          <tr>
              <button>登出</button>
          </tr>
        </table>
      </el-popover>
      <button v-popover:userinfo>
        <icon name="user" scale="2" style="color: aqua"></icon>
      </button>
      <button>
        <icon name="envelope" style="color: aqua" scale="2"></icon>
      </button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState(['headerHeight'])
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import "../style/common";

  .head_contain {
    width: 100%;
    background-color: #333333;
  }

  .head_name {
    float: left;
    margin: {
      top: 15px;
      left: 15px;
    }
  ;
    h2 {
      color: aqua;
    }
  }

  .head_info {
    float: right;
    margin: {
      top: 15px;
      right: 30px;
    }
    button {
      background-color: #333333;
      margin-right: 5px;
      margin-left: 5px;
      cursor: pointer;
    }
  ;
  }

</style>
