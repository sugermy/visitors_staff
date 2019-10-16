import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import FastClick from "fastclick";
import "./style/reset.less";
import './style/common.less';
import Ajax from "./utils/ajax";
import dealImg from "./utils/format"
import { Toast, Dialog } from 'vant'
// 实例化AJAX
const BASEURL = window.SYSTEM_CONFIG.webServer;

Vue.prototype.$ajax = new Ajax(BASEURL);
Vue.prototype.toast = Toast;
Vue.prototype.dialog = Dialog;
Vue.prototype.dealImg = dealImg;

FastClick.attach(document.body);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//路由跳转守卫判断是否是登录态
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //跳转前动态设置当前title
    document.title = to.meta.title;
  }
  next();
});

