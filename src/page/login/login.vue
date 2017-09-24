<template>
  <div class="login_container" :style="{height: height + 'px'}">
    <div class="login_child_container">
      <table>
        <tr>
          <td>用户名</td>
          <td><input type="text"></td>
        </tr>
        <tr>
          <td>密码</td>
          <td><input type="password"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        height: this.$height
      }
    },
    beforeCreate () {
      this.$height = document.documentElement.clientHeight
      console.log(this.$height)
    }
  }
</script>

<style lang="scss">
  @import '../../style/resource';

  .login_container {
    background-image: $background_image;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .login_child_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
