<template>
  <div class="antd-panel">
    <div class="page-search-wrap">
      <a-form layout="inline">
        <a-row :gutter="20">
          <a-col :md="6" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" v-model="queryParams.isTry">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">待处理</a-select-option>
                <a-select-option value="1">处理中</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
                <a-select-option value="1">已归档</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="级别">
              <a-select placeholder="请选择" v-model="queryParams.isTry">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">较高</a-select-option>
                <a-select-option value="1">普通</a-select-option>
                <a-select-option value="1">较低</a-select-option>
                <a-select-option value="1">最低</a-select-option>
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

    <div class="tool-tip">
      <a-button type="primary" @click="createFormEvt">新建</a-button>

      <!-- 新建弹窗 -->
      <add-form v-if="addFormVisible" ref="addForm" @refreshDataList="$refs.table.refresh(true)"></add-form>
      <!-- 详情弹窗 -->
      <detail-form v-if="detailFormVisible" ref="detailForm"></detail-form>
    </div>

    <!-- 动态列表弹出框 -->
    <div class="icon-chang" @click="handleTable">
      <a-icon type="inbox" />
    </div>

    <div class="antd-table-wrap">
      <s-table ref="table" size="default" rowKey="id" :columns='columns' :data="loadData" :pageNum="pageNum">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <template slot="action" slot-scope="text,record">
          <!-- <a-icon type="bell" /> -->
          <a href="javascript:void(0)" class="table-operation-action" @click="detailFormEvt(record)">详情</a>
          <a href="javascript:void(0)" class="table-operation-action" @click="updateFormEvt(record)">编辑</a>
          <a-popconfirm title="确定删除此负责人么？" ok-text="确定" cancel-text="取消" placement="left" @confirm="deleteEvt(record)">
            <a href="javascript:void(0)" class="table-operation-action">删除</a>
          </a-popconfirm>
        </template>
      </s-table>
    </div>
  </div>
</template>

<script>

// import AddForm from './add'
const tableList = [
  {
    value: '知识名称',
    isTrue: true,
  },
  {
    value: '状态',
    isTrue: true,
  },
]
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: "知识名称",
    dataIndex: 'userName',
    isTrue: true
  },
  {
    title: '创作者',
    dataIndex: 'phone',
    isTrue: true
  },
  // {
  //   title:'创作时间',
  //   dataIndex:'phone',
  // },
  // {
  //   title:'最新更新时间',
  //   dataIndex:'phone',
  // },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: '220px'
  }
]
export default {
  name: "Myself",
  data () {
    return {
      tableList,
      checkList: [],
      result: [],
      list: [],
      key: 1,
      tableSelectVisible: false,
      columns,
      pageNum: 1,
      queryParams: {},
      addFormVisible: false,
      updateFormVisible: false,
      detailFormVisible: false,
      loadData: parameter => {
        this.pageNum = parameter.pageNo
        return []
      },
      visible: false,
      confirmLoading: false,
      model: null
    }
  },
  components: {
    // AddForm,
  },
  created () {

  },
  watch: {

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
    // 新建
    createFormEvt () {
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.init()
      })
    },
    // 修改
    updateFormEvt (record) {
      this.updateFormVisible = true
      this.$nextTick(() => {
        this.$refs.updateForm.init(record)
      })
    },
    // 详情
    detailFormEvt (record) {
      this.$router.push({ path: '/knowledge/myself/detail' })
    },
    // 删除
    deleteEvt (item) {
      const that = this
      /*deleteCourseManager(item.id).then(res => {
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
      })*/
    }
  }
}
</script>
<style lang="less" scoped>
.icon-chang {
  font-size: 30px;
  display: inline-block;
  position: fixed;
  right: 150px;
  margin-top: 25px;
  z-index: 1;
}
</style>