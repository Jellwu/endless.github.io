<template>
  <div class="about container my-5">
    <!-- sideBar -->
      <div class="row">
        <div class="col-md-4">
            <div class="rounded bg-box">
              <div class="px-3 py-2 h6 pt-5 mr-2">
                商品分類
                <i class="pl-1 fas fa-sort-down fa-x"></i>
              </div>
              <div class="row flex-md-column p-0 no-gutters justify-content-center">
                <ul>
                  <li class="px-3 py-2 h6 mr-2 mr-md-0">所有商品</li>
                  <li class="px-3 py-2 h6 mr-2 mr-md-0">熱門商品</li>
                  <li class="px-3 py-2 h6 mr-2 mr-md-0">所有商品</li>
                  <li class="px-3 py-2 h6 mr-2 mr-md-0">熱門商品</li>
                  <li class="px-3 py-2 h6 mr-2 mr-md-0">所有商品</li>
                </ul>
              </div>
              <div class="px-3 py-2 h6 pt-5 mr-2">
                <i class="fas fa-tags pr-2"></i>TAGS
                <div class="mx-4 my-2">
                  <span class="badge badge-pill badge-info m-1 py-2"
                  v-for="items in categories" :key="items">
                    <i class="fas fa-tag mr-2"></i>
                    <span class="px-2">{{items}}</span>
                  </span>
                </div>
              </div>
              <hr class="mx-4">
              <div class="px-3 py-2 h6 pt-2 mr-2">
                購物清單
                <span class="badge badge-warning">{{cart.carts.length}}</span>
                <i class="pl-1 fas fa-sort-down fa-x"></i>
              </div>
              <div class="row flex-md-column pl-2 no-gutters justify-content-center">
                  <div class="row px-3 py-2 h6 mr-1 mr-md-0 no-gutters" v-for="items in cart.carts" :key="items.id">
                    <img class="col-md-3 cart-img" :src="items.product.imageUrl"></img>
                    <ul class="ml-2 col-md-6 d-flex flex-column justify-content-center">
                      <li class="text-title mb-3">{{items.product.title}}</li>
                      <li>數量：{{items.qty }}{{items.product.unit}}</li>
                      <li>價格：{{items.total}}</li>
                    </ul>
                    <div class="col-md-2 d-flex flex-column justify-content-center">
                        <button class="btn text-danger text-right" type="button" name="button"
                        @click.prevent="removeCart(items.id)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 text-right">
                      <h5 style="line-height:38px">總金額:{{cart.final_total}}</h5>
                    </div>
                    <div class="col-md-6">
                      <button class="btn bg-info text-light" type="button" name="button"
                      @click.prevnet="gocart()">
                        買單去
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>

        <!-- 產品列表 -->
        <div class="col-md-8">
          <div class="row">
            <div class="card-deck col-md-6 mb-4 " v-for="(item) in products" :key="item.id">
              <div class="card product-card text-center">
                <img class="card-img-top img-influid p-1" src="" alt="Card image cap">
                <div class="card-body">
                  <p class="card-title">{{ item.title }}</p>
                  <p class="text-right pr-3 mb-0"><small><del class="text-secondary">{{item.origin_price}}</del></small></p>
                  <p class="text-danger text-right">{{item.price}}</p>
                </div>
                <div class="card-footer m-0 p-0">
                  <div class="d-flex justify-content-center no-gutters">
                    <div class="col-md-6">
                      <button class="btn btn-outline-info my-3" type="button" name="button" @click.prevent="getproductId(item.id)">
                        查看詳情
                      </button>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-outline-danger my-3" type="button" name="button" @click.prevent="addtoCart(item.id)">
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
</template>

<script>
//import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex';

export default{
  name: 'Products',
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
    // product Get
    // product() {
    //   return this.$store.state.products;
    // },
    // categories(){
    //   return this.$store.state.categories;
    // }
    ...mapGetters('productsModules',['products','categories']),
    // carts Get
    // cart(){
    //   return this.$store.state.cart;
    // },
    ...mapGetters('cartModules',['cart']),

  },
  methods: {
    // getProducts() {
    //   this.$store.dispatch('getProducts');
    // },
    ...mapActions('productsModules',['getProducts']),

    // getCart(){
    //   this.$store.dispatch('getCart');
    // },
    ...mapActions('cartModules',['getCart']),
    removeCart(id){
      this.$store.dispatch('cartModules/removeCart', id);
    },
    addtoCart(id, qty = 1){
      this.$store.dispatch('cartModules/addtoCart',{id , qty});
    },
    getproductId(id){
      // 帶入此產品的id給action抓api的資料
      this.$store.dispatch('productsModules/getproductId',id);
      // 完成後轉跳頁面
      this.$router.push(`/productList/${id}`);
      // console.log(this.$store.state.productsModules.product);
    },
    gocart(){
      this.$router.push(`/cart`);
    }
  },
  created(){
    this.getProducts();
    this.getCart();
  }
}

</script>
<style scpoed>
  .product-card{
    background-color: #C5D1D9;
    border:0.5px solid #5B89A6;
  }
  .product-card:hover{
    border:0.5px solid #F3F6E0;
    transition: all .5s;
  }
  .cart-img{
    height: 100px;
    width:50px;
  }
  .text-title{
    font-weight: bold;
  }
</style>
