<template>
  <div class="plugin-wrap">
    <div class="plugin-title">
      <div class="title">插件市场</div>
      <p>各类转账插件按需选购</p>
    </div>
    <div class="plugin-tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部插件" name="all">
          <div class="plugin-box-wrap">
            <div class="plugin-box mr30" v-for="item of allList" :key="item.id">
              <div class="plugin-box-content">
                <img :src="`/imgs/plugin${item.id}.png`" width="300" height="200" :alt="item.title">
                <div class="plugin-content-hide">
                  <div class="title">{{ item.title }}</div>
                  <p v-for="info of item.info">{{ info }}</p>
                  <el-button class="buyBtn" size="medium" @click="buy(item.id)">立即购买</el-button>
                </div>
              </div>
              <div class="pugin-info">
                <p>{{ item.title }}</p>
                <em>{{ item.price }}元</em>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已购买" name="bought">
          <p>已购买</p>
        </el-tab-pane>
        <el-tab-pane label="未购买" name="buying">
          <p>未购买</p>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
export default {
  name: "PluginIndex",
  data() {
    return {
      activeName: 'all',
      allList: [
          {
            id: 1,
            title: '订单返款插件',
            info: ['适用于订单返款需求用户','支持创建订单手机表单', '支持支付宝、微信批量返款', '支持授权自动审核以及手动审核'],
            price: 398
          },
          {
            id: 2,
            title: '转账黑名单功能',
            info: ['支持支付宝转账黑名单','加入黑名单将无法转账'],
            price: 39.9
          },
          {
            id: 3,
            title: '短信通知插件',
            info: ['自助购买短信0.05元/条','如支付宝账号是手机号', '转账成功后自动发送短信'],
            price: 39.9
          }
      ]
    }
  },
  methods: {
    buy(type) {
      this.$router.push({
        path: '/plugininfo',
        query: {
          type: type
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
@import "@/assets/scss/mixin.scss";

.plugin-wrap {
  padding: 20px 12%;
  .plugin-title {
    text-align: center;
    .title{
      margin-top: 20px;
      font-weight: 400px;
      font-style: normal;
      font-size: 28px;
    }
    p{
      margin-top: 30px;
    }
  }
}
.plugin-tab /deep/ {
  margin-top: 40px;
  .el-tabs__item {
    &.is-active,
    &:hover{color: $baseColor;}
  }
  .el-tabs__active-bar {
    background-color: $baseColor;
  }
}
.plugin-box-wrap {
  display: flex;
  .plugin-box {
    border: 1px solid #e4ecf3;
    padding: 10px;
    .plugin-box-content {
      position: relative;
      width: 300px;
      height: 200px;
      overflow: hidden;
      &:hover .plugin-content-hide{
        top: 0;
      }
      .plugin-content-hide {
        transition: all .3s linear;
        position: absolute;
        top: 100%;
        width: 100%;
        height: 100%;
        background-color: #e4e4e4;
        color: #999;
        line-height: 1.5;
        text-align: center;
        padding: 10px;
        .title {
          font-weight: 400px;
          font-style: normal;
          font-size: 18px;
          color: #000;
          margin-bottom: 10px;
        }
        .buyBtn {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          background-color: #f56c6c;
          border-color: #f56c6c;
        }
      }
    }
    .pugin-info {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      em {
        margin-left: auto;
        font-style: normal;
        color: rgb(255, 51, 0);
      }
    }
  }
}


</style>