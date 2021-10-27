<template>
  <layout>
    <template slot="headerMenu">
      <div class="header-menu">
        <div class="header-menu-wraper">
          <div class="header-menu-title">我的工作台</div>
          <a-menu mode="horizontal" v-model="currentMenu">
            <a-menu-item key="Dashboard"><router-link to="dashboard">概览仪表盘</router-link></a-menu-item>
            <a-menu-item key="Working"><router-link to="working">工时</router-link></a-menu-item>
          </a-menu>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>

export default {
  name: "workplace",
  data(){
    return{
      currentMenu:['dashboard']
    }
  },
  created() {
    this.currentMenu = [this.$route.name]
  }
}
</script>

<style scoped>

</style>