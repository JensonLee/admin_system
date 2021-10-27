<template>
  <layout>
    <template slot="headerMenu">
      <div class="header-menu">
        <div class="header-menu-wraper">
          <div class="header-menu-title">项目管理</div>
          <a-dropdown :trigger="['click']" class="header-dropdown">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              瀑布式开发 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <a href="javascript:void(0)">瀑布式开发</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a href="javascript:void(0)">敏捷式开发</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-menu mode="horizontal" v-model="currentMenu">
            <a-menu-item key="ProjectManageOverview">
              <router-link :to="'/projectManage/overview/'+$route.params.projectId">项目概览</router-link>
            </a-menu-item>
            <a-menu-item key="ProjectManageStage">
              <router-link :to="'/projectManage/stage/'+$route.params.projectId">项目阶段</router-link>
            </a-menu-item>
            <a-menu-item key="ProjectManageReview">
              <router-link :to="'/projectManage/review/'+$route.params.projectId">评审点</router-link>
            </a-menu-item>
            <a-menu-item key="Task">
              <router-link :to="'/projectManage/task/'+$route.params.projectId">任务</router-link>
            </a-menu-item>
            <a-menu-item key="TaskData">
              <router-link :to="'/projectManage/taskData/'+$route.params.projectId">任务资料</router-link>
            </a-menu-item>
            <a-menu-item key="Deliverables">
              <router-link :to="'/projectManage/deliverables/'+$route.params.projectId">交付物</router-link>
            </a-menu-item>
            <a-menu-item key="Member">
              <router-link :to="'/projectManage/member/'+$route.params.projectId">成员</router-link>
            </a-menu-item>
            <a-menu-item key="Setting">
              <router-link :to="'/projectManage/setting/'+$route.params.projectId">项目设置</router-link>
            </a-menu-item>
          </a-menu>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      currentMenu:["Overview"]
    }
  },
  created() {
    this.currentMenu = [this.$route.name]
  }
}
</script>

<style scoped>

</style>