import state from "@/store/state";
import {userInfo,login} from "@/httpsAPI/user";
import storage from 'store'
import {TOKEN} from "@/store/token.config";
import {asyncRouterMap} from '@/router/router.config'

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
    if (hasPermission(roles, route)) {
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
    }
  },
  actions:{
    login({commit},params){
      return new Promise((resolve,reject)=>{
        login(params).then(res=>{
          storage.set(TOKEN,res.result.token, 7 * 24 * 60 * 60 * 1000)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    getUserInfo({commit}){
      return new Promise((resolve, reject) => {
        userInfo().then(res=>{
          commit('SETROLEID',res.result.roleId)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    GenerateRoutes({commit}, roles){
      return new Promise(resolve=>{
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SETROUTER',accessedRouters)
        resolve()
      })
    }
  }
}