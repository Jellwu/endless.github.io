import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

//將products模組輸入到index.js
import productsModules from './products';
import cartModules from './cart';
import loginModules from './login';
import couponModules from './coupon';
import orderModules from './order';

Vue.use(Vuex);

// Loading放在最外層
export default new Vuex.Store({
  state:{
    isLoading: false,
    isCartmessage: {
      state:false,
      msg:''
    }
  },
  mutations:{
    LOADING(state, payload){
      // 若以CartMsg表示的就不再重新跑一次Laoder
      if(state.isCartmessage.state === true){
        return
      }else{
        state.isLoading = payload;
      }
    },
    CARTMESSAGE(state,payload){
      state.isCartmessage = payload;
    },
    // 在1500毫秒後把false塞回isCartmessage
    REMOVEMSG(state,payload){
      state.isCartmessage = payload;
    }
  },
  actions:{
    updateLoading(context,payload){
      context.commit('LOADING', payload);
    },
    cartMessage(context,payload){
      context.commit('CARTMESSAGE', payload);
      context.dispatch('removeMsg', {state:false,msg:''});
    },
    removeMsg(context,payload){
      setTimeout(() => {
        context.commit('REMOVEMSG', payload);
      }, 1500);
    }
  },
  getters:{
    isLoading(state) {
      return state.isLoading;
    },
    isCartmessage(state){
      return state.isCartmessage;
    }
  },
  modules:{
    productsModules,
    cartModules,
    loginModules,
    couponModules,
    orderModules,
  }
});
