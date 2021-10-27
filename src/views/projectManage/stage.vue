<template>
  <div class="antd-page-content">
    <a-tabs :animated="false">
      <a-tab-pane key="1" tab="项目阶段">
        <stage-table/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="甘特图展示">
        <stage-gantt/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import stageTable from "@/views/projectManage/moudles/stageTable";
import stageGantt from "@/views/projectManage/moudles/stageGantt";

export default {
  name: "stage",
  components:{
    stageGantt,
    stageTable
  }
}
</script>