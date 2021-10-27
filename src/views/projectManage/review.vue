<template>
  <div>
    <div :style="{padding:'80px 0 20px 0'}">
      <a-steps labelPlacement="vertical" :current="1">
        <a-step title="评审点" >
          <div class="antd-step-icon" slot="icon"></div>
        </a-step>
        <a-step description="2021年07月19日" >
          <div class="antd-step-icon" slot="icon"></div>
          <div slot="title" class="antd-step-title">Charter DCP</div>
          <div slot="subTitle">状态：已完成</div>
        </a-step>
        <a-step description="2021年07月19日" >
          <div class="antd-step-icon" slot="icon"></div>
          <div slot="title" class="antd-step-title">CDCP</div>
          <div slot="subTitle">状态：已完成</div>
        </a-step>
        <a-step description="2021年07月19日" >
          <div class="antd-step-icon" slot="icon"></div>
          <div slot="title" class="antd-step-title">PDCP</div>
          <div slot="subTitle">状态：未完成</div>
        </a-step>
        <a-step description="2021年07月19日" >
          <div class="antd-step-icon" slot="icon"></div>
          <div slot="title" class="antd-step-title">ADCP</div>
          <div slot="subTitle">状态：未完成</div>
        </a-step>
        <a-step description="2021年07月19日" >
          <div class="antd-step-icon" slot="icon"></div>
          <div slot="title" class="antd-step-title">LDCP</div>
          <div slot="subTitle">状态：未完成</div>
        </a-step>
      </a-steps>
    </div>
    <a-card>
      <div class="antd-toolbar">
        <div class="antd-toolbar-left">
          <div class="antd-toolbar-title">评审列表</div>
        </div>
        <div class="antd-toolbar-right">
          <div class="antd-toolbar-item">
            <a-button type="danger">新建</a-button>
          </div>
        </div>
      </div>
      <s-table
        rowKey="orderNo"
        :data="loadData"
        size="default"
        ref="table"
        :columns="columns"
      >

      </s-table>
    </a-card>
  </div>
</template>

<script>
import {getProjectManageReviewList} from "@/httpsAPI/project/review";

const columns=[
  {
    title:'序号',
    dataIndex:'orderNo'
  },
  {
    title:'评审点名称',
    dataIndex: 'reviewNm',
  },
  {
    title:'状态',
    dataIndex: 'reviewStatus'
  },
  {
    title: '完成日期',
    dataIndex: 'reviewDate'
  },
  {
    title: '操作',
    dataIndex: 'action'
  },
  {
    title: '交付物',
    dataIndex: 'reviewCn'
  }
]
export default {
  name: "review",
  data(){
    return{
      columns,
      loadData:paramer=>{
        return getProjectManageReviewList(paramer).then(res=>{
          return res.result
        })
      }
    }
  }
}
</script>

<style scoped>

</style>