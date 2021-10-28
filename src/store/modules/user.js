import state from "@/store/state";
import {userInfo,login} from "@/httpsAPI/user";
import storage from 'store'
import {TOKEN} from "@/store/token.config";
import {asyncRouterMap,constantRouterMap} from '@/router/router.config'

function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export default {
  state,
  mutations:{
    SETROLEID(state,id){
      state.roleId = id
    },
    SETROUTER(state,router){
      state.addRouter = router
      state.router = constantRouterMap.concat(router)
    }
  },
  actions:{
    login({commit},params){
      return new Promise((resolve,reject)=>{
        login(params).then(res=>{
          if(res.code ==='10000'){
            storage.set(TOKEN,res.data.token, 7 * 24 * 60 * 60 * 1000)
          }
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    getUserInfo({commit}){
      return new Promise((resolve, reject) => {
        userInfo().then(res=>{
          console.log(res);
          if(res.code==='10000'){
            const result = res.data
            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              /*commit('SET_ROLES', result.role)
              commit('SET_INFO', result)*/
            }

            commit('SETROLEID',res.data.roleId)
          }
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    GenerateRoutes({commit}, role){
      return new Promise(resolve=>{
        const {roles} = role
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SETROUTER',accessedRouters)
        resolve()
      })
    }
  }
}