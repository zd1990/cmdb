// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('icon', Icon)
axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios
Vue.use(ElementUI)
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App, Icon}
})
