<template>
  <div style="text-align:left">
    <editor v-model="content" @init="editorInit()" lang="sql" theme="chrome" width="500" height="100"></editor>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sourcecode: 'import'
      }
    },
    methods: {
      editorInit: function () {
        require('vue2-ace-editor/node_modules/brace/mode/sql')
        require('vue2-ace-editor/node_modules/brace/theme/chrome')
      }
    },
    components: {editor: require('vue2-ace-editor')}
  }
</script>

<style lang="scss">

</style>
