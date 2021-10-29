const proxy = '/proxy'   ///proxy
const API = {
  login:proxy+'/user/login',
  userInfo : proxy+'/user/profile/userInfo',
  projectList: proxy+"/project/list",                                       //项目列表
  projectTemplateSelect: proxy+"/project/template-select",                  //项目管理-新建项目-模板列表
  projectSelect: proxy+"/project/project-select",                           //项目管理-新建项目-已有项目列表
  projectAdd: proxy+"/project/add",                                         //项目管理-新建项目
  projectOverviewTask: proxy+"/project/manage/over/task",
  projectReviewList: proxy+"/project/manage/review/list",
  projectTaskList: proxy+"/project/manage/task/list",
  projectTaskDataList: proxy+"/project/manage/taskData/list",
  projectDeliverablesList: proxy+"/project/manage/deliverables/list",
  projectStageList: proxy+"/project/manage/stage/list",
  projectStageGantt: proxy+"/project/manage/stage/gantt",
}

export default API