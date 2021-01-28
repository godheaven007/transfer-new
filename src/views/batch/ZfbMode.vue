<template>
  <div class="wrap">
    <custom-step :currentStep="2"></custom-step>
    <ul class="box-wrap">
      <li class="box">
        <div class="item">
          <div class="title">在线录入</div>
          <p>直接输入多个收款账号</p>
          <p>适用于转账笔数较少时使用</p>
          <p>方便灵活，更加快捷。</p>
          <el-button size="medium" class="baseBtn" @click="select(1)">选择</el-button>
        </div>
      </li>
      <li class="box">
        <div class="item">
          <div class="title">批量上传</div>
          <p>一键上传Excel格式文件</p>
          <p>适用于转账笔数较多时使用</p>
          <p>一键批量转账，更加高效。</p>
          <el-button size="medium" class="baseBtn" @click="select(2)">选择</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CustomStep from "@/components/CustomStep";
export default {
  name: "ZfbMode",
  components: {
    CustomStep
  },
  data() {
    return {

    }
  },
  methods: {
    select(type) {
      if(type == 1) {
        this.$router.push({path: '/transferByZFB/manual'});
      } else if(type == 2) {
        this.$router.push({path: '/transferByZFB/batch'});
      }
    }
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