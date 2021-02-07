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
        <el-form-item prop="user_name">
          <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="loginForm.user_name"
              name="user_name"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              autocomplete="off"
          />
        </el-form-item>

        <!-- 输入密码 -->
        <el-form-item prop="password">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              name="password"
              type="password"
              maxlength="20"
              placeholder="请输入密码"
              show-password
              autocomplete="off"
          />
        </el-form-item>

        <!-- 登录 -->
        <div>
          <el-button class="login-btn" type="primary" @click.native.prevent="handleLogin">登录</el-button>
        </div>

        <!-- 其他 -->
        <div class="login-extra">
          <router-link to="/forget" class="forget">忘记密码？</router-link>
          <router-link to="/reg" class="reg">注册账号</router-link>
        </div>
    </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/util/api";
import {Message} from 'element-ui';

export default {
  name: 'LoginIn',
  data() {
    return {
      loginForm: {
        user_name: '',
        password: ''
      },
      loginRules: {
        user_name: [
          { validator: this.phoneValidate, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min:6, max: 50, message: "密码长度6~50个字符", trigger: "blur" }
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
    doLogin() {
      api.login({
        user_name: this.user_name,
        password: this.password
      }).then(res => {
        Message.success({
          duration: 2000,
          message: res.msg
        });
        setTimeout(() => {
          this.$router.push('/');
        },2000);
      }).catch(error => {
        console.log(error);
      })
    },
    handleLogin() {
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
</style>