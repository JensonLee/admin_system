<template>
  <a-layout class="layout-wrap">
    <a-layout-sider class="layout-header-slide" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline"
              :default-selected-keys="[$route.meta.defaultMenu?$route.meta.defaultMenu:$route.name]">
        <template v-for="menu in slideMenu">
          <a-menu-item v-if="!menu.hidden" :key="menu.name">
            <router-link :to="menu.path">
              <a-icon :type="menu.meta.icon"/>
              <span>{{ menu.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-header-top">
      <div :style="{width:'100%'}">
        <a-layout-header class="header-wrap">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <slot name="headerMenu"></slot>
          <div class="topbar-right-wrap">
            <div class="topbar-right">
              <div class="topbar-item" :class="{'search-ui':isSearch}">
                <a-tooltip placement="bottom">
                  <template slot="title">搜索</template>
                  <a-icon type="search" @click="searchShowHandle"/>
                </a-tooltip>
                <input type="text" class="search-input" ref="searchInput" @keypress="searchHandle" placeholder="请输入搜索内容">
              </div>
              <div class="topbar-item">
                <a-tooltip placement="bottom">
                  <template slot="title">新建项目</template>
                  <a-icon type="plus-circle"/>
                </a-tooltip>
              </div>
              <div class="topbar-item">
                <a-tooltip placement="bottom">
                  <template slot="title">帮助</template>
                  <a-icon type="question-circle"/>
                </a-tooltip>
              </div>
              <div class="topbar-item">
                <a-tooltip placement="bottom">
                  <template slot="title">配置中心</template>
                  <a-icon type="setting"/>
                </a-tooltip>
              </div>
              <div class="topbar-item">
                <a-tooltip placement="bottom">
                  <template slot="title">消息</template>
                  <a-icon type="bell"/>
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-layout-header>
      </div>
      <a-layout-content class="layout-content-page-wrap">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import headerMenu from "@/components/layout/modules/headerMenu";

export default {
  name: "layout",
  data() {
    return {
      collapsed: false,
      slideMenu: [],
      currentMenu: ['dashboard'],
      isSearch:false
    }
  },
  components: {
    headerMenu
  },
  methods:{
    searchShowHandle(){
      this.isSearch=!this.isSearch
      this.$refs.searchInput.focus()
    },
    searchHandle(ev){
      if(ev.code==="Enter"){
        console.log("开始搜索操作")
      }
    }
  },
  computed: {
    ...mapGetters(['addRouter'])
  },
  created() {
    this.slideMenu = this.addRouter
  }
}
</script>