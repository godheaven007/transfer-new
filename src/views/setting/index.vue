<template>
  <div class="setting-wrap">
    <div class="setting">
      <el-tabs v-model="activeName">
        <el-tab-pane label="支付宝秘钥" name="key" class="layout">
          <el-form :model="keyForm" :rules="keyRules" ref="keyForm" label-width="auto">
            <el-form-item label="支付宝应用APPID" prop="app_id">
              <el-input type="text" v-model="keyForm.app_id" max-length="64" autocomplete="off" placeholder="请输入支付宝应用APPID"></el-input>
            </el-form-item>
            <el-form-item label="应用私钥" prop="private_key">
              <el-input type="textarea" v-model="keyForm.private_key" :rows="5" placeholder="请输入生成的应用私钥"></el-input>
            </el-form-item>
            <el-form-item label="应用公钥" prop="public_key">
              <el-input type="textarea" v-model="keyForm.public_key" :rows="5" placeholder="请输入生成的应用公钥"></el-input>
            </el-form-item>
            <el-form-item label="每日转账金额上限" prop="day_quota">
              <el-input type="text" v-model="keyForm.day_quota" placeholder="请输入每日转账金额上限"></el-input>
            </el-form-item>
            <el-form-item label="账户名称" prop="payer_show_name">
              <el-input type="text" v-model="keyForm.payer_show_name" autocomplete="off" max-length="20" placeholder="转账时显示在收款人支付宝账单的名称"></el-input>
            </el-form-item>
            <el-form-item label="操作密码" prop="operation_pwd">
              <el-input type="text" v-model="keyForm.operation_pwd" autocomplete="off" max-length="50" show-password placeholder="批量转账时验证所用，请勿泄露"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="tip">温馨提示：为了效验秘钥是否正确，系统将会自动发起一笔0.1元转账用于测试秘钥是否正确。秘钥有效期2个月</div>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button class="base-btn-bg" type="primary" @click="save('keyForm')">保存</el-button>
              <el-button class="reset-btn-bg" type="primary" @click="reset('keyForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="提现设置" name="cash" class="layout">
          <el-form :model="cashForm" :rules="cashRules" ref="cashForm" label-width="100px">
            <el-form-item label="绑定QQ" prop="bind_qq">
              <el-input type="text" v-model="cashForm.bind_qq" autocomplete="off" placeholder="请输入QQ号"></el-input>
            </el-form-item>
            <el-form-item label="提现支付宝" prop="alipay_account">
              <el-input type="text" v-model="cashForm.alipay_account" max-length="50" autocomplete="off" placeholder="请输入提现支付宝账号"></el-input>
            </el-form-item>
            <el-form-item label="提现收款人" prop="real_name">
              <el-input type="text" v-model="cashForm.real_name" max-length="20" autocomplete="off" placeholder="请输入提现收款人"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button class="base-btn-bg" type="primary" @click="handleCashOutSetting('cashForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="course" @click="playVideo">秘钥配置教程</div>
    </div>
  </div>
</template>

<script>
import api from "@/util/api";
import debounce from 'lodash.debounce';
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
        app_id: '',
        private_key: '',
        public_key: '',
        payer_show_name: '',
        day_quota: '',
        operation_pwd: '',
      },
      keyRules: {
        app_id: [
          { required: true, message: '请输入支付宝应用APPID', trigger: 'blur' }
        ],
        private_key: [
          { required: true, message: '请输入应用私钥', trigger: 'blur' }
        ],
        public_key: [
          { required: true, message: '请输入应用公钥', trigger: 'blur' }
        ],
        payer_show_name: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        day_quota: [
          { required: true, message: '请输入每日转账金额上限', trigger: 'blur' },
          { validator: this.validateMoney, trigger: 'blur' }
        ],
        operation_pwd: [
          { required: true, message: '请输入操作密码', trigger: 'blur' },
          { min:6, max: 50, message: "操作密码长度6~50个字符", trigger: "blur" }
        ]
      },
      cashForm: {
        bind_qq: '',
        alipay_account: '',
        real_name: ''
      },
      cashRules: {
        bind_qq: [
          { required: true, message: '请输入qq号', trigger: 'blur' },
          { validator: this.qqNumberValidate, trigger: 'blur'}
        ],
        alipay_account: [
          { required: true, message: '请输入提现支付宝账号', trigger: 'blur' },
        ],
        real_name: [
          { required: true, message: '请输入提现收款人', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    getStar(size) {
      let str = '';
      for(let i = 0; i < size; i++) {
        str += '*'
      }
      return str;
    },
    playVideo() {
      this.$video(this.video);
    },
    validateMoney(rule, value, callback) {
      var reg = /^([0-9](\.[0-9]{1,2}){0,1}|[1-9][0-9]{0,7}(\.[0-9]{1,2}){0,1})$/;
      if(!reg.test(value)) {
        callback('仅支持最大8位整数允许2位小数');
      }
      if(value < 100) {
        callback('每日转账金额上限不得低于100元');
      }
      callback();
    },
    qqNumberValidate(rule, value, callback) {
      var reg = /^[1-9][0-9]{4,12}$/;
      if(!reg.test(value)) {
        callback('qq号格式不正确（最少5位，最多12位）');
      }
      callback();
    },
    save: debounce(function() {
      api.setAlipayKey({
        app_id: this.keyForm.app_id,
        private_key: this.keyForm.private_key,
        public_key: this.keyForm.public_key,
        payer_show_name: this.keyForm.payer_show_name,
        day_quota: this.keyForm.day_quota,
        operation_pwd: this.keyForm.operation_pwd
      }).then(res => {
        this.$message.success(res.msg);
      })
    },100),
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    doCashSubmit: debounce(function() {
      api.setCashOut({
        bind_qq: this.cashForm.bind_qq,
        alipay_account: this.cashForm.alipay_account,
        real_name: this.cashForm.real_name
      }).then(res => {
        this.$message.success(res.msg);
      })
    }, 100),
    handleCashOutSetting() {
      this.$refs.cashForm.validate((valid) => {
        if (valid) {
          this.doCashSubmit();
        }
      });
    }
  },
  mounted() {
    api.getSetting().then(res => {
      let alipay = res.data.alipay,
          charge = res.data.charge,
          withdrawal = res.data.withdrawal;
      this.keyForm.app_id = alipay.app_id;
      this.keyForm.private_key = alipay.private_key;
      this.keyForm.public_key = alipay.public_key;
      this.keyForm.payer_show_name = alipay.payer_show_name;
      this.keyForm.day_quota = alipay.day_quota;
      this.keyForm.operation_pwd = this.getStar(alipay.pwd_length);

      // 提现设置
      this.cashForm.bind_qq = withdrawal.bind_qq;
      this.cashForm.alipay_account = withdrawal.alipay_account;
      this.cashForm.real_name = withdrawal.real_name;
    })
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