import router from "@/router";
import {asyncRouterMap} from '@/router/router.config'
import {resetRouter} from "@/router";
import {TOKEN} from "@/store/token.config";
import storage from 'store'
import store from '@/store'


//免登陆路由名单
const allowList = ['login']
const loginPath = "/login"
const defaultPath = '/workplace'

router.beforeEach((to,from,next)=>{
  if(storage.get(TOKEN)){
    if(to.path ===loginPath){
      next({path: defaultPath})
    }else {
      if (store.getters.roleId===''){
        resetRouter()
        store.dispatch('getUserInfo').then(res=>{
          const roles = res.data && res.data.role
          //4.0版本的router已经弃用addRouters,使用addRouter代替，勿升级router
          store.dispatch('GenerateRoutes', {roles}).then(()=>{
            router.addRoutes(store.getters.addRouter)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({...to, replace: true})
            } else {
              // 跳转到目的路由
              next({path: redirect})
            }
          })
        })
      }else {
        next()
      }
    }
  }else {
    if (allowList.includes(to.name)) {
      next()
    }else {
      //路由无限跳转问题解决
      if(to.path===loginPath){
        next()
      }else {
        next({path: loginPath, query: {redirect: to.fullPath}})
      }
    }
  }

})