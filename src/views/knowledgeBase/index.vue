<template>
  <layout>
    <template slot="headerMenu">
      <div class="header-menu">
        <div class="header-menu-wraper">
          <div class="header-menu-title">知识库</div>
          <a-menu mode="horizontal" v-model="currentMenu">
            <a-menu-item key="Myself">
              <router-link to="Myself">我的知识库</router-link>
            </a-menu-item>
            <a-menu-item key="Baseing">
              <router-link to="Baseing">公共知识库</router-link>
            </a-menu-item>
            <a-menu-item key="Collection">
              <router-link to="Collection">我的收藏</router-link>
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
  data () {
    return {
      currentMenu: ['Myself']
    }
  },
  created () {
    this.currentMenu = [this.$route.name]
  }
}

</script>

<style scoped>
</style>