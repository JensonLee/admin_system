/**
 * meta 属性字典：permission --权限控制，后端返回字段匹配  title --浏览器标签title设置选用  icon --左侧菜单icon显示 defaultMenu --左侧菜单定位作用
 * @type {({redirect: string, path: string, component: (function(): Promise<*>), children: [{path: string, component: function(): Promise<*>, meta: {defaultMenu: string, permission: [string], title: string}, name: string}, {path: string, component: function(): Promise<*>, meta: {defaultMenu: string, permission: [string], title: string}, name: string}], meta: {icon: string, permission: [string], title: string}, name: string}|{redirect: string, path: string, component: (function(): Promise<*>), children: [{path: string, component: function(): Promise<*>, meta: {defaultMenu: string, permission: [string], title: string}, name: string}], meta: {icon: string, permission: [string], title: string}, name: string}|{path: string, component: (function(): Promise<*>), meta: {icon: string, permission: [string], title: string}, name: string}|{path: string, component: (function(): Promise<*>), meta: {icon: string, permission: [string], title: string}, name: string}|{path: string, component: (function(): Promise<*>), meta: {icon: string, permission: [string], title: string}, name: string})[]}
 */
export const asyncRouterMap = [
  {
    path: "/",
    name: 'Workplace',
    component: () => import('@/views/workplace'),
    meta: {permission: ['workplace'], icon: 'apartment', title: '我的工作台'},
    redirect: "/workplace/dashboard",
    children: [
      {
        path: "/workplace/dashboard",
        name: 'Dashboard',
        component: () => import('@/views/workplace/dashboard'),
        meta: {permission: ['workplace'], title: '概览仪表盘', defaultMenu: "Workplace"}
      },
      {
        path: "/workplace/working",
        name: 'Working',
        component: () => import('@/views/workplace/working'),
        meta: {permission: ['workplace'], title: '工时', defaultMenu: "Workplace"}
      }
    ]
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('@/views/project'),
    meta: {permission: ['project'], icon: 'project', title: '项目管理'},
    redirect: '/project/index',
    children: [
      {
        path: '/project/index',
        name: 'ProjectIndex',
        component: () => import('@/views/project/project'),
        meta: {permission: ['project'], title: '项目管理', defaultMenu: "Project"},
      }
    ]
  },
  {
    path:"/projectManage/:projectId",
    name:"ProjectManage",
    component:()=>import('@/views/projectManage'),
    redirect:'/projectManage/overview/:projectId',
    hidden:true,
    children:[
      {
        path: "/projectManage/overview/:projectId",
        name:"ProjectManageOverview",
        component:()=>import('@/views/projectManage/overview'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      },
      {
        path: "/projectManage/stage/:projectId",
        name:"ProjectManageStage",
        component:()=>import('@/views/projectManage/stage'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      },
      {
        path: "/projectManage/review/:projectId",
        name:"ProjectManageReview",
        component:()=>import('@/views/projectManage/review'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      },
      {
        path: "/projectManage/task/:projectId",
        name:"ProjectManageTask",
        component:()=>import('@/views/projectManage/task'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      },
      {
        path: "/projectManage/taskData/:projectId",
        name:"ProjectManageTaskData",
        component:()=>import('@/views/projectManage/taskData'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      },
      {
        path: "/projectManage/deliverables/:projectId",
        name:"ProjectManageDeliverables",
        component:()=>import('@/views/projectManage/deliverables'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      },
      {
        path: "/projectManage/member/:projectId",
        name:"ProjectManageMember",
        component:()=>import('@/views/projectManage/member'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      },
      {
        path: "/projectManage/setting/:projectId",
        name:"ProjectManageSetting",
        component:()=>import('@/views/projectManage/setting'),
        meta: {permission:['project'],title:'项目管理',defaultMenu:'Project'}
      }
    ]
  },
  {
    path: '/demand',
    name: 'Demand',
    component: () => import('@/views/demand'),
    meta: {permission: ['demand'], icon: 'file-add', title: '需求管理'},
    redirect:'/demand/manage',
    children:[
      {
        path: '/demand/manage',
        name: 'DemandManage',
        component: () => import('@/views/demand/demand'),
        meta: {permission: ['demand'], defaultMenu:"Demand", title: '需求管理'}
      }
    ]
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/helpOrder'),
    meta: {permission: ['helpOrder'], icon: 'tags', title: '求助单'},
    redirect:'/help/Order/ordersEnt',
    children:[
      {
        path: '/help/Order/ordersEnt',
        name: 'OrdersEnt',
        component: () => import('@/views/helpOrder/ordersEnt/index'),
        meta: { permission: ['helpOrder'], defaultMenu: 'Help', title: '已收到' }
      },
      {
        path: '/help/Order/ordersEnt/detail',
        name: 'OrdersDetail',
        component: () => import('@/views/helpOrder/ordersEnt/detail'),
        meta: { permission: ['helpOrder'], defaultMenu: 'HelpDetail', title: '已收到详情' }
      },
      {
        path: '/help/Order',
        name: 'HelpOrder',
        component: () => import('@/views/helpOrder/orders'),
        meta: {permission: ['helpOrder'],defaultMenu:'Help', title: '求助单'}
      }
    ]
  },
  {
    path: '/effect',
    name: 'Effect',
    component: () => import('@/views/effect'),
    meta: {permission: ['effect'], icon: 'audit', title: '效能管理'},
    redirect:"/effect/manage",
    children:[
      {
        path: '/effect/manage',
        name: 'EffectManage',
        component: () => import('@/views/effect/effect'),
        meta: {permission: ['effect'],defaultMenu:'Effect', title: '效能管理'},
      }
    ]
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('@/views/knowledgeBase'),
    meta: {permission: ['knowledgeBase'], icon: 'cloud-server', title: '知识库'},
    redirect:"/knowledge/myself",
    children:[
      {
        path: '/knowledge/myself',
        name: 'Myself',
        component: () => import('@/views/knowledgeBase/myself/index'),
        meta: { permission: ['knowledgeBase'], defaultMenu: "Knowledge", title: '我的知识库' }
      },
      {
        path: '/knowledge/myself/detail',
        name: 'Myself',
        component: () => import('@/views/knowledgeBase/myself/detail'),
        meta: { permission: ['dashboard'], defaultMenu: "Knowledge", title: '我的知识库详情' }
      },
      {
        path: '/knowledge/baseing',
        name: 'Baseing',
        component: () => import('@/views/knowledgeBase/baseing/index'),
        meta: { permission: ['dashboard'], defaultMenu: "Knowledge", title: '公共知识库' }
      },
      {
        path: '/knowledge/Collection',
        name: 'Collection',
        component: () => import('@/views/knowledgeBase/Collection/index'),
        meta: { permission: ['dashboard'], defaultMenu: "Knowledge", title: '我的收藏' }
      }
    ]
  },
  {
    path: '/PersonalDevelopment',
    name: 'PersonalDevelopment',
    component: () => import('@/views/personalDevelopment'),
    meta: {permission: ['personalDevelopment'], icon: 'solution', title: '个人提升'},
    redirect:"/personalDevelopment/course",
    children:[
      {
        path: '/personalDevelopment/course',
        name: 'PersonalDevelopmentCourse',
        component: () => import('@/views/personalDevelopment/course'),
        meta: {permission: ['personalDevelopment'],defaultMenu:"PersonalDevelopment", title: '课程中心'}
      },
      {
        path: '/personalDevelopment/learningRecords',
        name: 'PersonalDevelopmentRecords',
        component: () => import('@/views/personalDevelopment/learningRecords'),
        meta: {permission: ['personalDevelopment'],defaultMenu:"PersonalDevelopment", title: '学习记录'}
      },
      {
        path: '/personalDevelopment/uploadCourse',
        name: 'PersonalDevelopmentUploadCourse',
        component: () => import('@/views/personalDevelopment/uploadCourse'),
        meta: {permission: ['personalDevelopment'],defaultMenu:"PersonalDevelopment", title: '上传课程'}
      },
      {
        path: '/personalDevelopment/test',
        name: 'PersonalDevelopmentTest',
        component: () => import('@/views/personalDevelopment/test'),
        meta: {permission: ['personalDevelopment'],defaultMenu:"PersonalDevelopment", title: '上传课程'}
      }
    ]
  }
]

export const constantRouterMap = [
  {
    path: '/login',
    name: "Login",
    component: () => import("@/views/login"),
    meta: {title: "登录"}
  }
]