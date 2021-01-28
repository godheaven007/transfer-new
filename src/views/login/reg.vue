<template>
  <div class="login-wrap">
    <div class="login-box">
      <el-form :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               class="login-form"
               label-position="left">
        <div class="login-title">易推客转账系统V4.0</div>

        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="loginForm.phone"
              name="username"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              autocomplete="off"
          />
        </el-form-item>

        <!-- 短信验证码 -->
        <div class="code-wrap">
          <el-form-item prop="code">
            <el-input
                prefix-icon="el-icon-message"
                v-model="loginForm.code"
                name="code"
                type="text"
                maxlength="10"
                placeholder="短信验证码"
                autocomplete="off"
            />
            <mobile-code :click-able="mobileCodeIsClickAble"></mobile-code>
          </el-form-item>
        </div>

        <!-- qq -->
        <el-form-item prop="qq">
          <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="loginForm.qq"
              name="qq"
              type="text"
              maxlength="10"
              placeholder="QQ号"
              autocomplete="off"
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.pwd"
              name="password"
              type="password"
              maxlength="20"
              placeholder="密码"
              show-password
              autocomplete="off"
          />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item prop="confirmPwd">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.confirmPwd"
              name="password2"
              type="password"
              maxlength="20"
              placeholder="确认密码"
              show-password
              autocomplete="off"
          />
        </el-form-item>

        <!-- 邀请ID -->
        <el-form-item prop="investId">
          <el-input
              prefix-icon="el-icon-user"
              v-model="loginForm.investId"
              name="investId"
              type="text"
              placeholder="邀请ID"
              autocomplete="off"
              readonly
          />
        </el-form-item>

        <!-- 登录 -->
        <div>
          <el-button class="login-btn" type="primary" @click.native.prevent="handleReg">注册</el-button>
        </div>

        <!-- 其他 -->
        <div class="login-extra">
          <router-link to="/login" class="reg">用已有账号登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import MobileCode from "@/components/MobileCode";
export default {
  name: 'Reg',
  components: {MobileCode},
  data() {
    return {
      mobileCodeIsClickAble: true,
      loginForm: {
        phone: '',
        pwd: '',
        code: '',
        qq: '',
        confirmPwd: '',
        investId: ''
      },
      loginRules: {
        phone: [
          { validator: this.validatePhone, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 20, message: "密码长度不大于20个字符", trigger: "blur" }
        ]
      }
    }
  },

  mounted() {

  },
  methods: {
    validatePhone(rule, value, callback) {
      var reg = /^1\d{10}$/;
      if(!reg.test(value)) {
        callback('手机号格式不正确');
      }
      callback();
    },
    validateBeforeSubmit(cb) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          cb();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    doLogin() {
      alert('登录')
    },
    handleReg() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.doLogin();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/module.scss";

.code-wrap /deep/{
  .el-form-item__content {
    display: flex;
    .el-input{
      width: 310px;
    }
    .base-button {
      margin-left: auto;
    }
  }
}
</style>