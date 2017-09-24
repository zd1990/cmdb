<template>
  <el-menu theme="dark" default-active="1" class="el-menu-vertical-demo">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>数据库信息&#8195</template>
      <el-menu-item-group>
        <el-menu-item index="1-1">&#8195&#8195&#8195服务器资产表</el-menu-item>
        <el-menu-item index="1-2">数据库</el-menu-item>
      </el-menu-item-group>
      <el-menu-item index="1-3">图表&#8195</el-menu-item>
    </el-submenu>
    <el-menu-item index="2"><i class="el-icon-menu"></i>任务申请信息</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-setting"></i>用户信息表&#8195</el-menu-item>
    <el-menu-item v-if="role=='admin'" index="4"><i class="el-icon-setting"></i>用户管理&#8195&#8195</el-menu-item>
  </el-menu>
</template>

<script>
  export default{
    data () {
      return {
        role: this.$store.state.user_role
      }
    }
  }
</script>

<style lang="scss">

</style>
