<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions title="求助单详情">
        <a-descriptions-item label="用户姓名">付小小</a-descriptions-item>
        <a-descriptions-item label="联系电话">18100000000</a-descriptions-item>
        <a-descriptions-item label="状态">菜鸟仓储</a-descriptions-item>
        <a-descriptions-item label="完成日期">浙江省杭州市西湖区万塘路18号</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="处理情况" force-render>
              <div class="antd-table-wrap">
                <s-table style="margin-bottom: 24px" row-key="id" :columns="goodsColumns" :data="loadGoodsData">
                </s-table>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="详情" force-render>
              <div class="antd-table-wrap">
                <a-descriptions title="">
                  <a-descriptions-item label="属性">付小小</a-descriptions-item>
                  <a-descriptions-item label="类型">18100000000</a-descriptions-item>
                </a-descriptions>
                <a-descriptions title="">
                  <a-descriptions-item label="创建时间">菜鸟仓储</a-descriptions-item>
                  <a-descriptions-item label="更新时间">浙江省杭州市西湖区万塘路18号</a-descriptions-item>
                </a-descriptions>
                <a-descriptions title="">
                  <a-descriptions-item label="">
                    <a-col :span="24">
                      <a-form-item label="描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                        <a-textarea placeholder="请输入描述" :rows="5"
                          v-decorator="['remark',  { rules: [ { max:350, message: '描述' }] }]" />
                      </a-form-item>
                    </a-col>
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-list>
            <a-list-item :key="index" v-for="(item, index) in activities">
              <a-list-item-meta>
                <a-avatar slot="avatar" :src="item.user.avatar" />
                <div slot="title">
                  <span>{{ item.user.nickname }}</span>&nbsp;
                  在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                  <span>{{ item.project.action }}</span>&nbsp;
                  <a href="#">{{ item.project.event }}</a>
                </div>
                <div slot="description">{{ item.time }}</div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>

<script>

export default {
  name: "OrdersDetail",
  data () {
    return {
      goodsColumns: [
        {
          title: '处理人',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '处理结果',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '处理时间',
          dataIndex: 'barcode',
          key: 'barcode'
        },
        {
          title: '是否采纳',
          dataIndex: 'price',
          key: 'price',
          align: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                id: '1234561',
                name: '矿泉水 550ml',
                barcode: '12421432143214321',
                price: '2.00',
                num: '1',
                amount: '2.00'
              },
              {
                id: '1234562',
                name: '凉茶 300ml',
                barcode: '12421432143214322',
                price: '3.00',
                num: '2',
                amount: '6.00'
              },
              {
                id: '1234563',
                name: '好吃的薯片',
                barcode: '12421432143214323',
                price: '7.00',
                num: '4',
                amount: '28.00'
              },
              {
                id: '1234564',
                name: '特别好吃的蛋卷',
                barcode: '12421432143214324',
                price: '8.50',
                num: '3',
                amount: '25.50'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      },
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }

}
</script>

<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
