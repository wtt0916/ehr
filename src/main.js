// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import services from './services'
import ElementUI from 'element-ui'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/reset.less'
import './styles/public.less'

// import './styles/pattern.less'
import './styles/popupbox.less'
import 'orgchart/dist/css/jquery.orgchart.css'
//引入图标
import './assets/iconfont/iconfont.css'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.companyId = 1;
// // 滚动条插件
// import { HappyScroll } from 'vue-happy-scroll'
// import vuescroll from 'vuescroll';

// //自定义组件名
// Vue.component('happy-scroll', HappyScroll)
// // 引入css
// import 'vue-happy-scroll/docs/happy-scroll.css'

// 引入jquery滚动条插件
// import 'jquery'
// import 'jquery.nicescroll'

// 楼层联动
import Scroll from './components/scroll/scroll'

import store from './store'
import html2canvas from 'orgchart/node_modules/html2canvas/dist/html2canvas.js'

import axios from "axios";


Vue.config.productionTip = false
Vue.use(services); // api 接口服务
Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.prototype.GLOBAL = ''
Vue.use(Scroll.name, Scroll)
Vue.prototype.$axios = axios;
window.html2canvas = html2canvas;
// window.jquery = window.$ = jquery
// Vue.prototype.GLOBAL = '/api'
// Vue.prototype.GLOBAL = 'http://192.168.2.77:3160/api'
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

