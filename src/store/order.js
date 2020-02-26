import axios from 'axios';
import router from '../router'

export default {
  namespaced:true,
  state: {
    orderId:'',
    order:{
      user:{},
    },
  },
  mutations: {
    ORDERID(state, payload){
      state.orderId = payload;
    },
    GETORDER(state, payload){
      state.order = payload;
      console.log(state.order);
    }
  },
  actions: {
    cartCheckout(context, order){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      axios.post(url, {data:order}).then((response) =>{
        if(response.data.success){
          alert(response.data.message);
          context.commit('ORDERID',response.data.orderId);
          router.push(`/cart_checkout/${response.data.orderId}`);
        }else{
          alert(response.data.message);
        }
      })
    },
    getOrder(context, id){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      axios.get(url).then((response) =>{
        if(response.data.success){
          context.commit('GETORDER',response.data.order);
        }else{
          alert(response.data.message);
        }
      })
    }
  },
  getters:{
    Order(state){
      return state.order;
    }
  }
}
