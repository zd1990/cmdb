// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('icon', Icon)
Vue.use(ElementUI)
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App, Icon}
})
