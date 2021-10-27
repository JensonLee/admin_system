<template>
  <a-card>
    <div class="antd-toolbar">
      <div class="antd-toolbar-left">
        <div class="antd-toolbar-title">交付物</div>
      </div>
      <div class="antd-toolbar-right">
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
    >
    </s-table>
  </a-card>
</template>

<script>
import {getProjectManageDeliverablesList} from "@/httpsAPI/project/deliverables";

const columns=[
  {
    title:'文件名称',
    dataIndex:'fileNm'
  },
  {
    title: '所属评审点',
    dataIndex: 'toReview'
  },
  {
    title: '上传者',
    dataIndex: 'uploadPeople'
  },
  {
    title: '文件类型',
    dataIndex: 'fileTp'
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
        return getProjectManageDeliverablesList(paramer).then(res=>{
          return res.result
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