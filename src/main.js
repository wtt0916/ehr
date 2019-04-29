import Vue from 'vue'
// import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import Menu from './components/Menu';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  render: h => h(Menu),
}).$mount('#app')
