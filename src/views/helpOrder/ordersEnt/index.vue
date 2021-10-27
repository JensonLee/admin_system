<template>
  <div class="antd-page-content">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="已收到" force-render>
        <div class="page-search-wrap" :style="{padding:'20px'}">
          <a-form layout="inline">
            <a-row :gutter="20">
              <a-col :md="6" :sm="24">
                <a-form-item label="状态">
                  <a-select placeholder="请选择" v-model="queryParams.isTry">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">待处理</a-select-option>
                    <a-select-option value="2">处理中</a-select-option>
                    <a-select-option value="3">已完成</a-select-option>
                    <a-select-option value="4">已归档</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="级别">
                  <a-select placeholder="请选择" v-model="queryParams.isTry2">
                    <a-select-option value="a">全部</a-select-option>
                    <a-select-option value="b">较高</a-select-option>
                    <a-select-option value="c">普通</a-select-option>
                    <a-select-option value="f">较低</a-select-option>
                    <a-select-option value="e">最低</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="resetQueryForm">重置</a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="antd-toolbar">
          <div class="antd-toolbar-left">
            <div class="antd-toolbar-title">求助单</div>
          </div>
          <div class="antd-toolbar-right">
            <div class="antd-toolbar-item">
              <a-button type="danger" @click="createFormEvt">新建</a-button>
            </div>
            <div class="antd-toolbar-item">
              <div class="icon-chang" @click="handleTable">
                <a-dropdown v-model="isShow">
                  <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <a-icon type="inbox" />
                  </a>
                  <a-menu slot="overlay" @click="handleMenuClick">
                    <a-menu-item key="1">
                      <a-checkbox-group v-model="value" name="checkboxgroup" :options="plainOptions" @change="onChange" />
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </div>
          </div>
        </div>
        <div class="antd-table-wrap">
          <s-table ref="table" size="default" rowKey="id" :columns='columns' :data="loadData" :pageNum="pageNum">
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}
            </span>
            <span slot="status" slot-scope="text, record">
              <span v-if="record.sex == 0">待处理</span>
              <span v-if="record.sex == 1">处理中</span>
              <span v-if="record.sex == 1">已完成</span>
              <span v-if="record.sex == 1">已归档</span>
            </span>
            <template slot="action" slot-scope="text,record">
              <a href="javascript:void(0)" class="table-operation-action" @click="detailFormEvt(record)">详情</a>
              <a-popconfirm title="确定删除此负责人么？" ok-text="确定" cancel-text="取消" placement="left"
                @confirm="deleteEvt(record)">
                <a href="javascript:void(0)" class="table-operation-action">删除</a>
              </a-popconfirm>
            </template>
          </s-table>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="已发出" force-render>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import STable from '@/components/Table'
import storage from 'store'
import { getCourseManagerList, deleteCourseManager } from '@/httpsAPI/help'
import AddForm from './add'
// import UpdateForm from './update'
const oldColumn = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: "求助单名称",
    dataIndex: 'userName',
    isTrue: true
  },
  {
    title: '所属项目',
    dataIndex: 'phone',
    isTrue: true
  },
  // {
  //   title:'求助单状态',
  //   dataIndex:'phone',
  //   scopedSlots:{customRender: 'status'}
  // },
  // {
  //   title:'级别',
  //   dataIndex:'phone',
  //   scopedSlots:{customRender: 'status'}
  // },
  // {
  //   title:'求助单处理人',
  //   dataIndex:'phone'
  // },
  // {
  //   title:'预计完成时间',
  //   dataIndex:'phone'
  // },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: '220px'
  }
]
export default {
  name: "OrdersEnt",
  data () {
    return {
      plainOptions: ['序号', '求助单名称', '所属项目', '操作'],
      value: ['序号', '求助单名称', '操作'],
      isShow: false,
      tableSelectVisible: false,
      columns: [],
      oldColumn,
      pageNum: 1,
      queryParams: {},
      addFormVisible: false,
      loadData: parameter => {
        this.pageNum = parameter.pageNo
        return getCourseManagerList(Object.assign(parameter, this.queryParams)).then(res => {
          return res.data
        })
      },
      visible: false,
      confirmLoading: false,
      model: null
    }
  },
  components: {
    STable,
    AddForm,
    // UpdateForm,
  },
  created () {
    this.onChange()
  },

  methods: {
    // 重置搜索form
    resetQueryForm () {
      this.queryParams = {}
      this.$refs.table.refresh(true)
    },
    //动态表头
    handleTable () {
      this.tableSelectVisible = true
    },
    handleMenuClick (e) {
      if (e.key == null) {
        this.isShow = false;
      }
    },
    onChange (checkedValues) {
      console.log(checkedValues, "checkedValues")
      this.columns = []
      this.value.forEach((item) => {
        this.oldColumn.forEach((e) => {
          if (e.title == item) {
            this.columns.push(e)
            storage.set(this.columns, 7 * 24 * 60 * 60 * 1000)
            console.log(this.columns, "colums")
            return
          }
        })
      })
    },
    // 新建
    createFormEvt () {
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.init()
      })
    },
    // 详情
    detailFormEvt (record) {
      this.$router.push({ path: '/help/Order/ordersEnt/detail' })
    },
    // 删除
    deleteEvt (item) {
      const that = this
      deleteCourseManager(item.id).then(res => {
        if (res.code == 10000) {
          that.$message.success({
            content: '操作成功',
            duration: 1,
            onClose: () => {
              that.$refs.table.refresh(true)
            }
          })
        } else {
          that.$message.error({
            content: res.msg,
            duration: 1
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.icon-chang {
  font-size: 30px;
  float: right;
}
</style>