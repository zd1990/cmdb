import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import login from '../page/login/login'
import common from '../page/common'
import home from '../page/home/home'
import cmdb from '../page/cmdb/cmdb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/app',
      component: common,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'cmdb',
          name: 'cmdb',
          component: cmdb
        }
      ]
    }
  ]
})
