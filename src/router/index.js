import Vue from 'vue'
import Router from 'vue-router'
import errpage from '../page/errorpage'
import login from '../page/login/login'
import common from '../page/common'
import tree from '../page/tree/tree'
import cmdb from '../page/cmdb/cmdb'
import sql from '../page/sql/sql'
import test from '../page/test/test_tree'
import task from '../page/tasklog/tasklog'
import auth from '../page/auth/auth'
import axios from 'axios'
import {UrlsCheckLogin} from '../page/urls'
import store from '../store'

Vue.use(Router)
// axios.defaults.withCredentials = true
// axios.defaults.headers.common['Content-type'] = 'application/json'
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true

export default new Router({
  routes: [
    {
      path: '/errorpage',
      name: 'errorpage',
      component: errpage
    },
    {
      path: '/test',
      name: 'test',
      component: test
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
          path: 'tree',
          name: 'tree',
          component: tree
        },
        {
          path: 'cmdb',
          name: 'cmdb',
          component: cmdb
        },
        {
          path: 'sql',
          name: 'sql',
          component: sql
        },
        {
          path: 'task',
          name: 'task',
          component: task
        },
        {
          path: 'auth',
          name: 'auth',
          component: auth
        }
      ],
      beforeEnter: (to, from, next) => {           // 跳转之前通过cookie检测是否登入，如果没有则跳转到登入界面
        console.log('go to %s', from)
        axios.get(UrlsCheckLogin).then(function (response) {
          let ret = response.data.ret
          if (ret === 0) {
            let username = response.data.username
            let role = response.data.role
            store.commit('RECODE_USER_NAME', username)
            store.commit('RECODE_USER_ROLE', role)
            next()
          } else {
            next('/login')
          }
        }).catch(function (error) {
          console.log('check login err')
          console.log(error)
          next('/errorpage')
        })
      }
    }
  ]
})
