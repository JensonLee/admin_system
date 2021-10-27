import Mock from 'mockjs'
import { builder} from '@/mock/util'
import {URL} from '@/mock/url'

const taskList =()=>{
  return builder({
    pageSize:10,
    pageNo:1,
    totalCount:3,
    totalPage:1,
    data:[
      {
        id:"123",
        eventNm:"跟踪市场变化情况",
        eventTm:"2021-08-23",
        eventCharge:"张三",
        eventStatus:"1"
      },
      {
        id:"1232",
        eventNm:"优化市场计划",
        eventTm:"2016-09-21",
        eventCharge:"李四",
        eventStatus:"2"
      },
      {
        id:"123223",
        eventNm:"优化销售计划",
        eventTm:"2016-09-21",
        eventCharge:"王五",
        eventStatus:"3"
      }
    ]
  },'获取成功',200)
}

Mock.mock(URL.projectOverviewTask,"post",taskList)