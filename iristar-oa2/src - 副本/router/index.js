import Vue from 'vue'
import Router from 'vue-router'

// 注册
const reg =  r => require.ensure([], () => r(require('@/components/reg-axios.vue')), 'reg')
// 登录
const login =  r => require.ensure([], () => r(require('@/components/login-axios.vue')), 'login')
// 页面入口
const index =  r => require.ensure([], () => r(require('@/components/index-axios.vue')), 'index')
// 主页
const home =  r => require.ensure([], () => r(require('@/components/home-axios.vue')), 'home')
// 监视识别
const camera =  r => require.ensure([], () => r(require('@/components/camera/camera-axios.vue')), 'camera')
// 设备管理
const deviceStatus =  r => require.ensure([], () => r(require('@/components/deviceStatus/deviceStatus-axios.vue')), 'deviceStatus')
// 通行记录
const throughLog =  r => require.ensure([], () => r(require('@/components/throughLog/throughLog-axios.vue')), 'throughLog')
// 考勤统计
const workLog =  r => require.ensure([], () => r(require('@/components/workLog/workLog-axios.vue')), 'workLog')
// 设备同步记录
const syncLog =  r => require.ensure([], () => r(require('@/components/syncLog/syncLog-axios.vue')), 'syncLog')
// 人员管理
const peopleManager =  r => require.ensure([], () => r(require('@/components/peopleManager/peopleManager-axios.vue')), 'peopleManager')
// 用户管理
const userManager =  r => require.ensure([], () => r(require('@/components/userManager/userManager-axios.vue')), 'userManager')
// 修改密码
const editPwd =  r => require.ensure([], () => r(require('@/components/editPwd/editPwd-axios.vue')), 'editPwd')
// 组织架构
const organize =  r => require.ensure([], () => r(require('@/components/organize/organize-axios.vue')), 'organize')
// 版本管理
const version =  r => require.ensure([], () => r(require('@/components/version/version.vue')), 'version')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'camera',
          name: 'camera',
          component: camera
        },
        {
          path: 'deviceStatus',
          name: 'deviceStatus',
          component: deviceStatus
        },
        {
          path: 'throughLog',
          name: 'throughLog',
          component: throughLog
        },
        {
          path: 'workLog',
          name: 'workLog',
          component: workLog
        },
        {
          path: 'syncLog',
          name: 'syncLog',
          component: syncLog
        },
        {
          path: 'peopleManager',
          name: 'peopleManager',
          component: peopleManager
        },
        {
          path: 'userManager',
          name: 'userManager',
          component: userManager
        },
        {
          path: 'editPwd',
          name: 'editPwd',
          component: editPwd
        },
        {
          path: 'organize',
          name: 'organize',
          component: organize
        },
        {
          path: 'version',
          name: 'version',
          component: version
        },
      ]
    }
  ]
})
