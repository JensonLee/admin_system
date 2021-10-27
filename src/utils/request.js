import axios from "axios";
import {VueAxios} from './axios'

const request =axios.create({
  baseURL:"",
  timeout: 6000
})

const errorHandle = (error)=>{
  return Promise.reject(error)
}
request.interceptors.request.use(config => {
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