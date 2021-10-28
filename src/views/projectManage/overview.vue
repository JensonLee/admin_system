<template>
<div>
  <a-row :gutter="12">
    <a-col :span="7">
      <a-card :style="{minHeight:'424px'}" title="项目信息" :bordered="false">
        <a-card-meta style="margin-bottom: 20px" title="海洋牧场项目" description="李小二">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta>
        <div class="antd-meta-flex">
          <a-card-meta title="8" description="未开始">
            <a-icon style="color: #4a90e2" type="stop" slot="avatar" />
          </a-card-meta>
          <a-card-meta title="12" description="进行中">
            <a-icon style="color: #f8e71c" type="clock-circle" slot="avatar" />
          </a-card-meta>
          <a-card-meta title="34" description="未开始">
            <a-icon style="color: #50e3c2" type="check-circle" slot="avatar" />
          </a-card-meta>
        </div>
        <a-card-meta style="margin-bottom: 20px;" title="项目计划周期" description="2021年12月31日 -  2022年12月31日">
          <a-icon type="schedule" style="font-size: 24px" slot="avatar" />
        </a-card-meta>
        <a-card-meta title="项目计划周期">
          <a-icon type="hourglass" style="font-size: 24px" slot="avatar" />
          <a-progress :percent="50" status="active" slot="description" />
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="10">
      <a-card title="预警任务" class="antd-overview-col-table" :bordered="false">
        <a slot="extra" href="#">更多>></a>
        <s-table size="small" :columns="columns" rowKey="id" :data="loadTaskData">
          <template slot="eventStatus" slot-scope="text">
            <a-tag color="#f50" v-if="text==='1'">
              较高
            </a-tag>
            <a-tag color="#2db7f5" v-if="text==='2'">
              普通
            </a-tag>
            <a-tag color="#87d068" v-if="text==='3'">
              较低
            </a-tag>
          </template>
        </s-table>
      </a-card>
      <a-card title="预警计划" class="antd-overview-col-table" :bordered="false">
        <a slot="extra" href="#">更多>></a>
        <s-table size="small" :columns="columns" rowKey="id" :data="loadTaskData">
          <template slot="eventStatus" slot-scope="text">
            <a-tag color="#f50" v-if="text==='1'">
              较高
            </a-tag>
            <a-tag color="#2db7f5" v-if="text==='2'">
              普通
            </a-tag>
            <a-tag color="#87d068" v-if="text==='3'">
              较低
            </a-tag>
          </template>
        </s-table>
      </a-card>
    </a-col>
    <a-col :span="7">
      <a-card title="交付物提交数量" :bordered="false" :style="{minHeight:'424px'}">
        图表
      </a-card>
    </a-col>
  </a-row>
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
  <a-row :gutter="12">
    <a-col :span="12">
      <a-card>
        图表
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card>
        公告
      </a-card>
    </a-col>
  </a-row>
</div>
</template>

<script>
import {getProjectManageOverviewTask} from "@/httpsAPI/project/overview";

const columns =[
  {
    title:'名称',
    dataIndex:'eventNm'
  },{
    title: "预警时间",
    dataIndex: "eventTm"
  },{
    title: '优先级',
    dataIndex: 'eventStatus',
    scopedSlots:{customRender:"eventStatus"}
  },{
    title: "负责人",
    dataIndex: "eventCharge"
  }
]
export default {
  name: "overview",
  data(){
    return{
      columns,
      loadTaskData:parameter=>{
        return getProjectManageOverviewTask().then(res=>{
          return res.data
        })
      }
    }
  }
}
</script>

<style lang="less">
.antd-meta-flex{
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  .ant-card-meta{
    flex: 1;
    display: flex;
    align-items: center;
    .ant-card-meta-avatar{
      .anticon{
        font-size: 22px;
      }
    }
    .ant-card-meta-detail{
      overflow: auto;
      .ant-card-meta-title{
        margin-bottom: 0;
      }
    }
  }
}
.antd-overview-col-table{
  .ant-card-body{
    padding: 0;
  }
}
</style>