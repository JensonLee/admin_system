import Mock from 'mockjs'
import { builder} from '@/mock/util'
import {URL} from '@/mock/url'
const login =()=>{
  return builder({
    userName:'admin',
    roleId:'',
    token:new Date().getTime()
  },'登录成功',"10000")
}

const userInfo = () =>{
  const info = {
    roleId : "admin",
    username:'管理员',
    role:{
      "actionList": "",
      "createTime": "",
      "creatorId": "",
      "dataAccess": "",
      "deleted": 0,
      "describe": "",
      "id": "",
      "name": "",
      permissions:[
        {
          "roleId": "admin",
          "permissionId": "menu",
          "permissionName": "菜单管理",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false},
            {"action": "add","describe": "新增","defaultCheck": false},
            {"action": "update","describe": "修改","defaultCheck": false},
            {"action": "delete","describe": "删除","defaultCheck": false},
            {"action": "choose","describe": "选择","defaultCheck": false},
            {"action": "get","describe": "详情","defaultCheck": false}
          ],
          "actionList":null
        },
        {
          "roleId": "admin",
          "permissionId": "workplace",
          "permissionName": "我的工作台",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false}
          ],
          "actionList":null
        },
        {
          "roleId": "admin",
          "permissionId": "project",
          "permissionName": "项目管理",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false}
          ],
          "actionList":null
        },
        {
          "roleId": "admin",
          "permissionId": "requirement",
          "permissionName": "需求管理",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false}
          ],
          "actionList":null
        },
        {
          "roleId": "admin",
          "permissionId": "worder",
          "permissionName": "求助单",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false}
          ],
          "actionList":null
        },
        {
          "roleId": "admin",
          "permissionId": "report",
          "permissionName": "效能管理",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false}
          ],
          "actionList":null
        },
        {
          "roleId": "admin",
          "permissionId": "wiki",
          "permissionName": "知识库",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false}
          ],
          "actionList":null
        },
        {
          "roleId": "admin",
          "permissionId": "course",
          "permissionName": "个人提升",
          "actionEntitySet": [
            {"action": "query","describe": "查询","defaultCheck": false}
          ],
          "actionList":null
        }
      ]
    }
  }
  return builder(info,'获取用户信息',"10000")
}

Mock.mock(URL.login,"post",login)
Mock.mock(URL.userInfo,"post",userInfo)