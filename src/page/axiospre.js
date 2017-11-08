/**
 * Created by Administrator on 2017/11/7.
 */
import axios from 'axios'
import {Loading, Message} from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
let loadinginstace
let t
axios.interceptors.request.use(config => {
  // element ui Loading方法
  console.log(config)
  t = setTimeout(function () {
    loadinginstace = Loading.service({fullscreen: true})
  }, 300)
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {      // 响应成功关闭loading
  console.log('end')
  clearTimeout(t)
  try {
    loadinginstace.close()
  } catch (err) {
  }
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

export default axios
