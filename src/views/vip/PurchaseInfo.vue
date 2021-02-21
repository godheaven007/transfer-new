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
            prop="member_type"
            label="会员类型">
          <template slot-scope="scope">
            <span v-if="scope.row.member_type == 2">黄金会员</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="member_price"
            label="会员价格">
        </el-table-column>
        <el-table-column
            prop="payment_price"
            label="应付金额">
        </el-table-column>
        <el-table-column
            prop="member_days"
            label="会员期限">
        </el-table-column>
        <el-table-column
            prop="order_number"
            label="订单编号">
        </el-table-column>
      </el-table>

      <div class="total"><b>付款金额</b>:  <span class="strong">{{ totalPrice }} 元</span></div>
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
      totalPrice: 0,
      payUrl: '',
      orderData: []
    }
  },
  methods: {
    // 立即付款
    doSubmit: debounce(function() {
      var _this = this;
      this.$pay({
        payAmount: parseFloat(this.totalPrice),
        qrCodeUrl: this.payUrl,
        callback() {
          _this.$router.push({path: '/index'});
        }
      });
    }, 300)
  },
  mounted() {
    api.updateMember().then(res => {
      this.orderData.push({
        member_days: res.data.member_days,
        member_price: res.data.member_price,
        member_type: res.data.member_type,
        order_number: res.data.order_number,
        payment_price: res.data.payment_price
      });
      this.totalPrice = res.data.payment_price;
      this.payUrl = res.data.qr_url;
    })
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