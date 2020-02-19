import axios from 'axios';

export default{
  namespaced:true,
  state: {
    products:[],
    categories:[],
    productId:'',
    product:{},
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
    },
    // 單一產品寫入
    PRODUCTDETAIL(state, payload){
      state.product = payload;
    },
  },
  actions: {
    // 抓全產品資料
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      // vm.$store.state.isLoading = true;
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
    }
  }
}
