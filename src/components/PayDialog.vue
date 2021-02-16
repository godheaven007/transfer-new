<template>
  <div class="pay-wrap">
    <div class="pay-overlay"></div>
    <div class="pay-container">
      <div class="pay-head">
        <div class="title">付款</div>
        <div class="close" @click="closePay()"></div>
      </div>
      <div class="pay-body">
        <h3>支付宝充值</h3>
        <div class="amount">{{ payAmount }}元</div>
        <div class="qr-code">
          <img :src="qrCodeUrl">
        </div>
      </div>
      <div class="pay-foot">请在一分钟内完成付款!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayDialog",
  props: {
    payAmount: {
      type: Number,
      require: true
    },
    qrCodeUrl: {
      type: String,
      require: true
    }
  },
  methods: {
    closePay() {
      this.$emit('emptyInstance');
      this.$destroy();
      this.$el.remove();
    }
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
    width:480px;
    height:450px;
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
    }
  }
}
</style>