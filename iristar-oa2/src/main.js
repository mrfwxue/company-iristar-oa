// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import vueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.scss'
import * as filters from '@/assets/js/filter';
import publicComponents from '@/components/public/public.js'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhtwLocale from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from 'element-ui/lib/locale/lang/en'
import language from '@/language/language'
// import config from './config/config';
// console.log('main--------------', config);
Vue.use(vueResource)
Vue.use(VueI18n)
Vue.use(publicComponents)

const messages = {
  en: {
    message: language.en.message,
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: language.zh.message,
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  },
  zhtw: {
    message: language.zhtw.message,
    ...zhtwLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}
let locale = localStorage.getItem('lang-locale');
const defaultLanguage = locale || 'zh';
localStorage.setItem('lang-locale', defaultLanguage);
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: defaultLanguage, // set locale
  messages, // set locale messages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

Vue.http.options.emulateJSON = false;
Vue.http.options.crossOrigin = true;
// Vue.http.options.emulateHTTP = true;
Vue.http.options.headers = {
  'Content-Type': 'application/json',
}
// console.log(window.root_config)
let ROOT_URL = '';
if(process.env.NODE_ENV === 'development'){
  ROOT_URL = window.root_config.development; // 开发环境
}else{
  ROOT_URL = window.root_config.product; // 服务器环境
}
Vue.http.interceptors.push((request, next) => {
  let url = request.url;
  let TOKEN = localStorage.getItem('token');
  // alert(TOKEN)
  if (TOKEN) {
    // 如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN
    request.headers.set('token', TOKEN);
  }
  if (url) {
    // 如果url存在，拼接host+url;
    request.url = ROOT_URL + url;
  }
  // next((response) => {});
});
// 注册全局过滤器
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))

// console.log(process.env.NODE_ENV)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
