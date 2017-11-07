/**
 * Created by Administrator on 2017/11/7.
 */
import axios from 'axios'
import {Loading, Message} from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
let loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({fullscreen: true, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0)', text: 'Loading'})
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
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

export default axios
