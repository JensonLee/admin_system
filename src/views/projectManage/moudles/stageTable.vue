<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="stageAddHandleClick" icon="fa fa-plus">新增</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-grid
      border
      row-key
      ref="xTable2"
      align="center"
      class="sortable-tree-demo"
      :scroll-y="{enabled: false}"
      :columns="tableColumn"
      :data="tableTreeData"
      :tree-config="{children: 'children'}"></vxe-grid>
    <stage-add @cancel="()=>{this.stageAddVisible=false}" :visible="stageAddVisible" :confirm-loading="confirmLoading" />
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import Sortable from 'sortablejs'
import {getProjectManageStageList} from "@/httpsAPI/project/stage";
import stageAdd from "@/views/projectManage/moudles/stageAdd";
export default {
  name: "stageTable",
  data(){
    return{
      tableTreeData: [],
      showHelpTip2: false,
      tableColumn: [
        {
          width: 40,
          slots: {
            default: () => {
              return [
                <span class="drag-btn">
                          <a-icon type="menu" />
                        </span>
              ]
            },
            header: () => {
              return [
                <vxe-tooltip v-model={ this.showHelpTip2 } content="按住后可以上下拖动排序！" enterable>
                  <i class="vxe-icon--question" onClick={ () => { this.showHelpTip2 = !this.showHelpTip2 } }></i>
                </vxe-tooltip>
              ]
            }
          }
        },
        { field: 'label',width:200, title: '项目阶段', treeNode: true },
        { field: 'user', title: '负责人' },
        { field: 'start', title: '开始日期' },
        { field: 'type', title: '状态' },
        { field: 'progress', title: '进度' },
        {
          width: 140,
          slots:{
            default:(row)=>{
              return [
                <a-tooltip><template slot="title">编辑</template><a-icon type="form" onClick={()=>this.editHandleClick(row)} /></a-tooltip>,
                <a-tooltip><template slot="title">添加</template><a-icon type="zoom-in" onClick={()=>this.editHandleClick(row)} /></a-tooltip>,
                <a-tooltip><template slot="title">关联</template><a-icon type="apartment" /></a-tooltip>,
                <a-tooltip><template slot="title">详情</template><a-icon type="container" /></a-tooltip>,
                <a-tooltip><template slot="title">删除</template><a-icon type="delete" /></a-tooltip>,
              ]
            },
            header:()=>{
              return [
                '操作'
              ]
            }
          }
        }
      ],
      stageAddVisible:false,
      confirmLoading:false
    }
  },
  components:{
    stageAdd
  },
  beforeDestroy () {
    if (this.sortable2) {
      this.sortable2.destroy()
    }
  },
  methods:{
    ganttComputedData(){
      let arr = []
      this.tableTreeData.map(item=>{
        arr.push(item)
        if(item.children && item.children.length>0){
          item.children.map(child=>{
            arr.push(child)
          })
        }
      })
      this.tasks = arr
    },
    treeDrop () {
      this.$nextTick(() => {
        const xTable = this.$refs.xTable2
        this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          animation: 150,
          onEnd: ({ item, oldIndex }) => {
            const options = { children: 'children' }
            const targetTrElem = item
            const wrapperElem = targetTrElem.parentNode
            const prevTrElem = targetTrElem.previousElementSibling
            const tableTreeData = this.tableTreeData
            const selfRow = xTable.getRowNode(targetTrElem).item
            const selfNode = XEUtils.findTree(tableTreeData, row => row === selfRow, options)
            if (prevTrElem) {
              // 移动到节点
              const prevRow = xTable.getRowNode(prevTrElem).item
              const prevNode = XEUtils.findTree(tableTreeData, row => row === prevRow, options)
              if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
                // 错误的移动
                const oldTrElem = wrapperElem.children[oldIndex]
                wrapperElem.insertBefore(targetTrElem, oldTrElem)
                return this.$XModal.message({ content: '不允许自己给自己拖动！', status: 'error' })
              }
              const currRow = selfNode.items.splice(selfNode.index, 1)[0]
              if (xTable.isTreeExpandByRow(prevRow)) {
                // 移动到当前的子节点
                prevRow[options.children].splice(0, 0, currRow)
              } else {
                // 移动到相邻节点
                prevNode.items.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
              }
            } else {
              // 移动到第一行
              const currRow = selfNode.items.splice(selfNode.index, 1)[0]
              tableTreeData.unshift(currRow)
            }
            // 如果变动了树层级，需要刷新数据
            this.tableTreeData = [...tableTreeData]
            this.ganttComputedData()
          }
        })
      })
    },
    editHandleClick(row){
      console.log(row);
    },
    stageAddHandleClick(){
      this.stageAddVisible=true
    }
  },
  mounted() {
    getProjectManageStageList().then(res=>{
      this.tableTreeData = res.result.data;
      this.ganttComputedData()
    })
    this.treeDrop()
  }
}
</script>

<style lang="less">
.vxe-cell{
  .anticon{
    font-size: 18px;
    margin: 0 3px;
  }
}
</style>