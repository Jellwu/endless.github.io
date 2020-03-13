import axios from 'axios';

export default {
  namespaced:true,
  state: {
    isLoading: false,
    cart: {
      carts: [],
    },
    couponCode:{},
  },
  mutations: {
    LOADING(state, payload){
      state.isLoading = payload;
      console.log(state.isLoading);
    },
    CART(state,payload){
      state.cart = payload;
      // console.log(state.cart);
    },
    COUPONCODE(state, payload){
      state.couponCode = payload;
    }
  },
  actions: {
    updateLoading(context){
      context.commit('LOADING', payload);
    },
    getCart(context,payload) {
      context.commit('LOADING',payload);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        context.commit('CART',response.data.data)
        context.commit('LOADING',false);
        // console.log('取得購物車', response.data.data);
      });
    },
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING',true);
      axios.delete(url).then((response) => {
        // 刪除後重新抓getCart的資料
        context.dispatch('getCart');
        context.commit('LOADING',false);
      });
    },
    addtoCart(context , { id, qty }) {
      // console.log(context , id, qty);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const item = {
        product_id: id,
        qty,
      };
      context.commit('LOADING',true);
      axios.post(url, { data: item }).then((response) => {
        context.dispatch('getCart');
        context.commit('LOADING',false);
      });
    },
    applyCounpon(context,code){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const cupon = {
        code:code
      }
      // console.log({data:{"code":code}});
      axios.post(url,{ data:cupon }).then((response) =>{
        if(response.data.success){
          context.commit('COUPONCODE',cupon);
          alert(response.data.message);
          context.dispatch('getCart');
        }else{
          context.commit('COUPONCODE',{});
          alert(response.data.message);
        }
      })
    },
    cancelCoupon(context,code){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const cupon = {
        code:code
      };
      // console.log({data:{"code":code}});
      axios.post(url,{ data:cupon }).then((response) =>{
          if(response.data.success){
            context.commit('COUPONCODE',cupon);
            alert('已取消');
            context.dispatch('getCart');
          }else{
            context.commit('COUPONCODE',{});
            alert(response.data.message);
          }
        })
      },
    },
  getters:{
    cart(state){
      return state.cart;
    },
    isLoading(state) {
      return state.isLoading;
    },
  }
}
