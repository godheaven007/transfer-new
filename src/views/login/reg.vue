<template>
  <div class="login-wrap">
    <div class="login-box">
      <el-form :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               class="login-form"
               label-position="left">
        <div class="login-title">量付通转账系统</div>

        <!-- 手机号 -->
        <el-form-item prop="user_login">
          <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="loginForm.user_login"
              name="user_login"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              autocomplete="off"
          />
        </el-form-item>

        <!-- 短信验证码 -->
        <div class="code-wrap">
          <el-form-item prop="sms_code">
            <el-input
                prefix-icon="el-icon-message"
                v-model="loginForm.sms_code"
                name="sms_code"
                type="text"
                maxlength="6"
                placeholder="短信验证码"
                autocomplete="off"
            />
            <mobile-code :phone="loginForm.user_login"></mobile-code>
          </el-form-item>
        </div>

        <!-- qq -->
        <el-form-item prop="qq_number">
          <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="loginForm.qq_number"
              name="qq_number"
              type="text"
              maxlength="12"
              placeholder="QQ号"
              autocomplete="off"
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              name="password"
              type="password"
              maxlength="50"
              placeholder="密码"
              show-password
              autocomplete="off"
          />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item prop="password_again">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.password_again"
              name="password_again"
              type="password"
              maxlength="50"
              placeholder="确认密码"
              show-password
              autocomplete="off"
          />
        </el-form-item>

        <!-- 邀请ID -->
        <el-form-item prop="invitation_code">
          <el-input
              prefix-icon="el-icon-user"
              v-model="loginForm.invitation_code"
              name="invitation_code"
              maxlength="8"
              type="text"
              placeholder="邀请ID"
              autocomplete="off"
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
        user_login: '',
        password: '',
        sms_code: '',
        qq_number: '',
        password_again: '',
        invitation_code: ''
      },
      loginRules: {
        user_login: [
          { validator: this.userLoginValidate, trigger: 'blur' }
        ],
        sms_code: [
          { validator: this.smsCodeValidate, trigger: 'blur' }
        ],
        qq_number: [
          { validator: this.qqNumberValidate, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min:6, max: 50, message: "密码长度6~50个字符", trigger: "blur" }
        ],
        password_again: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min:6, max: 50, message: "确认密码长度6~50个字符", trigger: "blur" },
          { validator: this.passwordAgainValidate, trigger: 'blur'}
        ],
        invitation_code: [
          { required: true, message: '请输入邀请码', trigger: 'blur' },
          { min:8, max: 8, message: "邀请码为8位字符", trigger: "blur" }
        ]
      }
    }
  },

  mounted() {

  },
  methods: {
    userLoginValidate(rule, value, callback) {
      var reg = /^1\d{10}$/;
      if(!reg.test(value)) {
        callback('手机号格式不正确');
      }
      callback();
    },
    smsCodeValidate(rule, value, callback) {
      var reg = /^\d{6}$/;
      if(!reg.test(value)) {
        callback('短信验证码格式不正确（6位纯数字）');
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
    passwordAgainValidate(rule, value, callback) {
      if(this.loginForm.password !== value) {
        callback('密码与确认密码不一致');
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
      alert('登录');

      // this.axios.get('/Support/sendSms?phone=18662161024').then(res=>{
      //
      // })
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