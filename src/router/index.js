import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


// 解决重复触发路由报错问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index')
      },
      // 批量转账
      {
        path: 'transferByWX',
        name: 'TransferByWX',
        component: () => import('@/views/batch/TransferByWX')
      },
      {
        path: 'transferByZFB',
        name: 'TransferByZFB',
        component: () => import('@/views/batch/TransferByZFB')
      },
      {
        path: 'transferByZFB/mode',
        name: 'TransferByZFB',
        component: () => import('@/views/batch/ZfbMode')
      },
      {
        path: 'transferByZFB/manual',
        name: 'ZfbManual',
        meta: { title: "到岗候选人名单确认" },
        component: () => import('@/views/batch/ZfbManual')
      },
      {
        path: 'transferByZFB/batch',
        name: 'ZfbBatch',
        component: () => import('@/views/batch/ZfbBatch')
      },
      {
        path: 'transferByZFB/submit',
        name: 'ZfbSubmit',
        component: () => import('@/views/batch/ZfbSubmit')
      },
      // 财务管理
      {
        path: 'record',
        name: 'TransferRecord',
        component: () => import('@/views/finance/TransferRecord')
      },
      {
        path: 'order',
        name: 'TransferOrder',
        component: () => import('@/views/finance/TransferOrder')
      },

      // 系统设置
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/setting')
      },
      // 插件市场
      {
        path: '/plugin',
        name: 'Plugin',
        component: () => import('@/views/plugin')
      },
      // vip
      {
        path: '/vip',
        name: 'Vip',
        component: () => import('@/views/vip')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('@/views/login/reg')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/login/forget')
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
