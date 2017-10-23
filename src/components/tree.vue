<template>
  <li>
    <div :class="{bold: isFolder}" class="treediv">
      <span v-if="isFolder" @click="toggle" @dblclick="changeType"><icon :name="iconname"></icon></span>
      <span v-else @click="toggle" @dblclick="changeType"><icon name="file-o"></icon></span>
      <span @click="toggle" @dblclick="changeType">{{model.name}}</span>
      <span @click="del(model.name)" @mouseover="todel" @mouseout="outdel" class="span_del" :style="{color:'hsl(360,100%,'+hue_del+'%)'}">
        <icon name="minus-circle"></icon>
      </span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.children"
        :model="model">
      </item>
      <li @click="addChild" class="treeli">
        <icon name="plus"></icon>
      </li>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'item',
    props: {
      model: Object
    },
    data: function () {
      return {
        open: false,
        iconname: 'folder',
        hue_del: 90
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children &&
          this.model.children.length
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
          if (this.open) {
            this.iconname = 'folder-open'
          } else {
            this.iconname = 'folder'
          }
        }
      },
      changeType: function () {
        if (!this.isFolder) {
          this.$set(this.model, 'children', [])
          this.addChild()
          this.open = true
        }
      },
      addChild: function () {
        this.model.children.push({
          name: 'new stuff'
        })
      },
      del: function (name) {
        console.log(name)
      },
      todel: function () {
        this.hue_del = 50
        console.log('asdas')
      },
      outdel: function () {
        this.hue_del = 90
      }
    }
  }
</script>

<style lang="scss">
  .item {
    cursor: pointer;
  }

  .treediv {
    text-align: left;
  }

  .treeli {
    text-align: left;
  }

  .bold {
    font-weight: bold;
  }

  .span_del {
    margin-left: 20px;
  }

  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }

  ul li {
    list-style-type: none;
  }

  button {
    background-color: #333333;
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
</style>
