<template>
  <a-modal
    title="新增项目阶段"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="()=>{$emit('cancel')}"
  >
    <a-form-model ref="addForm" :model="form" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:18}">
      <a-form-model-item label="标题" prop="projectName">
        <a-input v-model="form.projectName"/>
      </a-form-model-item>
      <a-form-model-item label="负责人" prop="masterName">
        <a-input v-model="form.masterName"/>
      </a-form-model-item>
      <a-form-model-item label="日期" prop="startDate">
        <a-range-picker v-model="form.startDate "/>
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-textarea :rows="4" v-model="form.describe" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  name: "stageAdd",
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
      form:{
        projectName:"",
        masterName:"",
        startDate:[],
        describe:''
      },
      rules:{
        projectName:[
          {required:true,message:'请输入项目阶段的标题',trigger: 'change'},
          {min: 3, max: 15, message: '标题名称位数在3-15位', trigger: 'change'}
        ],
        masterName:[
          {required:true,message:'请输入负责人姓名',trigger: 'change'}
        ],
        startDate:[
          {required:true,message:'请选择阶段的开始时间和结束时间',trigger: 'change'}
        ]
      }
    }
  },
  methods:{
    handleOk(){
      this.$refs.addForm.validate(valid =>{
        if (valid) {
          console.log(this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>