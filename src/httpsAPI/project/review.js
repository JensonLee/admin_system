import API from "@/httpsAPI/API";
import request from "@/utils/request";
export function getProjectManageReviewList(params) {
  return request({
    url:API.projectReviewList,
    method:'post',
    data:params
  })
}