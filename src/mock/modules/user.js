import Mock from 'mockjs'
import { builder} from '@/mock/util'
import {URL} from '@/mock/url'
const login =()=>{
  return builder({
    userName:'admin',
    roleId:'',
    token:new Date().getTime()
  },'登录成功',200)
}

const userInfo = () =>{
  const info = {
    roleId : "admin",
    username:'管理员',
    permissions:[
      'workplace',
      'project',
      'demand',
      'helpOrder',
      'effect',
      'knowledgeBase',
      'personalDevelopment'
    ]
  }
  return builder(info,'获取用户信息',200)
}

Mock.mock(URL.login,"post",login)
Mock.mock(URL.userInfo,"post",userInfo)