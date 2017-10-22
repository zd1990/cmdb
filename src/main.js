// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import ElementUI from 'element-ui'
// import VueHighlightJS from 'vue-highlightjs'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import App from './App'
import 'highlight.js/styles/default.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('icon', Icon)
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
Vue.prototype.$ajax = axios
Vue.use(ElementUI)
// Vue.use(VueHighlightJS)
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App, Icon}
})
