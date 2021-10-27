<template>
  <div>
    <gantt-elastic ref="gantt" :tasks="tasks" :options="options" :dynamic-style="dynamicStyle"></gantt-elastic>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import ganttElastic from 'gantt-elastic'
import { getProjectManageGantt} from "@/httpsAPI/project/stage";
import {getDate} from "@/mock/util";

let options = {
  maxRows: 100,
  maxHeight: 500,
  title: {
    label: 'Your project title as html (link or whatever...)',
    html: false,
  },
  row: {
    height: 24,
  },
  calendar: {
    hour: {
      display: false,
    },
    day:{
      format:{
        long(date){
          return date.format('DD')+'日'
        }
      }
    },
    month:{
      format:{
        long(date) {
          return date.format('YYYY')+'年'+date.format('MM')+'月';
        }
      }
    }
  },
  chart: {
    progress: {
      bar: false,
    },
    expander: {
      display: true,
    },
  },
  taskList: {
    expander: {
      straight: false,
    },
    columns: [
      {
        id: 1,
        label: 'ID',
        value: 'id',
        width: 40,
      },
      {
        id: 2,
        label: '项目名称',
        value: 'label',
        width: 200,
        expander: true, //开启收缩
        html: true,
        events: {
          click({ data, column }) {
            alert('description clicked!\n' + data.label);
          },
        },
      },
      {
        id: 3,
        label: '负责人',
        value: 'user',
        width: 130,
        html: true,
      },
      {
        id: 3,
        label: '开始日期',
        value: (task) => dayjs(task.start).format('YYYY-MM-DD'),
        width: 78,
      },
      {
        id: 4,
        label: '状态',
        value: (task) => {
          console.log(task)
          return task.type
        },
        width: 68,
      },
      {
        id: 5,
        label: '%',
        value: 'progress',
        width: 35,
        style: {
          'task-list-header-label': {
            'text-align': 'center',
            width: '100%',
          },
          'task-list-item-value-container': {
            'text-align': 'center',
            width: '100%',
          },
        },
      }
    ],
  }
};


export default {
  name: "stageGantt",
  components:{
    ganttElastic
  },
  data(){
    return{
      tasks: [],
      options:options,
      dynamicStyle: {
        'task-list-header-label': {
          'font-weight': 'bold',
        },
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      getProjectManageGantt().then(res=>{
        console.log(res);
        this.tasks = res.result.tasks
      })
    })
  }
}
</script>

<style scoped>

</style>