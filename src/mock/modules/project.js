import Mock from 'mockjs'
import { builder,getDate} from '@/mock/util'
import {URL} from '@/mock/url'

const projectList =()=>{
  return builder({
    pageSize:10,
    pageNo:1,
    totalCount:20,
    totalPage:2,
    data:[
      {
        id:"123",
        projectNm:"海洋牧场项目1",
        projectStatus:"0",
        projectFzr:"张三",
        projectStartDate:"2016-09-21",
        projectEndDate:"2016-11-21",
        projectSpeed:"80"
      },
      {
        id:"1243",
        projectNm:"海洋牧场项目2",
        projectStatus:"0",
        projectFzr:"张三",
        projectStartDate:"2016-09-21",
        projectEndDate:"2016-11-21",
        projectSpeed:"80"
      }
    ]
  },'获取成功',200)
}

const reviewList =()=>{
  return builder({
    pageSize:10,
    pageNo:1,
    totalCount:20,
    totalPage:2,
    data:[
      {
        orderNo:'1',
        reviewNm:'Charter DCP',
        reviewStatus:'0',
        reviewDate:'2021-09-10',
        reviewCn:'1/10'
      },
      {
        orderNo:'2',
        reviewNm:'DCP',
        reviewStatus:'1',
        reviewDate:'2021-04-10',
        reviewCn:'2/10'
      },
      {
        orderNo:'3',
        reviewNm:'TR1',
        reviewStatus:'0',
        reviewDate:'2021-05-11',
        reviewCn:'3/10'
      },
      {
        orderNo:'4',
        reviewNm:'CDHP',
        reviewStatus:'1',
        reviewDate:'2021-01-11',
        reviewCn:'4/10'
      }
    ]
  },'成功','200')

}

const taskList = ()=>{
  return builder({
    pageSize:10,
    pageNo:1,
    totalCount:20,
    totalPage:2,
    data:[
      {
        id:'1',
        taskState:1,
        taskNm:'跟踪市场变化情况',
        taskPeople:'陈年年',
        taskDate:'过期2天',
        taskStatus:'1'
      },
      {
        id:'2',
        taskState:2,
        taskNm:'优化市场计划',
        taskPeople:'陈年年',
        taskDate:'',
        taskStatus:'2'
      },
      {
        id:'3',
        taskState:1,
        taskNm:'样品生产准备',
        taskPeople:'陈年年',
        taskDate:'过期5天',
        taskStatus:'3'
      }
    ]
  },'任务列表','200')
}
const taskDataList = ()=>{
  return builder({
    pageSize:10,
    pageNo:1,
    totalCount:20,
    totalPage:2,
    data:[
      {
        id:'1',
        fileNm:'需求文档',
        workType:'快捷开发',
        uploadPeople:'李四',
        fileType:'文档',
        uploadDate:'2021-10-30',
        fileDes:'敏捷开发文档'
      },
      {
        id:'2',
        fileNm:'需求文档',
        workType:'快捷开发',
        uploadPeople:'李四',
        fileType:'文档',
        uploadDate:'2021-10-30',
        fileDes:'敏捷开发文档'
      },
      {
        id:'3',
        fileNm:'需求文档',
        workType:'快捷开发',
        uploadPeople:'李四',
        fileType:'文档',
        uploadDate:'2021-10-30',
        fileDes:'敏捷开发文档'
      },
      {
        id:'4',
        fileNm:'需求文档',
        workType:'快捷开发',
        uploadPeople:'李四',
        fileType:'文档',
        uploadDate:'2021-10-30',
        fileDes:'敏捷开发文档'
      }
    ]
  },'任务资料','200')
}
const deliverablesList = ()=>{
  return builder({
    pageSize:10,
    pageNo:1,
    totalCount:20,
    totalPage:2,
    data:[
      {
        id:'1',
        fileNm:'需求文档',
        toReview:'快捷开发',
        uploadPeople:'张三',
        fileTp:'文档',
        uploadDate:'2021-09-28',
        fileDes:'敏捷开发文档'
      },
      {
        id:'2',
        fileNm:'需求文档',
        toReview:'快捷开发',
        uploadPeople:'张三',
        fileTp:'文档',
        uploadDate:'2021-09-28',
        fileDes:'敏捷开发文档'
      },
      {
        id:'3',
        fileNm:'需求文档',
        toReview:'快捷开发',
        uploadPeople:'张三',
        fileTp:'文档',
        uploadDate:'2021-09-28',
        fileDes:'敏捷开发文档'
      },
      {
        id:'4',
        fileNm:'需求文档',
        toReview:'快捷开发',
        uploadPeople:'张三',
        fileTp:'文档',
        uploadDate:'2021-09-28',
        fileDes:'敏捷开发文档'
      }
    ]
  },'交付物','200')
}
let stageList = ()=>{
  return builder({
    pageSize:10,
    pageNo:1,
    totalCount:4,
    totalPage:1,
    data:[
      {
        id:'1',
        label:"项目阶段1",
        user:'张三',
        start:getDate(-24 * 5),
        duration: 15 * 24 * 60 * 60 * 1000,
        progress: 85,
        type: 'project',
        children:[
          {
            id:'4',
            label:"项目阶段2",
            user:'李四',
            start:getDate(-24 * 4),
            duration: 15 * 24 * 60 * 60 * 1000,
            progress: 85,
            type: 'project',
            parentId:'1',
            children:[
              {
                id:'8',
                label:"项目阶段8",
                user:'Helloword',
                start:getDate(-24 * 4),
                duration: 15 * 24 * 60 * 60 * 1000,
                progress: 85,
                type: 'project',
                parentId:'4',
              }
            ]
          },
          {
            id:'5',
            label:"项目阶段3",
            user:'王五',
            start:getDate(-24 * 3),
            duration: 15 * 24 * 60 * 60 * 1000,
            progress: 85,
            type: 'project',
            parentId:'1'
          }
        ]
      },
      {
        id:'2',
        label:"项目阶段4",
        user:'赵六',
        start:getDate(-24 * 2),
        duration: 15 * 24 * 60 * 60 * 1000,
        progress: 85,
        type: 'project'
      },
      {
        id:'3',
        label:"项目阶段5",
        user:'Jenson',
        start:getDate(-24 * 1),
        duration: 15 * 24 * 60 * 60 * 1000,
        progress: 85,
        type: 'project'
      }
    ]
  },'项目概况','200')
}


const stageGantt = ()=>{
  return builder({
    tasks:[
      {
        id:1,
        label:'项目阶段名称1',
        user:'张三',
        start:getDate(-24*5),
        duration:15 * 24 * 60 * 60 * 1000,
        type:"milestone",
        progress:80,
      },
      {
        id:2,
        label:'项目阶段名称2',
        user:'李四',
        start:getDate(-24*4),
        type:"project",
        duration:4 * 24 * 60 * 60 * 1000,
        progress:85,
        parentId:1,
        style: {
          base: {
            fill: '#1EBC61',
            stroke: '#0EAC51',
          },
        }
      },
      {
        id:3,
        label:'项目阶段名称2',
        user:'李四',
        start:getDate(-24*4),
        type:"project",
        duration:4 * 24 * 60 * 60 * 1000,
        progress:85,
        parentId:2
      }
    ]
  },'甘特图','200')
}

Mock.mock(URL.projectList,"post",projectList)
Mock.mock(URL.projectReviewList,"post",reviewList)
Mock.mock(URL.projectTaskList,"post",taskList)
Mock.mock(URL.projectTaskDataList,"post",taskDataList)
Mock.mock(URL.projectDeliverablesList,"post",deliverablesList)
Mock.mock(URL.projectStageList,"post",stageList)
Mock.mock(URL.projectStageGantt,"post",stageGantt)