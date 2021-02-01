<template>
  <div class="vip-wrap">
    <div class="vip-box">
      <div class="vip-title">黄金会员</div>
      <div class="vip-info">
        <p><i class="el-icon-success mr5" style="color: #666;"></i>支持自有 <span class="strong">企业支付宝</span> 批量转账</p>
        <p><i class="el-icon-success mr5" style="color: #666;"></i>使用易推客官方支付宝转账 <span class="strong">费率0.30%</span></p>
      </div>
      <div class="vip-price">￥1999.00 / 年</div>
      <div class="establish">立即开通</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VipIndex",
  data() {
    return {

    }
  },
  methods: {
    buy() {
      alert('购买插件')
    }
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