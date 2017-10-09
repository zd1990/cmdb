<template>
  <div>
    <head-top></head-top>
    <el-row>
      <el-col :span="3">
        <nav-side :style="{height: height + 'px'}"></nav-side>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import headTop from '../components/header'
  import navSide from '../components/side'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    data () {
      return {
        height: this.$height
      }
    },
    beforeCreate () {
      this.$height = document.documentElement.clientHeight - 80
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
