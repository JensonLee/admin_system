import request from "@/utils/request";
import API from "@/httpsAPI/API";

export function login(params) {
  return request({
    url:API.login,
    method:'post',
    data:params
  })
}

export function userInfo(params) {
  return request({
    url:API.userInfo,
    method:'post',
    data:params
  })
}