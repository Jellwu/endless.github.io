import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

//將products模組輸入到index.js
import productsModules from './products';
import cartModules from './cart';
import loginModules from './login';

Vue.use(Vuex);

export default new Vuex.Store({
  actions:{
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      // context.commit('LOADING',true);
      axios.delete(url).then((response) => {
        // 刪除後重新抓getCart的資料
        context.dispatch('getCart');
        // console.log('刪除購物車項目', response);
        // context.commit('LOADING',false);
      });
    },
  },
  modules:{
    productsModules,
    cartModules,
    loginModules
  }
});
