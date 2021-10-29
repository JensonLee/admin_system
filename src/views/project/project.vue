<template>
  <div>
    <div class="antd-table-search-wrap">
      <a-row :gutter="12">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" @submit="searchHandleSubmit">
          <a-col :span="8">
            <a-form-item label="项目名称">
              <a-input v-model="queryParames.projectName" placeholder="搜索项目"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-button type="primary" @click="$refs.table.refresh(true)">搜索</a-button>
              <a-button :style="{marginLeft:'20px'}" type="default" @click="queryParames={}">重置</a-button>
            </a-form-item>
          </a-col>
        </a-form>
      </a-row>
    </div>
    <div class="antd-page-content">
      <a-menu mode="horizontal" v-model="currentMenu">
        <a-menu-item v-for="(item,index) in projectStatus" :key="index" @click="statusClickHandle(item.value)">{{ item.title }}</a-menu-item>
      </a-menu>
      <div class="antd-toolbar">
        <div class="antd-toolbar-left">
          <div class="antd-toolbar-title">项目列表</div>
        </div>
        <div class="antd-toolbar-right">
          <div class="antd-toolbar-item">
            <a-button type="danger" @click="addVisible=true">新建</a-button>
          </div>
          <div class="antd-toolbar-item">
            <a-tooltip>
              <template slot="title">
                <span>刷新</span>
              </template>
              <a-icon @click="$refs.table.refresh(true)" type="reload" />
            </a-tooltip>
          </div>
          <div class="antd-toolbar-item">
            <a-tooltip>
              <template slot="title">
                <span>列设置</span>
              </template>
              <a-popover v-model="settingVisible" placement="bottomLeft" trigger="click">
                <a-icon type="setting" />
                <div slot="content" class="antd-draggable-container">
                  <a-checkbox-group v-model="defaultTableList" @change="tableListHandleChange">
                    <div class="antd-draggable-wrapper" v-for="(item,index) in tableListArr" :key="index">
                      <div class="antd-draggable-list-item" :style="{padding:'4px 0'}">
                        <a-checkbox :value="item.dataIndex">
                          {{ item.title }}
                        </a-checkbox>
                      </div>
                    </div>
                  </a-checkbox-group>
                </div>
              </a-popover>
            </a-tooltip>
          </div>
        </div>
      </div>
      <s-table
        size="default"
        ref="table"
        rowKey="id"
        :data="loadData"
        :columns="columns"
        :selections="true"
      >
        <router-link slot="projectName" slot-scope="text,record"  :to="'/projectManage/'+record.id">{{ record.projectName }}</router-link>
        <template slot="status" slot-scope="text,record">
          <a-tag color="#2db7f5" v-if="record.status===0">未开始</a-tag>
          <a-tag color="#f50" v-if="record.status===1">进行中</a-tag>
          <a-tag color="#87d068" v-if="record.status===2">已完成</a-tag>
        </template>
        <template slot="completeRate" slot-scope="text,record">
          <a-progress v-if="record.completeRate===0" :percent="record.completeRate" size="small" status="normal" />
          <a-progress v-if="record.completeRate>0&&record.completeRate<100" :percent="record.completeRate" size="small" status="active" />
          <a-progress v-if="record.completeRate===100" :percent="record.completeRate" size="small" status="success" />
        </template>
      </s-table>
    </div>
    <add-project :visible="addVisible" :confirm-loading="confirmLoading" @ok="addHandleClick" @cancel="addVisible=false"></add-project>
  </div>
</template>

<script>
import { getProjectList,projectAdd} from "@/httpsAPI/project";
import addProject from "./modules/addProject";
const projectStatus = [
  {title:'全部项目',value:''},
  {title:'预警项目',value: '3'},
  {title:'未开始',value: '0'},
  {title:'进行中',value: '2'},
  {title:'已完成',value: '3'},
  {title:'已归档',value: '4'}
  ]

let columns = [
  {title:"项目名称",dataIndex:"projectName",scopedSlots:{customRender:"projectName"},isShow:true},
  {title: "项目状态-可预警",dataIndex: "status",scopedSlots:{customRender:"status"},align:'center',isShow:true},
  {title: "项目负责人",dataIndex: "masterName",align:'center',isShow:true},
  {title: "计划开始日期",dataIndex: "startTime",align:'center',isShow:true},
  {title: "计划结束日期",dataIndex: "endTime",align:'center',isShow:true},
  {title: "工作项完成度",dataIndex: "completeRate",scopedSlots: {customRender: 'completeRate'},isShow:true}
]
export default {
  name: "project",
  data(){
    return{
      projectStatus,
      queryParames:{},
      loadData:parameter=>{
        const requestResult =  Object.assign({},parameter,this.queryParames)
        return getProjectList(requestResult).then(res=>{
          return Object.assign({},res.data,parameter)
        })
      },
      tableListArr:(()=>{
        return columns.filter(item=>{
          return item.dataIndex
        })
      })(),
      defaultTableList:(()=>{
        let arr = [];
        columns.map(item=>{
          if(item.isShow){
            arr.push(item.dataIndex)
          }
        })
        return arr
      })(),
      currentMenu:[0],
      settingVisible:false,
      addVisible:false,
      confirmLoading:false
    }
  },
  computed:{
    columns(){
      return columns.filter(item=>{
        return item.isShow
      })
    }
  },
  components:{
    addProject
  },
  methods:{
    statusClickHandle(val){
      this.queryParames.status = val;
      this.$refs.table.refresh(true)
    },
    searchHandleSubmit(e){
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    tableListHandleChange(checkedVal){
      columns.forEach(item=>{
        if(checkedVal.includes(item.dataIndex)){
          item.isShow=true
        }else {
          item.isShow=false
        }
      })
      console.log(this.columns);
    },
    addHandleClick(parames){
      this.confirmLoading=true
      projectAdd(parames).then(res=>{
        this.confirmLoading=false
        this.addVisible=false
        if(res.code ==='10000'){
          this.$message.success('添加成功')
          this.$refs.table.refresh(true)
        }else {
          this.$message.error(`${res.msg}`)
        }
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>