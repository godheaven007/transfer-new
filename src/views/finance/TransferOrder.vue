<template>
  <div class="order-wrap">
    <div class="order-info">
      <div class="order-info-item">
        <div><span class="title">累计充值</span>
          <el-tooltip class="item" effect="dark" content="只统计使用官方支付宝充值的金额" placement="top">
            <el-icon class="el-icon-question helpColor"></el-icon>
          </el-tooltip>
        </div>
        <div class="money"><b>{{ rechargeInfo.recharge_sum }}</b>元</div>
      </div>
      <div class="order-info-item">
        <div><span class="title">累计转账</span>
          <el-tooltip class="item" effect="dark" content="只统计使用官方支付宝转账成功的金额" placement="top">
            <el-icon class="el-icon-question helpColor"></el-icon>
          </el-tooltip>
        </div>
        <div class="money"><b>{{ rechargeInfo.transfer_sum }}</b>元</div>
      </div>
      <div class="order-info-item">
        <div><span class="title">邀请收益</span>
          <el-tooltip class="item" effect="dark" content="邀请好友返利的累计总金额" placement="top">
            <el-icon class="el-icon-question helpColor"></el-icon>
          </el-tooltip>
        </div>
        <div class="money"><b>{{ rechargeInfo.commission }}</b>元</div>
      </div>
      <div class="order-info-item deposit">
        <div><span class="title">账户余额</span></div>
        <div class="money"><b>{{ rechargeInfo.balance }}</b>元</div>
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
                v-model="search.dateRange"
                type="daterange"
                range-separator="-"
                value-format="yyyy-MM-dd"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态" class="ml10">
            <el-select v-model="search.status_text" placeholder="请选择" @change="doStatusChange">
              <el-option
                  v-for="item in search.statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号" class="ml10">
            <el-input  placeholder="请输入订单号" v-model="search.order_number"></el-input>
          </el-form-item>
          <el-form-item class="ml20">
            <el-button type="primary" class="ml20 searchBtn" @click="doSearch()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="order-content">
        <el-table
            id="out-table"
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            :data="recordData">
          <el-table-column
              prop="create_time"
              label="转账时间">
          </el-table-column>
          <el-table-column
              prop="batch_order_number"
              label="订单编号">
          </el-table-column>
          <el-table-column
              prop="amount_sum"
              label="转账金额">
          </el-table-column>
          <el-table-column
              prop="charges"
              label="手续费">
          </el-table-column>
          <el-table-column
              prop="recharge"
              label="充值金额">
          </el-table-column>
          <el-table-column
              label="付款类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">公用支付宝</span>
              <span v-else>微信</span>
            </template>
          </el-table-column>
          <el-table-column
              label="状态">
            <template slot-scope="scope">
              <el-tag :type="setTagType(scope.row.status)">{{ scope.row.status_text }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <!--等待审核-->
              <div v-if="(parseInt(scope.row.status) + 1) == 1">
                <el-button size="mini" type="primary" @click="doDeposit(scope.row.id, scope.row.recharge)">充值</el-button>
                <el-button size="mini" type="danger" @click="cancelDeposit(scope.row.id)">取消</el-button>
              </div>
              <div v-else>
                <el-button size="mini" type="primary" disabled>充值</el-button>
                <el-button size="mini" type="danger" disabled>取消</el-button>
              </div>
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

    <!--提现记录-->
    <el-dialog
        title="提现记录"
        :visible.sync="cashDialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="650px">
      <el-table
          id="cash-table"
          height="250"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
          :data="cashData">
        <el-table-column
            prop="create_time"
            label="日期">
        </el-table-column>
        <el-table-column
            prop="amount"
            label="金额">
        </el-table-column>
        <el-table-column
            label="状态">
          <template slot-scope="scope">
            {{ scope.row.status_text }}
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination2.currentPage"
            :page-sizes="pagination2.pageSizes"
            :page-size="pagination2.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination2.total"
            style="margin-top: 15px; text-align: right;"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/util/api";
import {Message} from 'element-ui';

export default {
  name: "TransferOrder",
  data() {
    return {
      rechargeInfo: {
        recharge_sum: 0,              // 累计充值
        transfer_sum: 0,              // 累计转账
        commission: 0,                // 邀请收益
        balance: 0,                   // 账户余额
      },
      recordData: [],               // 转账订单列表
      search: {
        type: 1,      // 转账类型1:支付宝,2:微信
        dateRange: [],
        status: '0',
        status_text: '全部',
        order_number: '',
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
        ]
      },     // 搜索
      pagination: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 1,
        total: 0
      },            // 转账订单分页
      // 提现记录
      cashData: [],
      cashDialogVisible: false,
      pagination2: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    handleCash() {
      api.getSetting().then(res => {
        let withdrawal = res.data.withdrawal;
        if(!withdrawal.alipay_account) {

        } else {
          return withdrawal;
        }
      }).then(data => {
        api.getCash({
          type: 1,
          payee: data.alipay_account,
          real_name: data.real_name
        }).then(res => {

        })
      })
    },
    handleRecord() {
      this.cashDialogVisible = true;
      api.getCashRecord({
        current_page: this.pagination2.currentPage,
        per_page: this.pagination2.pageSize
      }).then(res => {
        let result = res.data;
        this.pagination2.total = result.total;
        this.cashData = result.data;
      })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.queryList();
    },
    doStatusChange(val) {
      this.search.status = val;
    },
    doSearch() {
      this.queryList();
    },
    queryList() {
      api.getBatchList({
        type: this.search.type,
        start_time: this.search.dateRange[0],
        end_time: this.search.dateRange[1],
        status: this.search.status,
        order_number: this.search.order_number,
        current_page: this.pagination.currentPage,
        per_page: this.pagination.pageSize
      }).then(res => {
        let result = res.data;
        this.pagination.total = result.total;
        this.recordData = result.data;
      })
    },
    // 充值
    doDeposit(_id, amount) {
      var _this = this;
      this.$confirm('是否确认充值？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        api.recharge({
          id: _id,
          type: 1
        }).then(res => {
          this.$pay({
            payAmount: parseFloat(amount),
            qrCodeUrl: res.data.url,
            showClose: true,
            callback() {
              // console.log('轮询订单是否充值成功？');
              _this.queryList();
            }
          });
        })
      }).catch(() => {
      });
    },
    // 取消充值
    cancelDeposit(_id) {
      this.$confirm('确认要取消？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        api.cancelOrder({
          id: _id
        }).then(res => {
          Message.success({
            duration: 1500,
            message: res.msg
          });
          this.queryList();
        })
      }).catch(() => {
      });
    },
    setTagType(status) {
      status = parseFloat(status) + 1;
      if(status == '1') {
        // 1:等待审核
        return 'warning';
      } else if(status == '2') {
        // 2:审核通过
        return 'success';
      }
      // 3:订单取消,4:超时订单
      return 'danger';
    },
    getRechargeInfo() {
      api.getRechargeInfo().then(res => {
        this.rechargeInfo.recharge_sum = res.data.recharge_sum;
        this.rechargeInfo.transfer_sum = res.data.transfer_sum;
        this.rechargeInfo.commission = res.data.commission;
        this.rechargeInfo.balance = res.data.balance;
      });
    }
  },
  mounted() {
    this.queryList();
    this.getRechargeInfo();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
@import "@/assets/scss/mixin.scss";
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
              @include baseBtn;
            }
            &.record {
              @include resetBtn;
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
  .searchBtn{
    @include baseBtn;
  }
</style>