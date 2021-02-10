import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


// 解决重复触发路由报错问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index'),
        meta: {
          title: "个人中心"
        }
      },
      // 批量转账
      {
        path: '/transferByWX',
        name: 'TransferByWX',
        component: () => import('@/views/batch/TransferByWX'),
        meta: {title: "微信转账"}
      },
      {
        path: '/transferByZFB',
        name: 'TransferByZFB',
        component: () => import('@/views/batch/TransferByZFB'),
        meta: {title: "支付宝转账"}
      },
      {
        path: '/transferByZFB/mode',
        name: 'ZfbMode',
        component: () => import('@/views/batch/ZfbMode')
      },
      {
        path: '/transferByZFB/manual',
        name: 'ZfbManual',
        meta: { title: "在线录入" },
        component: () => import('@/views/batch/ZfbManual')
      },
      {
        path: '/transferByZFB/batch',
        name: 'ZfbBatch',
        component: () => import('@/views/batch/ZfbBatch')
      },
      {
        path: '/transferByZFB/submit',
        name: 'ZfbSubmit',
        component: () => import('@/views/batch/ZfbSubmit')
      },
      // 财务管理
      {
        path: '/finance/record',
        name: 'TransferRecord',
        component: () => import('@/views/finance/TransferRecord'),
        meta: {title: "转账记录"}
      },
      {
        path: '/finance/order',
        name: 'TransferOrder',
        component: () => import('@/views/finance/TransferOrder'),
        meta: {title: "转账订单"}
      },

      // 系统设置
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/setting'),
        meta: {title: "系统设置"}
      },
      // 插件市场
      {
        path: '/plugin',
        name: 'Plugin',
        component: () => import('@/views/plugin'),
        meta: {title: "插件市场"}
      },
      {
        path: '/plugininfo',
        name: 'PluginInfo',
        component: () => import('@/views/plugin/PluginInfo'),
        meta: {title: "插件市场"}
      },
      {
        path: '/black',
        name: 'Black',
        component: () => import('@/views/plugin/PluginBlack'),
        meta: {title: "黑名单"}
      },
      // vip
      {
        path: '/vip',
        name: 'Vip',
        component: () => import('@/views/vip'),
        meta: {title: "会员购买"}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {title: "登录"}
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('@/views/login/reg'),
    meta: {title: "注册"}
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/login/forget'),
    meta: {title: "忘记密码"}
  },
  // 404路由
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
