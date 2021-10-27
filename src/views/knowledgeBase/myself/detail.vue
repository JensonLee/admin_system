<template>
  <div class="antd-panel">
    <a-row class="wrapper" type="flex" :gutter="16">
      <a-col :span="6">
        <div class="tool-tip">
          <a-button class="ant-btn ant-btn-primary" @click="createRootNodeEvt()">+ 新建分类</a-button>
          <br /><br />
          <a-input-search placeholder="请输入" @change="onSearch" />
        </div>

        <!-- 新增弹窗 -->
        <add-form v-if="addFormVisible" ref="addForm" @refreshDataList="loadTreeData"></add-form>
        <!-- 修改弹窗 -->
        <update-form v-if="updateFormVisible" ref="updateForm" @refreshDataList="loadTreeData"></update-form>
        <a-tree :show-line="showLine" :tree-data="treeData" :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent" @expand="onExpand">
          <template slot="custom" slot-scope="item">
            <span @mouseover="handleOver(item)" @mouseout="handleOut(item)">
              <span v-if="item.title.indexOf(searchValue) > -1" @click="onSelectNode(item)">
                {{ item.title.substr(0, item.title.indexOf(searchValue)) }}<span
                  style="color: #f50">{{searchValue}}</span>{{item.title.substr(item.title.indexOf(searchValue) + searchValue.length)}}<span>{{"--"+item.key}}</span>
              </span>
              <span v-else @click="onSelectNode(item)">{{item.title}}</span>
              <span v-show="item.isShow" class="tree-node-handle">
                <a-tooltip placement="bottom" title="新增下级分类">
                  <a-icon type="plus-circle-o" @click="createSubNodeEvt(item)" />
                </a-tooltip>
                <a-tooltip placement="bottom" title="修改分类">
                  <a-icon type="edit" @click="updateNodeEvt(item)" />
                </a-tooltip>
                <a-tooltip placement="bottom" title="删除分类">
                  <a-icon type="minus-circle-o" @click="deleteNodeEvt(item)" />
                </a-tooltip>
              </span>
            </span>
          </template>
        </a-tree>
      </a-col>
      <a-col :span="18">
        <div class="antd-table-wrap">
          <s-table ref="table" rowKey="id" :columns="columns" :data="loadData" :pageNum="pageNum"
            :pagination="{pageSizeOptions:['10', '20','50', '100', '150']}">
            <template slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
            <template slot="createTime" slot-scope="text">
              {{text|createTimeFilter}}
            </template>
          </s-table>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
import STable from '@/components/Table'
// import { getIndustryList, deleteIndustry, getIndustryCourseList } from '@/api/help'
// import AddForm from './add'
// import UpdateForm from './update'
// import SortForm from './sort'

const treeData = [];
const getParentKey = (title, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.title === title)) {
        parentKey = node.key;
      } else if (getParentKey(title, node.children)) {
        parentKey = getParentKey(title, node.children);
      }
    }
  }

  return parentKey;
};
const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: node.title });
    if (node.children) {
      generateList(node.children);
    }
  }
}

const columns = [
  { title: "序号", dataIndex: "serial", scopedSlots: { customRender: 'serial' }, width: 80 },
  { title: "课程编号", dataIndex: "courseNo" },
  { title: "课程名称", dataIndex: "courseName" },
  { title: "创建时间", dataIndex: "createTime", scopedSlots: { customRender: "createTime" } },
  { title: "显示顺序", dataIndex: "sort" },
  { title: "操作", dataIndex: "action", align: 'center', scopedSlots: { customRender: "action" }, width: "158px" }
]

export default {
  data () {
    return {
      showLine: true,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData,
      addFormVisible: false,
      updateFormVisible: false,
      parentId: 0,
      columns,
      pageNum: 1,
      queryParams: {},
      courseNo: '',
      courseName: '',
      industryId: 0,
      sortFormVisible: false,
      loadData: parameter => {
        this.pageNum = parameter.pageNo
        return []
      },
    }
  },
  components: {
    STable,
    // AddForm,
    // UpdateForm,
    // SortForm
  },
  filters: {
    createTimeFilter (type) {
      return moment(type).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  created () {
    this.loadTreeData()
    this.pageSize = 50
  },
  methods: {
    // 重置搜索form
    resetQueryForm () {
      this.queryParams = {}
      this.$refs.table.refresh(true)
    },
    // 新增一级节点
    createRootNodeEvt () {
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.init(this.parentId)
      })
    },
    // 新建子节点
    createSubNodeEvt (item) {
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.init(item.key)
      })
    },
    // 修改节点
    updateNodeEvt (item) {
      this.updateFormVisible = true
      this.$nextTick(() => {
        this.$refs.updateForm.init(item.key)
      })
    },
    // 删除节点
    deleteNodeEvt (item) {
      const that = this
      this.$confirm({
        title: '系统提示',
        content: '确认删除此分类[' + item.title + ']?',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          /*deleteIndustry(item.key).then(res => {
            that.$message.success({
              content: '操作成功',
              duration: 1,
              onClose: () => {
                that.loadTreeData()
              }
            })
          }).catch(error => {
            console.log(error)
          })*/
        },
        onCancel () {
          console.log('Cancel');
        },
      });
    },
    handleOver (item) {
      item.dataRef.isShow = true
    },
    handleOut (item) {
      item.dataRef.isShow = false
    },
    // 选择树形节点
    onSelectNode (item) {
      this.industryId = item.key
      this.$refs.table.refresh(true)
    },
    filterTreeData (arr) {
      arr.map(t => {
        if (t.children && t.children.length) {
          this.filterTreeData(t.children)
        }
        return this.$set(t, 'isShow', false)
      })
    },
    onSearch (e) {
      const value = e.target.value;
      const expandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1 && value != '') {
            return getParentKey(item.title, this.treeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      });
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    loadTreeData () {
      /*getIndustryList().then(res => {
        this.treeData = res.data

        this.filterTreeData(this.treeData)
        generateList(this.treeData);
      }).catch(error => {
        console.log(error)
      })*/
    },
    // 设置显示顺序
    setSortEvt (record) {
      this.sortFormVisible = true
      this.$nextTick(() => {
        this.$refs.sortForm.init(record)
      })
    },
  }
}
</script>

<style lang="less">
.wrapper {
  height: 100%;
  margin: 0 !important;
}
.tree-node-title {
  display: inline-block;
  margin-right: 8px;
}
.tree-node-handle {
  .anticon {
    margin: 4px;
  }
}
</style>