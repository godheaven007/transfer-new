<template>
  <el-steps class="custom-step" :active="currentStep" align-center>
    <el-step title="选择付款账户"></el-step>
    <el-step title="选择提交方式"></el-step>
    <el-step title="提交数据"></el-step>
    <el-step title="确认数据"></el-step>
  </el-steps>
</template>

<script>
export default {
  name: "CustomStep",
  props: {
    currentStep: {
      type: String|Number,
      default: 0
    }
  },
  mounted() {
    console.log(this.currentStep);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
.custom-step /deep/ {
  .el-step__head.is-finish,.el-step__title.is-finish {
    border-color: #009688;
    color: #009688
  }

  .el-step__head.is-process,.el-step__title.is-process {
    color: #c0c4cc;
    border-color: #c0c4cc;
  }
}
</style>