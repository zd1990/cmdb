<template>
  <div>
    <div class="tree">
      <li>
        <div
          :class="{bold: isFolder}"
          @click="toggle"
          @dblclick="changeType">
          {{model.name}}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
          <item
            class="item"
            v-for="model in model.children"
            :model="model">
          </item>
          <li @click="addChild">+</li>
        </ul>
      </li>
    </div>
  </div>
</template>

<script>
  import {UrlsGetGroup} from '../urls'
  export default {
    data () {
      return {
        datas: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        let _this = this
        let url = UrlsGetGroup + 'root/'
        this.$ajax.get(url, {params: {format: 'json'}}).then(function (response) {
          _this.datas = response.data
        }).catch(error => {
          _this.$message({
            message: '未知错误',
            type: 'error'
          })
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
