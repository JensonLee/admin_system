import API from "@/httpsAPI/API";
import request from "@/utils/request";
export function getProjectManageDeliverablesList(params) {
  return request({
    url:API.projectDeliverablesList,
    method:'post',
    data:params
  })
}