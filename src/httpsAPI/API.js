const proxy = ''   ///proxy
const API = {
  login:proxy+'/user/login',
  userInfo : proxy+'/user/profile/userInfo',
  projectList: proxy+"/project/list",
  projectOverviewTask: proxy+"/project/manage/over/task",
  projectReviewList: proxy+"/project/manage/review/list",
  projectTaskList: proxy+"/project/manage/task/list",
  projectTaskDataList: proxy+"/project/manage/taskData/list",
  projectDeliverablesList: proxy+"/project/manage/deliverables/list",
  projectStageList: proxy+"/project/manage/stage/list",
  projectStageGantt: proxy+"/project/manage/stage/gantt",
}

export default API