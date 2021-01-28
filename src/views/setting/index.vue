<template>
  <div class="setting-wrap">
    <div class="setting">
      <el-tabs v-model="activeName">
        <el-tab-pane label="支付宝秘钥" name="key" class="layout">
          <el-form :model="keyForm" :rules="keyRules" ref="keyForm" label-width="auto">
            <el-form-item label="支付宝应用APPID" prop="appid">
              <el-input type="text" v-model="keyForm.appid" autocomplete="off" placeholder="请输入支付宝应用APPID"></el-input>
            </el-form-item>
            <el-form-item label="应用私钥" prop="key">
              <el-input type="textarea" v-model="keyForm.key" :rows="5" placeholder="请输入生成的应用私钥"></el-input>
            </el-form-item>
            <el-form-item label="应用公钥证书">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-exceed="handleExceed"
                  :file-list="fileList1">
                  <el-button class="base-btn-bg" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip" style="color: #f05757; margin-top:-10px; font-size: 14px;">请上传appCertPublicKey开头的证书文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="支付宝公钥证书">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-exceed="handleExceed"
                  :file-list="fileList2">
                <el-button class="base-btn-bg" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" style="color: #f05757; margin-top:-10px; font-size: 14px;">请上传alipayCertPublicKey开头的证书文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="支付宝根证书">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-exceed="handleExceed"
                  :file-list="fileList3">
                <el-button class="base-btn-bg" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" style="color: #f05757; margin-top:-10px; font-size: 14px;">请上传alipayRootCert开头的证书文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="账户名称" prop="name">
              <el-input type="text" v-model="keyForm.name" autocomplete="off" placeholder="转账时显示在收款人支付宝账单的名称"></el-input>
            </el-form-item>
            <el-form-item label="操作密码" prop="pwd">
              <el-input type="text" v-model="keyForm.pwd" autocomplete="off" placeholder="批量转账时验证所用，请勿泄露"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="tip">温馨提示：为了效验秘钥是否正确，系统将会自动发起一笔0.1元转账用于测试秘钥是否正确。秘钥有效期2个月</div>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button class="base-btn-bg" type="primary" @click="handleKeySetting('keyForm')">保存</el-button>
              <el-button class="reset-btn-bg" type="primary" @click="resetKeySetting('keyForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="提现设置" name="cash" class="layout">
          <el-form :model="cashForm" :rules="cashRules" ref="cashForm" label-width="100px">
            <el-form-item label="绑定QQ" prop="qq">
              <el-input type="text" v-model="cashForm.qq" autocomplete="off" placeholder="请输入QQ号"></el-input>
            </el-form-item>
            <el-form-item label="提现支付宝" prop="zfb">
              <el-input type="text" v-model="cashForm.qq" autocomplete="off" placeholder="请输入提现支付宝账号"></el-input>
            </el-form-item>
            <el-form-item label="提现收款人" prop="person">
              <el-input type="text" v-model="cashForm.person" autocomplete="off" placeholder="请输入提现收款人"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button class="base-btn-bg" type="primary" @click="handleCashSetting('cashForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="course" @click="playVideo">秘钥配置教程</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      activeName: 'key',
      video: {
        title: '秘钥配置教程',
        url: '/video/key.mp4'
      },
      keyForm: {
        appid: ''
      },
      keyRules: {

      },
      cashForm: {
        qq: '',
        zfb: '',
        person: ''
      },
      cashRules: {
        qq: [
          { required: true, message: 'qq号不能为空', trigger: 'blur' },
        ],
        zfb: [
          { required: true, message: '提现支付宝不能为空', trigger: 'blur' },
        ],
        person: [
          { required: true, message: '提现收款人不能为空', trigger: 'blur' },
        ]
      },
      fileList1: [],
      fileList2: [],
      fileList3: []
    }
  },
  methods: {
    playVideo() {
      this.$video(this.video);
    },
    handleKeySetting() {
      console.log(this.fileList1);

    },
    resetKeySetting() {

    },
    doCashSeeting() {

    },
    handleCashSetting() {
      this.$refs.cashForm.validate((valid) => {
        if (valid) {
          this.doCashSeeting();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
@import "@/assets/scss/mixin.scss";
  .setting-wrap {
    padding: 20px;
    .setting {
      position: relative;
      width: 100%;
      padding: 30px 40px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      .course {
        position: absolute;
        top: 40px;
        right: 40px;
        color: $baseColor;
        cursor: pointer;
      }
    }
    .setting /deep/{
      .el-tabs__item {
        &.is-active,
        &:hover{color: $baseColor;}
      }
      .el-tabs__active-bar {
        background-color: $baseColor;
      }
    }
  }
  .layout {
    width: 600px;
    margin: 0 auto;
  }
  .base-btn-bg{
    @include baseBtn;
  }
  .reset-btn-bg{
    @include resetBtn;
  }
  .tip{
    line-height: 1.8;
    color: #f56c6c;
    background-color: #fef0f0;
  }
</style>