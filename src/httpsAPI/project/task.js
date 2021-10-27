import API from "@/httpsAPI/API";
import request from "@/utils/request";
export function getProjectManageTaskList(params) {
  return request({
    url:API.projectTaskList,
    method:'post',
    data:params
  })
}

export function getProjectManageTaskDataList(params) {
  return request({
    url:API.projectTaskDataList,
    method:'post',
    data:params
  })
}