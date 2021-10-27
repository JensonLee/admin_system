<template>
  <div>
    <div class="antd-table-search-wrap">
      <a-row :gutter="12">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" @submit="searchHandleSubmit">
          <a-col :span="8">
            <a-form-item label="项目名称">
              <a-input v-decorator="['projectName']" placeholder="搜索项目"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-button type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
          </a-col>
        </a-form>
      </a-row>
    </div>
    <div class="antd-page-content">
      <a-menu mode="horizontal" v-model="currentMenu">
        <a-menu-item v-for="(item,index) in projectStatus" :key="index" @click="statusClickHandle">{{ item.title }}</a-menu-item>
      </a-menu>
      <div class="antd-toolbar">
        <div class="antd-toolbar-left">
          <div class="antd-toolbar-title">项目列表</div>
        </div>
        <div class="antd-toolbar-right">
          <div class="antd-toolbar-item">
            <a-button type="danger">新建</a-button>
          </div>
          <div class="antd-toolbar-item">
            <a-tooltip>
              <template slot="title">
                <span>刷新</span>
              </template>
              <a-icon type="reload" />
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
        <router-link slot="projectNm" slot-scope="text,record"  to="/projectManage/876543">{{ record.projectNm }}</router-link>
      </s-table>
    </div>
  </div>
</template>

<script>
import { getProjectList} from "@/httpsAPI/project";
const projectStatus = [
  {title:'全部项目',value:'all'},
  {title:'预警项目',value: ''},
  {title:'未开始',value: ''},
  {title:'进行中',value: ''},
  {title:'已完成',value: ''},
  {title:'已归档',value: ''}
  ]

let columns = [
  {title:"项目名称",dataIndex:"projectNm",scopedSlots:{customRender:"projectNm"},isShow:true},
  {title: "项目状态-可预警",dataIndex: "projectStatus",align:'center',isShow:true},
  {title: "项目负责人",dataIndex: "projectFzr",align:'center',isShow:true},
  {title: "计划开始日期",dataIndex: "projectStartDate",align:'center',isShow:true},
  {title: "计划结束日期",dataIndex: "projectEndDate",align:'center',isShow:true},
  {title: "工作项完成度",dataIndex: "projectSpeed",isShow:false}
]
export default {
  name: "project",
  data(){
    return{
      projectStatus,
      loadData:parameter=>{
        return getProjectList(parameter).then(res=>{
          return res.result
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
      form: this.$form.createForm(this, { name: 'searchProject' })
    }
  },
  computed:{
    columns(){
      return columns.filter(item=>{
        return item.isShow
      })
    }
  },
  methods:{
    statusClickHandle(item){
      console.log(item);
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
    }
  }
}
</script>

<style scoped>

</style>