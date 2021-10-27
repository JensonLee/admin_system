import API from "@/httpsAPI/API";
import request from "@/utils/request";
export function getProjectList(params) {
  return request({
    url:API.projectList,
    method:'post',
    data:params
  })
}