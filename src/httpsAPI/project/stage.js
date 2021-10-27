import API from "@/httpsAPI/API";
import request from "@/utils/request";
export function getProjectManageStageList(params) {
  return request({
    url:API.projectStageList,
    method:'post',
    data:params
  })
}

export function getProjectManageGantt(params) {
  return request({
    url:API.projectStageGantt,
    method:'post',
    data:params
  })
}