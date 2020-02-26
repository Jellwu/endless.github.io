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
    // 單一產品更新
    UPDATEPRODUCT(state,payload){
      state.product = payload;
      console.log(state.product);
    }
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
        // 重新呼叫一次products的資料
        // url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        // axios.get(url).then((response) => {
        //   // 將api取到的資料抓出來，準備給mutation改寫
        //   context.commit('PRODUCTS',response.data.products);
        //   context.commit('CATEGORIES',response.data.products);
        // });
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
    }
  }
}
