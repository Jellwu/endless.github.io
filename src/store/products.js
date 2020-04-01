import axios from 'axios';
import router from '../router'

export default{
  namespaced:true,
  state: {
      products:[],
      categories:[],
      productId:'',
      product:{},
      favorite:[],
    },
  mutations: {
    // 全產品寫入
    PRODUCTS(state, payload){
      state.products = payload;
        },
    // 分類資料寫入
    CATEGORIES(state, payload){
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
    // 單一產品的ID
    PRODUCTID(state, payload){
      state.productId = payload;
      router.push(`/productList/${payload}`);
    },
    // 單一產品寫入
    PRODUCTDETAIL(state, payload){
      state.product = payload;
    },
    // 單一產品更新
    UPDATEPRODUCT(state,payload){
      state.product = payload;
    },
    // 加入我的最愛
    FAVORITE(state,payload){
      // 抓目前localstorage有的資料，轉成陣列
      const getLocalarray = JSON.parse(localStorage.getItem('favorite'));
      // 比較陣列中沒有回傳值id的資料
      let result = getLocalarray.map((item) =>{
        return item.id;}).indexOf(`${payload.id}`);
      // 結果不是'-1'的話就不寫入(表示Localstorage中已有資料)
      if(result === -1)
      {
        // 先暫存到state.favorite，把favorite的資料轉成文字丟到localStorage
        state.favorite.push(payload);
        localStorage.setItem('favorite',JSON.stringify(state.favorite));
      }else{
        return;
      }
    },
    DROPFAVORITE(state,payload){
      const getLocalarray = JSON.parse(localStorage.getItem('favorite'));
      getLocalarray.forEach((item,key) =>{
        if(item.id === payload){
          getLocalarray.splice(key,1);
          localStorage.setItem('favorite',JSON.stringify(getLocalarray));
        }else{
          return
        }
      })
    }
  },
  actions: {
    // 抓全產品資料
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(url).then((response) => {
        // 將api取到的資料抓出來，準備給mutation改寫
        context.commit('PRODUCTS',response.data.products);
        context.commit('CATEGORIES',response.data.products);
      });
    },
    // 抓單一產品id(要丟給明細頁面用的)
    getproductId(context, id){
      context.commit('PRODUCTID',id);
    },
    // 抓單一產品內容
    getproductDetail(context , id){
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      axios.get(url).then((response) =>{
        context.commit('PRODUCTDETAIL',response.data.product);
      });
    },
    // 更新單一產品內容(接收tempProduct的資料)
    updateProduct(context,item){
      // console.log({data:item},`${item.id}`);
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`;
      axios.put(url,{data:item}).then((response =>{
        if(response.data.success){
          alert(response.data.message);
          context.dispatch('getProducts');
        }else{
          alert(response.data.message);
        }
      }))
    },
    addProduct(context,item){
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/`;
      console.log({data:item});
      axios.post(url,{data:item}).then((response) =>{
        if(response.data.success){
          alert(response.data.message);
        }else{
          alert(response.data.message);
        }
          url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
          axios.get(url).then((response) => {
          // 將api取到的資料抓出來，準備給mutation改寫
          context.commit('PRODUCTS',response.data.products);
          context.commit('CATEGORIES',response.data.products);
        });
      })
    },
    dropProduct(context,item){
    // console.log(item);
        let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`;
        axios.delete(url).then((response) =>{
          alert(response.data.message);
          url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
          axios.get(url).then((response) => {
          // 將api取到的資料抓出來，準備給mutation改寫
          context.commit('PRODUCTS',response.data.products);
          context.commit('CATEGORIES',response.data.products);
        })
      });
    },
    favorite(context,item){
      context.commit('FAVORITE',item);
    },
    dropfavorite(context,item){
      context.commit('DROPFAVORITE',item);
    }
  },
  // 給computed的mapGetters使用
  getters:{
    categories(state){
      return state.categories;
    },
    products(state){
      return state.products;
    },
    productDetail(state){
      return state.product;
    },
    favorite(state){
      state.favorite = JSON.parse(localStorage.getItem('favorite'));
      return state.favorite;
    },
  },
}
