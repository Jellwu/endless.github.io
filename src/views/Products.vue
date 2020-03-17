<template>
<div class="product-bg-color">
  <!-- <Loading loader="dots" :active.sync="isLoading"></Loading> -->
  <div class="product-banner d-flex align-items-center justify-content-center">
    <div class="">
      <h1 class="text-endless">黑膠專區</h1>
    </div>
  </div>
  <div class="container-fluid mt-5">
    <div class="row no-gutters d-flex justify-content-center">
      <!-- sideBar -->
      <div class="col-md-3 mb-5">
        <div class="rounded product-menu">
          <div class="title">
            <i class="fas fa-tags mt-5 mb-3"></i>
            <span class="pl-2">TAGS</span>
            <i class="pl-1 fas fa-sort-down fa-x"></i>
          </div>
          <div class="pl-md-4">
            <div class="badge badge-pill badge-warning mx-2 my-1 py-md-2" v-for="items in categories" :key="items">
              <i class="fas fa-tag mx-1 fa" style="font-size:13px"></i>
              <span class="cursor px-1 h6" @click.prevent="searchText = items">
                {{items}}
              </span>
            </div>
            <div class="mx-2">
              <div class="badge badge-pill badge-warning my-1 py-md-2">
                <i class="fas fa-tag mx-1 fa" style="font-size:13px"></i>
                <span class="cursor px-1 h6" @click.prevent="searchText = ''">
                  All Products
                </span>
              </div>
            </div>
          </div>
          <hr class="text-white px-3">
          <div v-if="cart.carts.length !== 0">
            <div>
              <span class="mt-5 mb-3 title pl-4">
                購物清單
              </span>
              <span class="badge badge-warning">{{cart.carts.length}}</span>
              <i class="pl-1 fas fa-sort-down fa-x"></i>
            </div>
            <ul class="d-flex flex-column mb-2">
              <li class="row no-gutters px-3 py-2" v-for="items in cart.carts" :key="items.id">
                <div class="col-3 cart-bg" :style="{backgroundImage: 'url(' + items.product.imageUrl + ')' }"></div>
                <div class="col-8 d-flex align-items-center">
                  <div class="pl-3">
                    <div class="text-title mb-2">{{items.product.title}}</div>
                    <div class="d-flex justify-content-start">
                      <div>價格：{{items.total}} / {{items.qty }}{{items.product.unit}}</div>
                    </div>
                  </div>
                </div>
                <div class="col-1 d-flex justify-content-center align-items-center">
                  <div>
                    <button class="btn text-danger text-right" type="button" name="button" @click.prevent="removeCart(items.id)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="row no-gutters pb-3">
              <div class="col-8 text-right text-warning">
                <h5 style="line-height:38px">總金額: {{cart.final_total |currency }}</h5>
              </div>
              <div class="col-4 text-center">
                <button class="btn bg-warning" type="button" name="button" @click.prevnet="gocart()">
                  結帳
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 產品列表 -->
      <div class="col-md-8 ml-4">
        <div class="row d-flex justify-content-start">
          <div class="card-deck col-md-4 mb-4" v-for="(item) in filterData[currentPage]" :key="item.id">
            <div class="card product-card text-center" @click.prevent="getproductId(item.id)">
              <div class="card-img-top card-img-bg" :style="{backgroundImage: 'url(' + item.imageUrl + ')' }">
              </div>
              <div class="card-body">
                <div class="row d-flex justify-context-center">
                  <div class="col-md-12 card-title m-0">
                    <p>
                      {{ item.title }}
                    </p>
                  </div>
                </div>

                <div class="row mt-1">
                  <div class="col-md-6">
                    <div>
                      <span class="badge badge-warning mt-3 px-3 py-1">
                        <i class="fas fa-tag mr-2"></i>{{item.category}}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p class="text-secondary text-right pr-3 mb-0"><small><del class="text-white">{{item.origin_price |currency}}</del></small></p>
                    <p class="card-text text-right">{{item.price |currency}}</p>
                  </div>
                </div>
              </div>
              <div class="card-foot">
                <div class="card-text pb-2">
                  <span>
                    More <i class="fas fa-angle-double-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 產品分頁 -->
  <div class="row d-flex justify-content-center mb-2">
    <div class="col-md-12">
      <div class="row justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" v-for="pages in filterData.length" @click.prevent='currentPage = pages - 1' :class="{active: currentPage === pages - 1}">
              <a class="page-link" href="#">{{pages}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//import mapGetter與mapActions的方法
import {
  mapGetters,
  mapActions
} from 'vuex';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Products',
  data() {
    return {
      searchText: '',
      ishover: true,
      currentPage: 0,
      pageNum: 6,
    };
  },
  computed: {
    filterData() {
      const vm = this;
      const newData = [];
      // 重新抓一次產品資料做過濾
      let products = this.$store.state.productsModules.products;
      // 針對全產品第一次過濾
      if (vm.searchText) {
        vm.currentPage = 0;
        products = products.filter((item) => {
          const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        })
      }
      // 分頁過濾(6筆/1頁)
      products.forEach((item, i) => {
        // 取餘數建立頁數
        if (i % vm.pageNum === 0) {
          newData.push([])
        }
        const page = parseInt(i / vm.pageNum)
        newData[page].push(item)
      });
      return newData;
    },
    ...mapGetters('productsModules', ['products', 'categories']),
    ...mapGetters('cartModules', ['cart', 'isLoading']),

  },
  methods: {
    // 抓全產品資料
    getProducts(pages = 1) {
      this.$store.dispatch('productsModules/getProducts', pages);
      // this.pages = this.$store.state.productsModules.pages;
      // console.log(this.pages);
    },
    getCart(payload) {
      this.$store.dispatch('cartModules/getCart', payload);
    },
    removeCart(id) {
      this.$store.dispatch('cartModules/removeCart', id);
    },
    getproductId(id) {
      // 帶入此產品的id給action抓api的資料
      this.$store.dispatch('productsModules/getproductId', id);
      // 完成後轉跳頁面
      this.$router.push(`/productList/${id}`);
      // console.log(this.$store.state.productsModules.product);
    },
    gocart() {
      this.$router.push(`/cart`);
    },
  },
  created() {
    this.getProducts();
    this.getCart(true);
  }
}
</script>
<style scpoed>
/* .product-bg-color{
    background-color: #262626;
  } */
ul,
li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.product-banner {
  background-image: url('https://images.unsplash.com/photo-1530288782965-fbad40327074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 300px;
}

.card-body {
  height: 170px;
}

.card-img-bg {
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.product-menu {
  background-color: #594539;
  color: #F3F6E0;
}

.product-menu .title {
  font-size: 20px;
  font-weight: bold;
  text-indent: 15px;
}

.product-card {
  border: 0px;
  background-image: url(https://images.unsplash.com/photo-1473646590311-c48e1bc77b44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

.product-card:hover {
  border: 1px solid #594539;
  box-shadow: 1px 1px 5px #594539;
  transition: all .2s;
}

.card-hover {
  height: 20px;
  background-image: url(./view-img/cardHoverw.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 2s;
}

.cart-bg {
  height: 80px;
  width: 80px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  min-width: 240px;
  font-weight: bold;
  font-size: 18px;
  background-color: rgba(38, 38, 38, 0.8);
  color: white;
  border-radius: 20px;
}

.card-text {
  color: #ffc107;
  font-size: 20px;
  font-weight: bold;
}

.text-title {
  font-weight: bold;
}

.cursor {
  cursor: pointer;
}

.position-absolute .box {
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
