<template>
  <div class="antd-page-content">
    <a-menu mode="horizontal" v-model="currentMenu">
      <a-menu-item v-for="(item,index) in taskTabList" :key="index" @click="statusClickHandle">{{ item }}</a-menu-item>
    </a-menu>
    <a-card>
      <div class="antd-toolbar">
        <div class="antd-toolbar-left">
          <div class="antd-toolbar-title">任务</div>
        </div>
        <div class="antd-toolbar-right">
          <div class="antd-toolbar-item">
            <a-button type="danger">新建</a-button>
          </div>
        </div>
      </div>
      <a-row :gutter="12">
        <a-col :span="15">
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
        </a-col>
        <a-col :span="9">跟踪市场变化情况</a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import {getProjectManageTaskList} from "@/httpsAPI/project/task";

const taskTabList = ['全部任务','未开始','进行中','已完成']
const columns=[
  {
    title:'优先级',
    dataIndex:'taskState'
  },
  {
    title:'任务',
    dataIndex: 'taskNm',
  },
  {
    title:'负责人',
    dataIndex: 'taskPeople'
  },
  {
    title: '预警时间',
    dataIndex: 'taskDate'
  },
  {
    title: '状态',
    dataIndex: 'taskStatus'
  }
]
export default {
  name: "task",
  data(){
    return{
      taskTabList,
      columns,
      loadData:paramer=>{
        return getProjectManageTaskList().then(res=>{
          return res.result
        })
      },
      selectedRowKeys:[],
      selectedRows:[],
      alert:{
        show: false, clear: () => { this.selectedRowKeys = [] }
      },
      rowSelection:{
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      },
      currentMenu:[0]
    }
  },
  methods:{
    statusClickHandle(menu){
      console.log(menu);
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