import axios from 'axios';

export default{
  namespaced:true,
  state: {
    production:{
      products:[],
      pagination:{
        current_page:1,
        total_pages:1,
        has_pre:false,
        has_next:false,
        num_page:6,
        pageStart:1,
      },
    },
      categories:[],
      productId:'',
      product:{},
    },
  mutations: {
    // 全產品寫入
    PRODUCTS(state, payload){
      state.production.products = payload;
        },
    // 分類資料寫入
    CATEGORIES(state, payload){
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
    // 分頁資料寫入
    PAGES(state, payload){
      // 計算頁面總數
      let totoalPage = Math.ceil(state.production.products.length / state.production.pagination.num_page);
      state.production.pagination.total_pages = totoalPage;

      // 計算產品顯示筆數(給產品跑迴圈 -> data.slice(start,end)
      let pagestart = (payload - 1) * state.production.pagination.num_page;
      state.production.pagination.pageStart = pagestart;

      // 跳頁資料寫入(修改現在頁數)
      state.production.pagination.current_page = payload;

      // 修改上下頁狀態
      // if(payload > 1){
      //   state.production.pagination.has_pre = true;
      // }else if (payload < totoalPage){
      //   state.production.pagination.has_next = true;
      // }
    },
    // 單一產品的ID
    PRODUCTID(state, payload){
      state.productId = payload;
    },
    // 單一產品寫入
    PRODUCTDETAIL(state, payload){
      state.product = payload;
      console.log(state.product);
    },
    // 單一產品更新
    UPDATEPRODUCT(state,payload){
      state.product = payload;
      console.log(state.product);
    }

  },
  actions: {
    // 抓全產品資料
    getProducts(context ,pages) {
      // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${pages}`;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      // vm.$store.state.isLoading = true;
      axios.get(url).then((response) => {
        // 將api取到的資料抓出來，準備給mutation改寫
        context.commit('PRODUCTS',response.data.products);
        context.commit('CATEGORIES',response.data.products);
        context.commit('PAGES',pages);
      });
    },
    // 抓過濾的產品資料
    // getFilter(context, tag){
    //   // context.dispatch('getProducts');
    //   context.commit('FILTERDATA',tag);
    // },
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
    setPage(context,page){
      context.commit('SETPAGE',page);
    }
  },
  // 給computed的mapGetters使用
  getters:{
    categories(state){
      return state.categories;
    },
    products(state){
      return state.production.products;
    },
    productDetail(state){
      return state.product;
    },
    pagination(state){
      return state.production.pagination;
    },
    filterProducts(state){
      return  state.filterProduct.products;
    }
  }
}
