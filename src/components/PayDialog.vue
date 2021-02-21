<template>
  <div class="pay-wrap">
    <div class="pay-overlay"></div>
    <div class="pay-container">
      <div class="pay-head">
        <div class="title">付款</div>
        <div class="close" @click="closePay()" v-if="showClose"></div>
      </div>
      <div class="pay-body">
        <h3>支付宝充值</h3>
        <div class="amount">{{ payAmount }}元</div>
        <div class="qr-code">
          <img :src="qrCodeUrl">
        </div>
      </div>
      <div class="pay-foot">
        <span>请在一分钟内完成付款,付款后请根据您的实际情况点击下面按钮！</span>
      </div>
      <div class="pay-operate">
        <el-button @click="payFail()">付款失败</el-button>
        <el-button type="primary" @click="paySuccess()">付款成功</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayDialog",
  props: {
    payAmount: {
      type: Number,
      required: true
    },
    qrCodeUrl: {
      type: String,
      required: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: function(){}
    }
  },
  data() {
    return {
      // 不需要轮询订单是否充值成功，后端不支持
      // timer: null
    }
  },
  methods: {
    closePay() {
      // clearInterval(this.timer);
      this.$emit('emptyInstance');
      this.$destroy();
      this.$el.remove();
    },
    payFail() {
      this.closePay();
    },
    paySuccess() {
      this.callback();
      this.closePay();
    }
  },
  mounted() {
    // this.timer = setInterval(() => {
    //   this.callback();
    // }, 1000);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixin.scss";
.pay-wrap {
  .pay-overlay{
    @include position(fixed);
    background-color:#333333;
    opacity:.7;
    z-index:10;
  }
  .pay-container{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:10;
    width:540px;
    height:500px;
    background-color: #fff;
    opacity:1;
    .pay-head {
      .title {
        height: 40px;
        line-height: 40px;
        text-indent: 1em;
      }
      .close {
        position:absolute;
        top:10px;
        right:10px;
        @include bgImg(20px,20px,'/imgs/icon-close.png');
        cursor:pointer;
        z-index:11;
      }
    }
    .pay-body {
      h3 {
        color: #606266;
        font-size: 18px;
        text-align: center;
      }
      .amount {
        color: rgb(255, 108, 0);
        text-align: center;
        margin: 20px 0;
      }
      .qr-code {
        text-align: center;
        img {
          width: 240px;
          height: 240px;
        }
      }
    }
    .pay-foot {
      text-align: center;
      color: #f00;
      margin-top: 20px;
      .tips {
        color: #666;
      }
    }
    .pay-operate {
      margin-top: 20px;
      padding-right: 20px;
      text-align: right;
    }
  }
}
</style>