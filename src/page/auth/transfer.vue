<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple-light" :style="{height:butomHeight+'px', maxHeight:butomHeight+'px'}">
          <div class="title">
            <el-checkbox>可选用户</el-checkbox>
          </div>
          <el-checkbox-group v-model="checkList" class="left" style="width: 100%">
            <ul>
              <li v-for="(item,index) in availuser" @mouseover="toli(index)" @mouseout="outli(index)"
                  :style="{backgroundColor:item.isSelected?'#d2e2ff':'#F5F5F5'}">
                <el-checkbox :label="item.name"></el-checkbox>
              </li>
            </ul>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-dark">
          <el-cascader
            :options="group"
            :show-all-levels="false"
            before-filter="choiceGroup"
            placeholder="请选择目录"
          ></el-cascader>
          <div class="moves_div">
            <div>
              <el-button type="primary" class="el-icon-arrow-right movebtn"></el-button>
            </div>
            <div>
              <el-button type="primary" class="el-icon-arrow-left movebtn"></el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-light">
          <el-table
            :data="users"
            :height="butomHeight"
            style="width: 100%">
            <el-table-column
              type="selection"
              header-align="center"
              width="55">
            </el-table-column>
            <el-table-column
              prop="username"
              label="已有用户"
              header-align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        butomHeight: '',
        availuser: [
          {name: 1, isSelected: false},
          {name: 2, isSelected: false},
          {name: 3, isSelected: false}
        ],
        users: [],
        group: this.group,
        checkList: []
      }
    },
    props: ['group'],
    created () {
      this.initData()
    },
    computed: {
      ...mapState(['bodyHeight'])
    },
    methods: {
      initData () {
        this.butomHeight = this.bodyHeight - 450 - 56
      },
      choiceGroup (tmpgroup) {
        console.log(tmpgroup)
      },
      toli (index) {
        console.log('in')
        console.log(index)
        this.availuser[index].isSelected = true
      },
      outli (index) {
        console.log('out')
        console.log(index)
        this.availuser[index].isSelected = false
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/common';

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    /*background: #99a9bf;*/
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    /*background: #e5e9f2;*/
    border: 1px solid #c1c1c1;
    width: 90%;
    overflow: auto;
    li, ul {
      text-align: left;
      padding-left: 10px;
      width: 100%;
    }
  }

  .grid-content {
    border-radius: 4px;
    min-height: 100px;
    margin-left: 20px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .moves_div {
    margin-top: 100px;
  }

  .movebtn {
    margin-top: 20px;
  }

  .title {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #c1c1c1;
    width: 100%;
  }
</style>
