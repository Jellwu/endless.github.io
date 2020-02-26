import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'bootstrap';
import Vuex from 'vuex';

import store from './store'
// filter Import
import currencyFilter from './filter/currency.js';
import timeTranseFilter from './filter/timeTranse.js'

//注入vee-validate表單驗證工具
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
//加入vee-validate的規則
import * as rules from "vee-validate/dist/rules";
//加入vee-validate的語系
import tw from "vee-validate/dist/locale/zh_TW.json";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.use(Vuex);
//將cookie寫到localstorage儲存
axios.defaults.withCredentials = true;

//使用currency(filter)
Vue.filter('currency',currencyFilter);
Vue.filter('timeTranse',timeTranseFilter);

// 安裝所有 VeeValidate 規則
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize("zh_TW", tw);
// 註冊vee-validate 全域元件
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 導航守衛
router.beforeEach((to, from, next) => {
  // meta.requiresAuth是從index.js裡面去抓的參數(在vueRouter的文件有說明是判斷路由狀態的訊息)
  // 在要去的頁面有設定meatAuthrequire時，就去驗證，反之就不需要
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    //this.$http是用在.vue的元件下，在entry這邊必須是直接改用axios
    axios.post(api).then((response) =>{
      //驗證成功前往指定路徑
      if(response.data.success){
        next();
      }else{
        alert(response.data.message);
        next({
          path:'./login'
        })
      }
    })
  }else{
    next();
  }

})
