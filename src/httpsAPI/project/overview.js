import API from "@/httpsAPI/API";
import request from "@/utils/request";
export function getProjectManageOverviewTask(params) {
  return request({
    url:API.projectOverviewTask,
    method:'post',
    data:params
  })
}