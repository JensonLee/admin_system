import API from "@/httpsAPI/API";
import request from "@/utils/request";
export function getProjectList(params) {
  return request({
    url:API.projectList,
    method:'post',
    data:params
  })
}

export function getProjectTemplateSelect(params){
  return request({
    url:API.projectTemplateSelect,
    method:'post',
    data:params
  })
}

export function getProjectSelect(params){
  return request({
    url:API.projectSelect,
    method:'post',
    data:params
  })
}
export function projectAdd(params){
  return request({
    url:API.projectAdd,
    method:'post',
    data:params
  })
}