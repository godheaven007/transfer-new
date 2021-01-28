<template>
  <div class="order-wrap">
    <div class="order-info">
      <div class="order-info-item">
        <div><span class="title">累计充值</span>
          <el-tooltip class="item" effect="dark" content="只统计使用官方支付宝充值的金额" placement="top">
            <el-icon class="el-icon-question helpColor"></el-icon>
          </el-tooltip>
        </div>
        <div class="money"><b>257288.88</b>元</div>
      </div>
      <div class="order-info-item">
        <div><span class="title">累计转账</span>
          <el-tooltip class="item" effect="dark" content="只统计使用官方支付宝转账成功的金额" placement="top">
            <el-icon class="el-icon-question helpColor"></el-icon>
          </el-tooltip>
        </div>
        <div class="money"><b>257208.88</b>元</div>
      </div>
      <div class="order-info-item">
        <div><span class="title">邀请收益</span>
          <el-tooltip class="item" effect="dark" content="邀请好友返利的累计总金额" placement="top">
            <el-icon class="el-icon-question helpColor"></el-icon>
          </el-tooltip>
        </div>
        <div class="money"><b>0</b>元</div>
      </div>
      <div class="order-info-item deposit">
        <div><span class="title">账户余额</span></div>
        <div class="money"><b>80</b>元</div>
        <div class="deposit-wrap">
            <el-tooltip class="item" effect="dark" content="最低提现金额1元，提现到账时间为T+1" placement="left">
              <el-button class="deposit-btn cash" size="small" @click="handleCash">提现</el-button>
            </el-tooltip>
            <el-button class="deposit-btn record" size="small" @click="handleRecord">提现记录</el-button>
        </div>
      </div>
    </div>
    <div class="order-content-wrap">
      <div class="order-search">
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
          <el-form-item label="订单状态" class="ml10">
            <el-select v-model="search.status" placeholder="请选择">
              <el-option
                  v-for="item in search.statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号" class="ml10">
            <el-input  placeholder="请输入订单号" v-model="search.prop3"></el-input>
          </el-form-item>
          <el-form-item class="ml20">
            <el-button type="primary" class="ml20" @click="doSearch()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="order-content">
        <el-table
            id="out-table"
            :data="recordData">
          <el-table-column
              prop="prop1"
              label="转账时间">
          </el-table-column>
          <el-table-column
              prop="prop2"
              label="订单编号">
          </el-table-column>
          <el-table-column
              prop="prop3"
              label="转账金额">
          </el-table-column>
          <el-table-column
              prop="prop4"
              label="手续费">
          </el-table-column>
          <el-table-column
              prop="prop5"
              label="充值金额">
          </el-table-column>
          <el-table-column
              prop="prop6"
              label="付款类型">
          </el-table-column>
          <el-table-column
              label="状态">
            <el-tag>订单取消</el-tag>
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <el-button size="mini">充值</el-button>
              <el-button
                  size="mini"
                  type="danger">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total"
              style="margin-top: 15px; text-align: right;"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransferOrder",
  data() {
    return {
      recordData: [],
      search: {
        time: null,
        statusList: [
          {
            value: '1',
            label: '等待审核'
          },
          {
            value: '2',
            label: '审核通过'
          },
          {
            value: '3',
            label: '订单取消'
          },
          {
            value: '4',
            label: '超时订单'
          }
        ],
        status: '',
        account: '',
        name: ''
      },
      pagination: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 4,
        total: 100
      }
    }
  },
  methods: {
    handleCash() {
      alert('提现');
    },
    handleRecord() {
      alert('提现记录');
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    doSearch(type) {
      console.log(this.search);
    }
  },
  mounted() {
    this.axios.get('/finance/order').then((res) => {
      this.recordData = res.data;
    })
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
  .order-wrap {
    padding: 20px;
    .order-info {
      display: flex;
      padding: 20px 0;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      .order-info-item {
        flex: 1;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80px;
        border-right: 1px solid #ebeef5;
        .title{
          font-size: 14px;
          color: #909399;
        }
        .money {
          margin-top: 10px;
          b{font-size: 24px;}
        }
        .deposit-wrap {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 100px;
          text-align: center;
          .deposit-btn {
            color: #fff;
            &.cash {
              background-color: $baseBg;
            }
            &.record {
              background-color: rgb(247, 186, 42);
              margin-top: 10px;
            }
          }
        }
      }
    }
    .order-content-wrap {
      padding: 20px;
      margin-top: 20px;
      border: 1px solid #ebeef5;
      .order-search {
        padding-left: 50px;
      }
    }
  }
</style>