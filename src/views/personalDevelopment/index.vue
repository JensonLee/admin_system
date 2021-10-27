<template>
  <layout>
    <template slot="headerMenu">
      <div class="header-menu">
        <div class="header-menu-wraper">
          <div class="header-menu-title">个人提升</div>
          <a-menu mode="horizontal" v-model="currentMenu">
            <a-menu-item key="PersonalDevelopmentCourse">
              <router-link to="course">课程中心</router-link>
            </a-menu-item>
            <a-menu-item key="PersonalDevelopmentRecords">
              <router-link to="learningRecords">学习记录</router-link>
            </a-menu-item>
            <a-menu-item key="PersonalDevelopmentUploadCourse">
              <router-link to="uploadCourse">上传课程</router-link>
            </a-menu-item>
            <a-menu-item key="PersonalDevelopmentTest">
              <router-link to="test">上传课程</router-link>
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
  data() {
    return {
      currentMenu: ['PersonalDevelopmentCourse']
    }
  },
  created() {
    this.currentMenu = [this.$route.name]
  }
}
</script>

<style scoped>

</style>