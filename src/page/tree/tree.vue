<template>
  <div class="treediv">
    <ul id="demo">
      <item
        class="item"
        :model="treeData">
      </item>
    </ul>
  </div>
</template>

<script>
  import item from '../../components/tree'
  import {UrlsGroup} from '../urls'
  export default {
    data () {
      return {
        treeData: {}
      }
    },
    components: {item},
    created () {
      this.initData()
    },
    methods: {
      initData () {
        let _this = this
        let url = UrlsGroup + 'root/'
        this.$ajax.get(url, {params: {format: 'json'}}).then(function (response) {
          _this.treeData = response.data
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
.treediv {
  padding-top: 10px;
  padding-left: 10px;
}
</style>
