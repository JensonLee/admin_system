<template>
  <div class="antd-panel">
    <h2>个人信息</h2>
    <a-card :bordered="false" class="card">
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" labelAlign="left"
        class="ant-advanced-search-form">
        <a-row :gutter="24">
          <a-col :span="10" style="margin-left:-120px;">
            <a-form-item label="头像">
              <div class="ant-upload-preview">
                <a-upload class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload"
                  :customRequest="customRequest">
                  <div class="mask">
                    <a-icon type="plus" />
                  </div>
                </a-upload>
              </div>
            </a-form-item>
            <a-form-item label="用户名">
              <a-input v-decorator="['userName', {initialValue:userName, rules: [{ message: '请输入用户名'}]}]"
                placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item label="所属部门">
              <a-tree-select placeholder="请选择所属部门" v-decorator="['industryId']" tree-data-simple-mode allowClear
                style="width: 100%" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData" />
            </a-form-item>
            <a-form-item label="职务">
              <a-input v-decorator="['userName', {initialValue:userName, rules: [{ message: '请输入职务'}]}]"
                placeholder="请输入职务" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <p label="电话">电话<span>1566565656</span>
        <a href="javascript:;" @click="phoneChang">
          更改电话绑定
        </a>
      </p>
      <p label="邮箱">邮箱<span>1767357177@qq.com</span>
        <a href="javascript:;" @click="handleLogout">
          更改邮箱绑定
        </a>
      </p>
      <p label="密码">密码
        <a href="javascript:;" @click="handleLogout">
          更改系统密码
        </a>
      </p>

      <p label="负责项目数">负责项目数<span>5</span></p>

    </a-card>
    <span slot="footer" class="dialog-footer" style="margin-left:135px;">
      <a-button @click="dataFormSubmit()">更改信息</a-button>
    </span>
  </div>
</template>
<script>
import { uploadImg, updateTrnCert, addCourseManager } from '@/api/help'
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
    //上传头像
    customRequest (data) {
      console.log('customRequest')
      console.log(data)
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('channel', 4)
      this.saveFile(formData)
    },
    saveFile (formData) {
      console.log('saveFile')
      console.log(formData)
      uploadImg(formData).then(res => {
        console.log(res)
        if (res.code == 10000) {
          this.imageUrl = this.$imgBaseUrl + res.data.name
          updateTrnCert({ backImage: res.data.name }).then(res => {
            this.$message.success('头像更换成功')
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    beforeUpload (file) {
      console.log('beforeUpload')
      console.log(file)
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('仅支持图片上传');
      }
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        this.$message.error('图片不能大于4MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    //更改信息
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
    //更改电话
    phoneChang () {
      this.$router.push({ path: '/personal/settings/phone' })
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
<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
  .ant-advanced-search-form {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
}
.ant-descriptions-row ::v-deep .ant-descriptions-item > span {
  // display: inline-block;
  padding: 5px 20px;
}
.ant-descriptions-item > span > a {
  display: inline-block;
  margin-left: 50px;
}
.card p {
  margin-left: -11px;
  padding: 10px 0px;
  // color: rgb(44, 44, 44);
  span {
    padding: 0px 30px;
  }
}
.card p:nth-child(4) > a {
  padding: 0px 50px;
}
.ant-col {
  // width: 60px;
  margin: 0 !important;
  padding: 0 !important;
}
.ant-col .ant-row ::v-deep.ant-form-item-label-left {
  width: 80px !important;
}
</style>
