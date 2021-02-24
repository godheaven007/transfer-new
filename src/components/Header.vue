<template>
  <div class="nav-wrap">
    <div class="nav-logo">
      <a href="tencent://message/?uin=690399130">咨询我们</a>
    </div>
    <div class="nav-menu">
      <el-menu
          :default-active="activeMenuIndex"
          class="el-menu-custom"
          mode="horizontal"
          background-color="#009688"
          text-color="#fff"
          active-text-color="#fff"
          router
          @select="handleSelect">
        <el-menu-item index="/index">个人中心</el-menu-item>
        <el-menu-item index="/transferByZFB">批量转账</el-menu-item>
<!--        <el-submenu index="transfer">-->
<!--          <template slot="title">批量转账</template>-->
<!--          <el-menu-item index="/transferByWX">微信转账</el-menu-item>-->
<!--          <el-menu-item index="/transferByZFB">支付宝转账</el-menu-item>-->
<!--        </el-submenu>-->
        <el-submenu index="finance">
          <template slot="title">财务管理</template>
          <el-menu-item index="/finance/record">转账记录</el-menu-item>
          <el-menu-item index="/finance/order">转账订单</el-menu-item>
        </el-submenu>
        <el-menu-item index="/setting">系统设置</el-menu-item>
<!--        <el-menu-item index="/plugin">插件市场</el-menu-item>-->
      </el-menu>
    </div>
    <div class="nav-extra">
      <div class="user">
        <el-dropdown trigger="click" @command="doLogout">
              <span class="el-dropdown-link">
                {{ user_login }}({{ level_text }})
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="upgrade">
        <el-button type="warning" round size="mini" @click="linkToVip">升级/续费</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Storage from '@/util/storage';
import {Message} from 'element-ui'
export default {
  name: "Header",
  data() {
    return {
      activeMenuIndex: '/index',
      level_text: '',
      user_login: ''
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    linkToVip() {
      this.activeMenuIndex = '';
      this.$router.push({path: '/vip'});
    },
    setCurrentRoute() {
      let path = this.$route.path;
      // console.log('当前路由:', path);
      setTimeout(() => {
        this.activeMenuIndex= path;
      }, 200);
    },
    doLogout() {
      Storage.clear('sureList');
      Storage.clear('charge');
      Storage.clear('level');
      Storage.clear('mode');
      localStorage.removeItem('token');
      this.$router.push({path: '/login'});
    }
  },

  watch: {
    $route() {
      this.setCurrentRoute();
    }
  },
  mounted() {
    this.setCurrentRoute();

    this.axios.get('/home/personalInfo', {
      headers: {'Authorization':  window.localStorage.getItem('token')}
    }).then( res => {
      if(res.data.code == 1) {
        this.level_text = res.data.data.level_text;
        this.user_login = res.data.data.user_login;
        Storage.setItem('level', res.data.data.level);
      } else {
        Message.warning(res.data.msg);
      }
    });

    this.axios.get('/system/getSetting',{
      headers: {'Authorization':  window.localStorage.getItem('token')}
    }).then(res => {
      Storage.setItem('charge', res.data.data.charge);
    })
  }
}
</script>

<style scoped lang="scss">
//scoped css
$menuItemW: 150px;
$menuItemH: 78px;
$menuItemLH: 78px;
$fontSize: 16px;
//$darkBgColor: #00786D;
//$lightBgColor:#5fb878;
$darkBgColor: #84b19a;
$lightBgColor:#c9c8aa;

.el-menu--horizontal .el-menu .el-menu-item {
  background-color: $darkBgColor!important;
}

.el-menu-custom /deep/ {
  .el-menu-item {
    width: $menuItemW;
    height: $menuItemH;
    line-height: $menuItemLH;
    font-size: $fontSize;
    text-align: center;
    background-color: $darkBgColor!important;
  }
  .el-submenu {
    width: $menuItemW;
    height: $menuItemH;
    line-height: $menuItemLH;
    font-size: 16px;
    text-align: center;
    .el-submenu__title {
      height: $menuItemH;
      line-height: $menuItemLH;
      font-size: $fontSize;
      background-color: $darkBgColor!important;
      i {
        color: #fff;
      }
    }
  }
  .el-menu-item.is-active,
  .el-submenu.is-active .el-submenu__title{
    background-color: $darkBgColor!important;
    border-bottom-color: $lightBgColor!important;
    border-bottom: 3px solid $lightBgColor!important;
  }
}

.nav-wrap{
  display: flex;
  height: 78px;
  line-height: 78px;
  background-color: $darkBgColor;
  .nav-logo {
    width: 300px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    margin-left: 20px;
    margin-right: auto;
    background:url("/imgs/logo.png") no-repeat center center;
    background-size: 160px 50px;
  }
  .nav-menu {
    flex-shrink: 0;
  }
  .nav-extra {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 40px;
    .user{
      color: #fff;
    }
    .upgrade {
      margin-left: 40px;
    }
  }
}

.el-button--warning {
  background-color: #FFB800;
  font-size: 14px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>