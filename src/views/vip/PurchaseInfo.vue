<template>
  <div class="wrap">
    <div class="list">
      <div class="list-title">订单信息</div>
      <el-table
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center', paddingBottom: 0 }"
          max-height="250"
          border
          :data="orderData">
        <el-table-column
            prop="type"
            label="会员类型">
        </el-table-column>
        <el-table-column
            prop="price"
            label="会员价格">
        </el-table-column>
        <el-table-column
            prop="amount"
            label="应付金额">
        </el-table-column>
        <el-table-column
            prop="limit"
            label="会员期限">
        </el-table-column>
        <el-table-column
            prop="orderNo"
            label="订单编号">
        </el-table-column>
      </el-table>

      <div class="total"><b>付款金额</b>:  <span class="strong">1999 元</span></div>
      <div class="operate">
        <el-button class="ml20 baseBtn submit" @click="doSubmit">立即付款</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@/util';
import api from "@/util/api";
import debounce from 'lodash.debounce'

export default {
  name: "PurchaseInfo",
  data() {
    return {
      orderData: [{
        type: '黄金会员',
        price: '1999.00',
        amount: '1999.00',
        limit: 365,
        orderNo: '20210219112110982901'
      }]
    }
  },
  methods: {
    // 立即付款
    doSubmit: debounce(function() {
      alert('立即付款');
    }, 300)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base";
@import "@/assets/scss/mixin";
.wrap {
  width: 85%;
  margin: 0 auto;
  padding: 40px 0 0 0;
  .list {
    width: 82%;
    margin: 40px auto 0;
    .list-title {
      border-bottom: 2px solid rgb(204, 204, 204);
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .operate {
      margin-top: 20px;
      text-align: right;
      .submit {
        margin-left: 20px;
      }
    }
  }
}
.total {
  text-align: right;
  padding-top: 10px;
  border-top: 2px solid rgb(204, 204, 204);
  margin-top: 30px;
  .strong{
    color: rgb(255, 0, 0);
    font-weight: bold;
  }
}
.baseBtn{
  @include baseBtn;
}
.resetBtn {
  @include resetBtn;
}
</style>