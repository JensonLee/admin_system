import axios from "axios";
import {VueAxios} from './axios'
import storage from 'store'
import {TOKEN} from '@/store/token.config'
const request =axios.create({
  baseURL:"",
  timeout: 6000
})

const errorHandle = (error)=>{
  return Promise.reject(error)
}
request.interceptors.request.use(config => {
  const token = storage.get(TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['token'] = token
  }
  return config
}, errorHandle)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandle)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}
export default request

export {
  installer as VueAxios,
  request as axios
}