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
              placeholder="请输入注册时的手机号"
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

        <!-- 找回密码 -->
        <div>
          <el-button class="login-btn" type="primary" @click.native.prevent="handleForget">重置密码</el-button>
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
import api from "@/util/api";
import {Message} from 'element-ui';

export default {
  name: 'Forget',
  components: {MobileCode},
  data() {
    return {
      loginForm: {
        user_login: '',
        sms_code: '',
        password: '',
        password_again: ''
      },
      loginRules: {
        user_login: [
          { validator: this.phoneValidate, trigger: 'blur' }
        ],
        sms_code: [
          { validator: this.smsCodeValidate, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min:6, max: 50, message: "密码长度6~50个字符", trigger: "blur" }
        ],
        password_again: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min:6, max: 50, message: "确认密码长度6~50个字符", trigger: "blur" },
          { validator: this.passwordAgainValidate, trigger: 'blur'}
        ]
      }
    }
  },

  mounted() {

  },
  methods: {

    phoneValidate(rule, value, callback) {
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
    passwordAgainValidate(rule, value, callback) {
      if(this.loginForm.password !== value) {
        callback('密码与确认密码不一致');
      }
      callback();
    },

    doForget() {
      api.resetPwd({
        user_login: this.loginForm.user_login,
        sms_code: this.loginForm.sms_code,
        password: this.loginForm.password,
        password_again: this.loginForm.password_again
      }).then( res => {
        Message.success({
          duration: 2000,
          message: res.msg
        });
        setTimeout(() => {
          this.$router.push('/login');
        },2000);
      }).catch(error => {

      })
    },
    handleForget() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.doForget();
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