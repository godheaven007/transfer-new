<template>
  <div class="record-wrap">
    <div class="record">
      <div class="record-nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="支付宝记录" name="zfb">
            <!--搜索-->
            <div class="search-wrap">
              <el-form :inline="true">
                <el-form-item label="日期范围">
                  <el-date-picker
                      v-model="search.time"
                      type="datetimerange"
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="转账状态" class="ml10">
                  <el-select v-model="search.status" placeholder="请选择">
                    <el-option
                        v-for="item in search.statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支付宝账号" class="ml10">
                  <el-input  placeholder="请输入支付宝账号" v-model="search.zfbAccount"></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="ml10">
                  <el-input  placeholder="请输入姓名" v-model="search.name"></el-input>
                </el-form-item>
                <el-form-item class="ml20">
                  <el-button type="primary" class="ml20" @click="doSearch">搜索</el-button>
                  <el-button type="primary" class="ml20" @click="doExport">导出</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="search-content">
              <el-table
                  :data="recordData">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="orderNo"
                    label="商户订单号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="支付宝账号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="转账类型">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="微信记录" name="wx">
            敬请期待！
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="record-container">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransferRecord",
  data() {
    return {
      activeName: 'zfb',
      search: {
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        statusList: [
            {
              value: '0',
              label: '全部'
            },
            {
              value: '1',
              label: '等待审核'
            },
            {
              value: '2',
              label: '等待转账'
            },
            {
              value: '3',
              label: '转账成功'
            },
            {
              value: '4',
              label: '转账异常'
            },
            {
              value: '5',
              label: '转账失败'
            },
            {
              value: '6',
              label: '已提现'
            },
            {
              value: '7',
              label: '转账取消'
            },
            {
              value: '8',
              label: '账号异常'
            }
        ],
        status: '',
        zfbAccount: '',
        name: ''
      },
      recordData: []
    };
  },
  mounted() {
    this.axios.get('/finance/record').then((res) => {
      this.recordData = res.data;
    })
  },
  methods: {

    handleClick(tab, event) {
      console.log(tab, event);
    },
    doSearch() {
      console.log(this.search);
    },
    doExport() {
      alert('导出')
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
  .record-wrap {
    padding: 20px;
    .record {
      width: 100%;
      padding: 30px 40px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
    }
  }
  .search-wrap {
    border-bottom: 1px solid #ebeef5;;
  }
  .record-nav /deep/ {
    .el-tabs__item {
      &.is-active,
      &:hover{color: $baseColor;}
    }
    .el-tabs__active-bar {
      background-color: $baseColor;
    }
  }

</style>