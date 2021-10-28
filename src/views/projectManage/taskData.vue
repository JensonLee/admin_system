<template>
  <a-card>
    <div class="antd-toolbar">
      <div class="antd-toolbar-left">
        <div class="antd-toolbar-title">任务资料</div>
      </div>
      <div class="antd-toolbar-right">
        <div class="antd-toolbar-item">
          <a-button type="danger">新建</a-button>
        </div>
        <div class="antd-toolbar-item">
          <a-input v-decorator="['taskNm']" placeholder="搜索任务"></a-input>
        </div>
      </div>
    </div>
    <s-table
      rowKey="id"
      :data="loadData"
      size="default"
      ref="table"
      :columns="columns"
      :alert="alert"
      :rowSelection="rowSelection"
    >
    </s-table>
  </a-card>
</template>

<script>
import {getProjectManageTaskDataList} from "@/httpsAPI/project/task";

const columns=[
  {
    title:'文件名称',
    dataIndex:'fileNm'
  },
  {
    title: '所属工作项',
    dataIndex: 'workType'
  },
  {
    title: '上传者',
    dataIndex: 'uploadPeople'
  },
  {
    title: '文件类型',
    dataIndex: 'fileType'
  },
  {
    title: '上传时间',
    dataIndex: 'uploadDate'
  },
  {
    title: '文件描述',
    dataIndex: 'fileDes'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
]
export default {
  name: "taskData",
  data(){
    return {
      form: this.$form.createForm(this, { name: 'searchProject' }),
      columns,
      selectedRowKeys:[],
      selectedRows:[],
      loadData:paramer=>{
        return getProjectManageTaskDataList(paramer).then(res=>{
          return res.data
        })
      },
      alert:{
        show: false, clear: () => { this.selectedRowKeys = [] }
      },
      rowSelection:{
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods:{
    searchHandleSubmit(){

    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style scoped>

</style>