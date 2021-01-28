<template>
  <div class="home-page pd20">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="home-left">
          <!--邀请返利-->
          <el-card>
            <div slot="header" class="clearfix">
              <span>邀请返利</span>
            </div>
            <div class="invite-wrap pd20">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-card class="card-wrap" shadow="never">
                    <div class="card-item">
                      <div class="card-title">推广收益</div>
                      <div class="card-num">0</div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card class="card-wrap" shadow="never">
                    <div class="card-item">
                      <div class="card-title">邀请人数</div>
                      <div class="card-num">0</div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card class="card-wrap" shadow="never">
                    <div class="card-item">
                      <div class="card-title">付款人数</div>
                      <div class="card-num">0</div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <div class="mt20 tac"><span class="budgeOrangeRed">付费会员</span>邀请好友购买会员立得20%现金返利</div>
              <div class="invite-url-wrap mt10">
                <el-input class="invite-input" v-model="inviteUrl" readonly size="medium"></el-input>
                <el-button class="invite-btn" size="medium" @click="copyLink">复制</el-button>
              </div>
            </div>
          </el-card>

          <!--系统公告-->
          <el-card class="mt20">
            <div slot="header" class="clearfix">
              <span>系统公告</span>
            </div>
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <i class="el-icon-message-solid budgeOrangeRed mr20"></i>
                  <span>公用支付宝转账超额收费标准</span>
                  <div class="notice-extra">
                    <span class="notice-btn">置顶</span>
                    <span class="notice-time">2019-09-12 10:22:23</span>
                  </div>

                </template>
                <div>转账系统公用支付宝的每位会员每日转账限额是10w元，近来会员转账金额激增，造成公用支付宝压力剧增，因此对于每日超过转账限额10w元的会员做出如下调整： 1、至尊会员，每日转账金额低于10w元（含10w），0手续费，超过10w元低于20w元的转账金额（含20w），收取0.3%手续费，超过20w元的转账金额，收取0.5%手续费，每日转账金额不得超过30w元（含30w）。 2、黄金会员，每日转账金额低于10w元（含10w），0.3%手续费，超过10w元低于20w元的转账金额（含20w），收取0.5%手续费，超过20w元的转账金额，收取0.6%手续费，每日转账金额不得超过30w元（含30w）。 3、普通会员，每日转账金额低于10w元（含10w），0.5%手续费，超过10w元的转账金额，收取0.6%手续费，每日转账金额不得超过30w元（含30w）。</div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <i class="el-icon-message-solid budgeOrangeRed mr20"></i>
                  <span>插件市场正式上线通知!</span>
                  <div class="notice-extra">
                    <span class="notice-btn">置顶</span>
                    <span class="notice-time">2019-07-29 22:44:35</span>
                  </div>
                </template>
                <div>根据近期用户的建议以及需求，我们开发了“插件市场”模块并上线了《订单返款插件》《转账黑名单插件》《转账短信通知插件》三款插件，各位小伙伴可以根据自己的实际需求选择性购买。</div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <i class="el-icon-message-solid budgeOrangeRed mr20"></i>
                  <span>【紧急】关于正确使用公用支付宝的说明</span>
                  <div class="notice-extra">
                    <span class="notice-btn">置顶</span>
                    <span class="notice-time">2019-06-10 18:03:31</span>
                  </div>
                </template>
                <div>为了良好的使用公用支付宝，避免出现不必要麻烦，请各位使用公用在支付宝的用户注意以下规范并严格遵守：</div>
                <div>1、备注内容不得出现微信、支付宝、淘宝、京东以及对应的衍生词、首字母</div>
                <div>2、备注内容不得出现违法违规的词汇以及对应的衍生词，比如博彩，菠菜</div>
                <div>3、备注内容不得出现任何营销词汇，比如加好友，进群等字眼</div>
                <div style="color: rgb(194, 79, 74);">如再有发现直接封禁账号。</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="home-right">
          <!--个人信息-->
          <el-card>
            <div slot="header">
              <span>个人信息</span>
            </div>
            <table class="user-info">
              <tbody>
                <tr>
                  <td>会员账号</td>
                  <td>18551050496</td>
                </tr>
                <tr>
                  <td>绑定QQ</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>会员级别</td>
                  <td>普通会员</td>
                </tr>
                <tr>
                  <td>到期时间</td>
                  <td>2020-04-26 15:26:05</td>
                </tr>
              </tbody>
            </table>
          </el-card>

          <!--新手使用教程-->
          <el-card class="mt20">
            <div slot="header" class="clearfix">
              <span>新手使用教程</span>
            </div>
            <ul class="helper">
              <li class="help-item" v-for="item in videoList" :key="item.id" @click="playVideo(item)">
                <i class="el-icon-video-camera-solid budgeOrangeRed mr20"></i>
                <span>{{item.title}}</span>
              </li>
            </ul>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Util from '@/util';
export default {
  name: "index",
  data() {
    return {
      inviteUrl: '易推客全自动支付宝批量转账系统，无需手续费，秒到账，安全高效，真正解放您的双手http://t.cn/Ai8rdOcx',
      videoList: [
        {
          id: 1000,
          title: '易推客官方支付宝-在线录入转账教程',
          url: '/video/manual.mp4'
        },
        {
          id: 1001,
          title: '易推客官方支付宝-批量上传转账教程',
          url: '/video/batch.mp4'
        }
      ]
    }
  },
  methods: {
    playVideo(obj) {
      this.$video(obj);
    },
    copyLink() {
      Util.copyToClipboard(this.inviteUrl);
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    }
  },
  mounted() {
    // this.axios.get('/test/index/memberList?id=36be5581-5c82-11eb-b243-005056a9f41d').then((res) => {
    //   console.log(res,666);
    // });
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/scss/base.scss";
  @import "@/assets/scss/module.scss";
  .home-page {

  }
  /deep/ .el-collapse-item__arrow {
    margin-left: 5px;
  }
  // 左侧
  .home-left{
    height: 400px;
    //border: 3px solid;
  }
  .invite-url-wrap {
    display: flex;
    .invite-input {

    }
    .invite-btn {
      margin-left: 20px;
      background-color: $baseBg;
      color: #fff;
    }
  }

  // 右侧
  .home-right {
    height: 500px;
    //border: 3px solid red;
  }
  .user-info {
    width: 100%;
    background-color: #fff;
    color: #666;
    min-height: 31px;
    line-height: 31px;
    text-align: center;
    border-collapse: collapse;
    font-size: 14px;
    tr {
      td {
        border: 1px solid #e6e6e6;
        padding: 5px 10px;
        &:first-child {
          width: 20%;
        }
        &:last-child {
          text-align: left;
        }
      }
    }
  }
  .notice-extra{
    margin-left: auto;
    .notice-btn{
      color: #fff;
      display: inline-block;
      width: 50px;
      height: 25px;
      line-height: 25px;
      background-color: #ff5759;
      text-align: center;
      border-radius: 5px;
    }
    .notice-time {
      margin-left: 20px;
    }
  }

  .helper {
    .help-item {
      height: 42px;
      line-height: 42px;
      font-size: 13px;
      font-weight: 500;
      color: #303133;
      border-bottom: 1px solid #EBEEF5;
      cursor: pointer;
    }
  }
</style>