<template>
  <a-modal title="编辑求助单" :width="720" :visible="visible" :confirm-loading="confirmLoading" @cancel="handleCancel">
    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @keyup.enter.native="dataFormSubmit()">
      <a-row>
        <a-col :span="12">
          <a-form-item label="姓名">
            <a-input v-decorator="['userName', {initialValue:userName, rules: [{required: true, message: '请输入姓名'}]}]"
              placeholder="请输入姓名" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="求助单名称">
            <a-input v-decorator="['userName', {initialValue:userName,rules: [{required: true, message: '请输入求助单名称'}]}]"
              placeholder="请输入名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="求助单状态">
            <a-tree-select placeholder="请选择求助单状态" v-decorator="['industryId']" tree-data-simple-mode allowClear
              style="width: 100%" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-item label="求助单提交人">
            <a-input v-decorator="['phone', {rules: [{required: true, message: '请输入求助单提交人'}]}]"
              placeholder="请输入求助单提交人" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="优先级">
            <a-tree-select placeholder="请选择优先级" v-decorator="['industryId']" tree-data-simple-mode allowClear
              style="width: 100%" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-item label="所属项目">
            <a-tree-select placeholder="请选择所属项目" v-decorator="['industryId']" tree-data-simple-mode allowClear
              style="width: 100%" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="截止时间">
            <a-range-picker style="width: 100%" v-decorator="[
                  'expire_date',
                  {rules: [{ required: true, message: '请选择截止时间'}]}
                ]" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-item label="描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-textarea placeholder="请输入描述" :rows="4"
              v-decorator="['remark',  { rules: [ { max:150, message: '描述' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
    <span slot="footer" class="dialog-footer">
      <a-button @click="visible = false">取消</a-button>
      <a-button class="ant-btn ant-btn-primary" @click="dataFormSubmit()">确定</a-button>
    </span>
  </a-modal>
</template>
<script>
// import {getIndustryList} from '@/api/business'
import { addCourseManager } from '@/api/help'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      treeData: [],
    }
  },
  methods: {
    // loadIndustryTree() {
    //     return getIndustryList().then(res=>{
    //         this.treeData =  res.data
    //     })
    // },
    dataFormSubmit (e) {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }

        console.log('Received values of form: ', values);
        addCourseManager(values).then(res => {
          if (res.code == 10000) {
            this.$message.success({
              content: '操作成功',
              duration: 1,
              onClose: () => {
                this.form.resetFields();
                this.visible = false;
                this.$emit('refreshDataList')
              }
            })
          } else {
            this.$message.error({
              content: res.msg,
              duration: 1
            })
          }

        })
      });
    },
    handleCancel (e) {
      this.visible = false;
    },
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields();

        this.loadIndustryTree()
      });
    }
  }
}
</script>