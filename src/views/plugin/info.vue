<template>
  <div class="info-wrap">
    <div class="info">
      <div class="buy">
        <div class="buy-left" v-if="curInfo">
          <img :src="`/imgs/plugin${curInfo.id}.png`" style="width: 100%; height: 100%;">
        </div>
        <div class="buy-right">
          <div class="title">{{ curInfo.title }}</div>
          <div class="introduce">{{ curInfo.info }}</div>
          <div class="price">{{ curInfo.price }}元</div>
          <div class="buy-btn" @click="buy">立即购买</div>
        </div>
      </div>
      <div class="video mt20">
        <video :src="`/video/plugin${curInfo.id}.mp4`" controls="controls" autoplay>
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PluginInfo",
  data() {
    return {
      pluginType: '',
      curInfo: {},
      list: {
        type1: {
          id: 1,
          title: '订单返款插件',
          info: '此插件适用于有淘宝、拼多多订单返款需求的用户，支持批量返款到支付宝或微信。每单额外收取手续费0.02元。',
          price: 398,
        },
        type2: {
          id: 2,
          title: '转账黑名单功能',
          info: '仅支持支付宝转账黑名单功能，加入黑名单的支付宝账号将无法提交转账。',
          price: 39.9,
        },
        type3: {
          id: 3,
          title: '短信通知插件',
          info: '购买插件后，如支付宝账号填写的手机号，转账成功后系统即可自动短信通知该用户到账。',
          price: 39.9,
        },
      }
    }
  },
  methods: {
    buy() {
      alert('购买')
    }
  },
  created() {
    console.log(this.curInfo, 'created');
  },
  mounted() {
    this.pluginType = this.$route.query.type || 1;
    this.curInfo = this.list[`type${this.pluginType}`];
  }
}
</script>

<style scoped lang="scss">
  .info-wrap {
    padding: 20px;
    .info{
      width: 100%;
      padding: 30px 40px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
    }
  }
  .buy {
    display: flex;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    .buy-left,
    .buy-right {
      flex: 1;
      flex-shrink: 0;
      height: 320px;
    }
    .buy-right {
      position: relative;
      padding: 20px;
      .title {
        font-weight: 400;
        font-size: 32px;
        color: #303133;
        text-align: center;
      }
      .introduce {
        margin-top: 10px;
        font-size: 16px;
        color: #8b8b8b;
        line-height: 28px;
      }
      .price {
        margin-top: 40px;
        font-weight: 400;
        font-size: 26px;
        color: #ef4e33;
      }
      .buy-btn {
        position: absolute;
        bottom: 0;
        width: 200px;
        height: 52px;
        line-height: 52px;
        background-color: #ff9434;
        border-radius: 4px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        text-align: center;
      }
    }
  }
  .video{
    width: 100%;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    video{
      width:100%;
      height:100%;
      object-fit:cover;
      outline:none;
    }
  }
</style>