<template>
  <layout>
    <template slot="headerMenu">
      <div class="header-menu">
        <div class="header-menu-wraper">
          <div class="header-menu-title">求助单</div>
          <a-menu mode="horizontal" v-model="currentMenu">
            <a-menu-item key="OrdersEnt">
              <router-link to="">详情</router-link>
            </a-menu-item>
            <!-- <a-menu-item key="Working"><router-link to="working">已出发</router-link></a-menu-item> -->
          </a-menu>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
export default {
  name: "indexDetail",
  data () {
    return {
      currentMenu: ['OrdersDetail']
    }
  },
  created () {
    this.currentMenu = [this.$route.name]
  }
}

</script>

<style scoped>
</style>