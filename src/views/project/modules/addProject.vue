<template>
  <a-modal
    title="新建项目"
    width="720px"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="()=>{$emit('cancel')}"
  >
    <a-row>
      <a-col :md="12">
        <a-form-model ref="addForm" :model="form" :rules="rules" :label-col="{span:6}" :wrapper-col="{span:18}">
          <a-form-model-item label="项目名称" prop="projectName">
            <a-input v-model="form.projectName"/>
          </a-form-model-item>
          <a-form-model-item label="项目负责人">
            <a-input disabled/>
          </a-form-model-item>
        </a-form-model>
        <a-tabs :animated="false" :default-active-key="currentTab" @change="changeTemplate">
          <a-tab-pane key="1" tab="选择模板">
            <a-list :data-source="templateSelect">
              <a-list-item slot="renderItem" slot-scope="item,index" @click="checkedTemplate(index)" :class="{'choose':chooseIndex===index}">
                <a-list-item-meta
                  :description="item.description"
                >
                  <template slot="title">{{item.templateName}}</template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane key="2" tab="从已有项目配置">
            <a-form layout="inline">
              <a-form-item label="选择要复制的项目：">
                <a-select style="width: 190px;" v-model="selectCheck">
                  <a-select-option  v-for="item in projectSelect" :key="item.id">{{ item.projectName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
            <div>默认复制的数据</div>
            <div>项目组件、工作向类型、权限配置、迭代配置、项目配置</div>
            <div>自定义复制的数据</div>
            <a-checkbox-group v-model="checkedList" :options="plainOptions" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12">
        <img :src="rightImgSrc" alt="">
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import {getProjectTemplateSelect,getProjectSelect} from "../../../httpsAPI/project";

export default {
  name: "addProject",
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    confirmLoading:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      templateSelect:[],
      chooseIndex:0,
      rightImgSrc:'',
      projectSelect:[],
      checkedList:[],
      templateId:"",
      currentTab:'1',
      plainOptions:[
        {value:'工作项数据',label:'工作项数据'},
        {value:'迭代数据',label:'迭代数据'},
        {value:'项目计划',label:'项目计划'},
        {value:'项目成员',label:'项目成员'},
        {value:'项目报表',label:'项目报表'},
        {value:'交付物',label:'交付物（评审点上传的交付物）'},
        {value:'文件',label:'文件 （工作项内上传的文件）'},
        {value:'评审点',label:'评审点（包含目标交付物）'}
      ],
      selectCheck:null,
      form:{
        projectName:"",
      },
      rules:{
        projectName:[
          {required:true,message:'请输入项目名称',trigger: 'change'},
          {min: 3, max: 15, message: '标题名称位数在3-15位', trigger: 'change'}
        ]
      }
    }
  },
  methods:{
    handleOk(){
      this.$refs.addForm.validate(valid =>{
        if (valid) {
          let parames = {
            projectName:this.form.projectName,
          }
          if(this.currentTab ==='1'){
            parames.templateId = this.templateId
          }else if(this.currentTab ==='2'){
            parames.templateType = this.selectCheck
            parames.memberList = this.checkedList
          }
          this.$emit('ok',parames)
          /*addProject(parames).then(res=>{
            console.log(res);
          })*/
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    changeTemplate(key){
      this.currentTab=key
    },
    checkedTemplate(index){
      this.chooseIndex = index
      this.rightImgSrc = this.templateSelect[this.chooseIndex].img
    },
    getTemplateSelect(){
      getProjectTemplateSelect().then(res=>{
        if(res.code === '10000'){
          this.templateSelect = res.data.data
          this.templateId = this.templateSelect[this.chooseIndex].id
          this.rightImgSrc = this.templateSelect[this.chooseIndex].img
        }
      })
    },
    getProjectSelectHandle(){
      getProjectSelect().then(res=>{
        this.projectSelect = res.data.data
        this.selectCheck = this.projectSelect[0].id
      })
    }
  },
  watch:{
    visible(val){
      if(val){
        this.getTemplateSelect()
        this.getProjectSelectHandle()
      }
    }
  }
}
</script>

<style lang="less">
.ant-list-items{
  cursor: pointer;
}
.choose{
  padding-left: 10px;
  border-left: 3px solid #4a90e2;
  .ant-list-item-meta-title,.ant-list-item-meta-description{
    color: #4a90e2;
  }
  .ant-list-item-meta-description{
    font-size: 12px;
  }
}
</style>