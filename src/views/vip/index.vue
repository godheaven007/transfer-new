<template>
  <div class="vip-wrap">
    <div class="vip-box">
      <div class="vip-title">黄金会员</div>
      <div class="vip-info">
        <p><i class="el-icon-success mr5" style="color: #666;"></i>支持自有 <span class="strong">企业支付宝</span> 批量转账</p>
        <p><i class="el-icon-success mr5" style="color: #666;"></i>使用量付通官方支付宝转账 <span class="strong">费率{{ service_charge }}%</span></p>
      </div>
      <div class="vip-price">￥{{ gold_member_price }} / 年</div>
      <div class="establish" @click="buy()">立即开通</div>
    </div>
  </div>
</template>

<script>
import api from "@/util/api";

export default {
  name: "VipIndex",
  data() {
    return {
      service_charge: 0,
      gold_member_price: 0
    }
  },
  methods: {
    buy() {
      this.$confirm('是否确认购买/续费【黄金会员】？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(() => {
        this.$router.push({path: '/purchaseInfo'})
      }).catch(() => {
      });
    }
  },
  mounted() {
    api.getSetting().then(res => {
      this.service_charge = parseFloat(res.data.charge.service_charge) * 100;
      this.gold_member_price = res.data.charge.gold_member_price;
    })
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
@import "@/assets/scss/mixin.scss";

.vip-wrap {
  margin-top: 100px;
  padding: 0 12%;
  .vip-box{
    width: 400px;
    padding: 15px 20px;
    box-shadow: 2px 3px 5px 0px rgba(0,0,0,0.3);
    .vip-title {
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 24px;
      color: #666;
      margin: 0 12px;
      border-bottom: 1px solid #dcdcdc;
      font-weight: 400;
    }
    .vip-info {
      font-size: 16px;
      color: #666;
      line-height: 1.72;
      padding-left: 50px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .vip-price {
      height: 68px;
      line-height: 68px;
      text-align: center;
      font-size: 26px;
      color: #f60;
      font-weight: 700;
    }
  }
}
.strong{
  color: #eb6100;
}
.establish {
  width: 230px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  margin: 0 auto;
  border-radius: 4px;
  cursor: pointer;
  background: #eb6100;
  border-color: #eb6100;
}
</style>