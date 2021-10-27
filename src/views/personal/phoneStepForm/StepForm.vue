<template>
  <page-header-wrapper>
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <template v-slot:content>
      将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
    </template>
    <a-card :bordered="false">
      <p style="font-size:16px">个人信息>更改电话</p>
      <div class="box">
        <p>为确定你是本人操作，请输入当前账户密码并继续</p>
      </div>
      <a-steps class="steps" :current="currentTab">
        <a-step title="身份验证"></a-step>
        <a-step title="设置新电话"></a-step>
      </a-steps>
      <div class="content">
        <step1 v-if="currentTab === 0" @nextStep="nextStep" />
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" />
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
  },
  data () {
    return {
      currentTab: 0,
      // form
      form: null
    }
  },
  methods: {

    // handler
    nextStep () {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
}
.box {
  width: 750px;
  height: 40px;
  line-height: 40px;
  border: 2px rgba(226, 226, 226, 0.6) solid;
  border-left: #1890ff 3px solid;
  margin-bottom: 30px;
}
.box > p {
  margin-left: 10px;
}
</style>
