import axios from 'axios';
import router from '../router'

export default {
  namespaced:true,
  state: {
    coupon:{},
    isLogin: false,
    isLoading: false,
  },
  mutations: {
    LOADING(state, payload){
      state.isLoading = payload;
    },
    COUPON(state, payload){
      state.coupon = payload;
    },
  },
  actions: {
    updateLoading(context ,payload){
      context.commit('LOADING', payload);
    },
    getCoupon(context){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`;
      context.commit('LOADING',true);
      axios.get(url).then((response) =>{
        context.commit('COUPON',response.data.coupons);
        context.commit('LOADING',false);
      })
    },
    addCoupon(context,item){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      context.commit('LOADING',true);
      axios.post(url,{data:item}).then((response) =>{
        if(response.data.success){
          alert(response.data.message);
          context.dispatch('getCoupon');
        }else{
          alert(response.data.message)
        }
        context.commit('LOADING',false);
      })
    },
    editCoupon(context,item){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`;
      context.commit('LOADING',true);
      axios.put(url,{data:item}).then((response) =>{
        if(response.data.success){
          alert(response.data.message);
          context.dispatch('getCoupon');
        }else{
          alert(response.data.message)
        }
        context.commit('LOADING',false);
      })
    },
    dropCoupon(context,item){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`;
      context.commit('LOADING',true);
      axios.delete(url).then((response) =>{
        if(response.data.success){
          alert(response.data.message);
        }else{
          alert(response.data.message)
        }
        context.commit('LOADING',false);
      })
    },
  },
  getters:{
    isLoading(state) {
      return state.isLoading;
    },
    coupon(state){
      return state.coupon;
    }
  }
}
