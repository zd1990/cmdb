<template>
  <el-menu theme="dark" default-active="1" class="el-menu-vertical-demo" :router="true">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>数据库信息&#8195</template>
      <el-menu-item-group>
        <el-menu-item index="cmdb">&#8195&#8195&#8195服务器资产表</el-menu-item>
        <el-menu-item index="tree">&#8195&#8195资产管理&#8195</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-message"></i>sql信息&#8195&#8194&#8194&#8194</template>
      <el-menu-item index="sql">sql申请</el-menu-item>
      <el-menu-item index="task">&#8194&#8195&#8195任务申请信息</el-menu-item>
    </el-submenu>
    <el-menu-item index="auth"><i class="el-icon-setting"></i>用户信息表&#8195</el-menu-item>
    <el-menu-item v-if="role=='admin'" index="4"><i class="el-icon-setting"></i>sql省查&#8195&#8195</el-menu-item>
    <el-menu-item v-if="role=='admin'" index="4"><i class="el-icon-setting"></i>用户管理&#8195&#8195</el-menu-item>
  </el-menu>
</template>

<script>
  export default{
    data () {
      return {}
    }
  }
</script>

<style lang="scss">

</style>
