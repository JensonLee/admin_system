import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "@/router";
import {VueAxios} from "@/utils/request";
import Antd from 'ant-design-vue'
import layout from "@/components/layout/layout";
import STable from '@/components/Table'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import 'ant-design-vue/dist/antd.less'
import './global.less'
import './permission'
Vue.config.productionTip = false
Vue.use(VueAxios)
Vue.use(Antd);
Vue.component('layout',layout)
Vue.component('STable',STable)
Vue.use(VXETable)
if(process.env.NODE_ENV==="development"){
  require('./mock')
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
