<template>
  <div class="head_contain">
    <div class="head_name">
      <span><h2>数据库管理平台</h2></span>
    </div>
    <div class="head_info">
      <button>
        <icon name="user" scale="2" style="color: aqua"></icon>
      </button>
      <button>
        <icon name="envelope" style="color: aqua" scale="2"></icon>
      </button>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  @import "../style/common";

  .head_contain {
    height: 60px;
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
