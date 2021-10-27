import request from '@/utils/request'

export function getIndustryList (parames) {
  return request({
    url: '/course/industry/tree-list',
    method: 'post',
    data: parames
  })
}

// 新建行业分类
export function addIndustry (parames) {
  return request({
    url: '/course/industry/add',
    method: 'post',
    data: parames
  })
}

// 编辑行业分类
export function updateIndustry (parames) {
  return request({
    url: '/course/industry/update',
    method: 'post',
    data: parames
  })
}

// 删除行业分类
export function deleteIndustry (parames) {
  return request({
    url: '/course/industry/delete',
    method: 'post',
    data: [parames]
  })
}

// 行业分类详情
export function detailIndustry (parames) {
  return request({
    url: '/course/industry/detail/' + parames,
    method: 'post',
    data: {}
  })
}

// 行业分类课程列表
export function getIndustryCourseList (parames) {
  return request({
    url: '/course/industry/course-list',
    method: 'post',
    data: parames
  })
}

// 行业分类课程显示顺序设置
export function setIndustryCourseSort (parames) {
  return request({
    url: '/course/industry/sort/setting',
    method: 'post',
    data: parames
  })
}

// 课程分类列表
export function getCategoryList (parames) {
  return request({
    url: '/course/category/tree-list',
    method: 'post',
    data: parames
  })
}

// 新建课程分类
export function addCategory (parames) {
  return request({
    url: '/course/category/add',
    method: 'post',
    data: parames
  })
}

// 编辑课程分类
export function updateCategory (parames) {
  return request({
    url: '/course/category/update',
    method: 'post',
    data: parames
  })
}

// 删除课程分类
export function deleteCategory (parames) {
  return request({
    url: '/course/category/delete',
    method: 'post',
    data: [parames]
  })
}

// 课程分类详情
export function detailCategory (parames) {
  return request({
    url: '/course/category/detail/' + parames,
    method: 'post',
    data: {}
  })
}

// 获取系统生成课程简称
export function getCategoryShortName (parames) {
  return request({
    url: '/course/category/shortname',
    method: 'post',
    data: parames
  })
}

// 课程负责人列表
export function getCourseManagerList (parames) {
  return request({
    url: '/course/manager/list',
    method: 'post',
    data: parames
  })
}

// 新建课程负责人
export function addCourseManager (parames) {
  return request({
    url: '/course/manager/add',
    method: 'post',
    data: parames
  })
}

// 编辑课程负责人
export function updateCourseManager (parames) {
  return request({
    url: '/course/manager/update',
    method: 'post',
    data: parames
  })
}

// 删除课程负责人
export function deleteCourseManager (parames) {
  return request({
    url: '/course/manager/delete',
    method: 'post',
    data: [parames]
  })
}

// 课程负责人详情
export function detailCourseManager (parames) {
  return request({
    url: '/course/manager/detail/' + parames,
    method: 'post',
    data: {}
  })
}
// 负责人课程列表
export function getManagerCourseList (parames) {
  return request({
    url: '/course/manager/course-list',
    method: 'post',
    data: parames
  })
}

// 导出课程负责人
// export function exportHeadSubjectTotal(params){
//   return downloadFile("/course/manager/list-excel", '课程负责人', params, 'post')
// }

// 课程列表

export function uploadImg (parames) {
  return request({
    url: '/sys/upload/img',
    method: 'post',
    data: parames
  })
}

// 修改证书信息
export function updateTrnCert (parames) {
  return request({
    url: '/sys/config/update-trn-cert',
    method: 'post',
    data: parames
  })
}
