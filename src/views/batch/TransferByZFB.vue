<template>
  <div class="wrap">
    <custom-step :currentStep="1"></custom-step>
    <ul class="box-wrap">
      <li class="box">
        <div class="item">
          <div class="title">自有企业支付宝转账</div>
          <p>使用自己的企业支付宝账户进行</p>
          <p>付款无需在系统中充值无任何手续费，单</p>
          <p>笔最低<em> 1 </em>元，每日限额<em> 100 </em>万元，没有笔数限制。</p>
          <el-button size="medium" class="baseBtn" @click="selectSelfMode">选择</el-button>
        </div>
      </li>
      <li class="box">
        <div class="item">
          <div class="title">量付通官方支付宝转账</div>
          <p>借用量付通官方企业支付宝账户进行</p>
          <p>转账，需提前充值到该账户，手续费 <em>{{ serviceCharge }}</em>%，单笔</p>
          <p>最低<em> 1 </em>元，每日限额<em> 10 </em>万元。</p>
          <el-button size="medium" class="baseBtn" @click="selectZbfMode">选择</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CustomStep from "@/components/CustomStep";
import Storage from '@/util/storage';
import api from "@/util/api";

export default {
  name: "TransferByZFB",
  components: {
    CustomStep
  },
  data() {
    return {
      serviceCharge: 0
    }
  },
  methods: {
    selectSelfMode() {
      let level = Storage.getItem('level');
      if(level == '2') {
        // 黄金会员
        Storage.setItem('mode', 2);     // 转账账户类型,1:官方账户,2:企业账户
        this.$router.push({path: 'transferByZFB/mode'});
      } else {
        // 普通会员
        this.$confirm('您的会员级别不能使用自有企业支付宝转账，是否升级？点击确认跳转到购买会员页面。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false
        }).then(() => {
          this.$router.push({path: '/vip'});
        }).catch(() => {
        });
      }
    },
    selectZbfMode() {
      Storage.setItem('mode', 1);
      this.$router.push({path: 'transferByZFB/mode'});
    }
  },
  mounted() {
    let charge = Storage.getItem('charge');
    this.serviceCharge = parseFloat(charge.service_charge) * 100;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base";
@import "@/assets/scss/mixin";
.wrap {
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 0 0;
  .box-wrap {
    display: flex;
    margin-top: 100px;
    .box {
      display: flex;
      justify-content: center;
      width: 50%;
      &:first-child{
        border-right: 1px solid rgb(233, 233, 233);
      }
    }
  }
  .item {
    text-align: center;
    color: #666;
    line-height: 1.8;
    .title {
      font-size: 18px;
      margin-bottom: 30px;
    }
  }
}
em{
  font-style: normal;
  color: #009688;
}
.baseBtn{
  margin-top: 20px;
  @include baseBtn;
}
</style>