<template>

  <div class="base-button success" @click="getMobileCode">
    <span ref="code">获取验证码</span>
  </div>
</template>

<script>
import Util from '@/util';
export default {
  name: "MobileCode",
  data() {
    return {
      totalTime: 60,
      timer: null,
      clickAble: true
    }
  },
  props: {
    phone: {
      type: String|Number,
      default: ''
    }
  },
  methods: {
    getMobileCode() {
      if(!/^1\d{10}$/.test(this.phone)) {
        this.$message({
          message: '手机号格式不正确',
          type: 'warning'
        });
        return false;
      }
      // 重复点击
      if(!this.clickAble) {
        return false;
      }
      this.clickAble = false;
      this.timer = setInterval(() => {
        this.totalTime -= 1;

        if(!this.$refs.code) {
          // 防止倒计时，手动更换地址栏地址
        } else {
          this.$refs.code.innerText = Util.str_pad(this.totalTime, 2) + '秒后重发';
        }

        if(this.totalTime === 0) {
          this.reset();
        }
      }, 1000);
    },
    reset() {
      clearInterval(this.timer);
      this.$refs.code.innerText = '重新获取';
      this.clickAble = true;
      this.totalTime = 60;
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/button.scss";
</style>