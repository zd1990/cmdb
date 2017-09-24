import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import login from '../page/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      component: Hello
    },
    {
      path: '/login',
      component: login
    }
  ]
})
