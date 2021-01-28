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
      totalTime: 3,
      timer: null,
      flag: true
    }
  },
  props: {
    clickAble: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getMobileCode() {
      if(!this.clickAble) {
        this.$message({
          message: '手机号格式不正确',
          type: 'warning'
        });
        return false;
      }
      // 重复点击
      if(!this.flag) {
        return false;
      }
      this.flag = false;
      this.timer = setInterval(() => {
        this.totalTime -= 1;
        this.$refs.code.innerText = Util.str_pad(this.totalTime, 2) + '秒后重发';
        if(this.totalTime === 0) {
          this.reset();
        }
      }, 1000);
    },
    reset() {
      clearInterval(this.timer);
      this.$refs.code.innerText = '重新获取';
      this.flag = true;
      this.totalTime = 5;
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/button.scss";
</style>