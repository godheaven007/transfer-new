<template>
  <div class="login-wrap">
    <div class="login-box">
      <el-form :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               class="login-form"
               label-position="left">
        <div class="login-title">量付通转账系统V4.0</div>
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

        <!-- 输入密码 -->
        <el-form-item prop="pwd">
          <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.pwd"
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
export default {
  name: 'LoginIn',
  data() {
    return {
      loginForm: {
        phone: '',
        pwd: ''
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
    doLogin() {
      alert('登录')
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

      // this.$axios({
      //   method: 'post',
      //   url: '/api/v1/login',
      //   headers: {
      //     'Content-Type': "application/json;charset=UTF-8"
      //   },
      //   data: {
      //     name: this.loginForm.username,
      //     password: this.loginForm.password
      //   }
      // })
      //     .then(res=>{                    //请求成功后执行函数
      //       if(res.data.message === 'SUCCESS'){
      //         this.$router.push('/')	//登录验证成功路由实现跳转
      //         this.$notify({
      //           title: '提示',
      //           message: '用户登录成功',
      //           duration: 3000
      //         });
      //       }else{
      //         this.$notify({
      //           title: '提示',
      //           message: '用户登录失败',
      //           duration: 3000
      //         });
      //       }
      //     })
      //     .catch(err=>{                   //请求错误后执行函数
      //       his.$notify({
      //         title: '提示',
      //         message: '用户访问错误',
      //         duration: 3000
      //       });
      //       console.log(err)
      //     })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/scss/module.scss";
</style>