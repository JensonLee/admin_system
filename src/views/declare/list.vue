<template>
  <div class="antd-panel">
    <div class="tool-tip">
      <!-- 动态列表弹出框 -->
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

    <div class="antd-table-wrap">
      <s-table ref="table" size="default" rowKey="id" :columns='columns' :data="loadData" :pageNum="pageNum">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
      </s-table>
    </div>
  </div>
</template>

<script>
import STable from '@/components/Table'
import { getCourseManagerList, deleteCourseManager } from '@/api/help'
const oldColumn = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: "项目名称",
    dataIndex: 'userName',
    isTrue: true
  },
  {
    title: '部门',
    dataIndex: 'phone',
    isTrue: true
  },
  // {
  //   title:'级别',
  //   dataIndex:'phone',
  //   scopedSlots:{customRender: 'status'}
  // },
  // {
  //   title:'类型',
  //   dataIndex:'phone',
  //   scopedSlots:{customRender: 'status'}
  // },
  // {
  //   title:'预算规模(万元)',
  //   dataIndex:'phone'
  // },
  // {
  //   title:'课题名称',
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
      plainOptions: ['序号', '项目名称', '部门', '级别', '类型', '预算规模(万元)', '操作'],
      value: ['序号', '项目名称', '操作'],
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
    onChange () {
      this.columns = []
      this.value.forEach((item) => {
        this.oldColumn.forEach((e) => {
          if (e.title == item) {
            this.columns.push(e)
            return
          }
        })
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