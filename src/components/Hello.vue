<template>
  <div>
    <head-top></head-top>
    <el-row>
      <el-col :span="3">
        <nav-side :style="{height: height + 'px'}"></nav-side>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import headTop from './header'
  import navSide from './side'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    data () {
      return {
        height: this.$height
      }
    },
    beforeCreate () {
      this.$height = document.documentElement.clientHeight - 80
      this.$store.commit('RECODE_USER_NAME', 'zhangding')
      this.$store.commit('RECODE_USER_ROLE', 'admin')
      console.log(this.$store.state.user_role)
    },
    components: {
      ElCol,
      headTop,
      navSide
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
