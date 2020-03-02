<template>
<div class="product-bg-color">
  <div class="about container my-5">
    <div class="row no-gutters">
      <!-- sideBar -->
      <div class="col-md-3">
        <div class="rounded product-menu">
          <!-- <div class="px-3 py-2 h6 pt-5 mr-2">
                  商品分類
                  <i class="pl-1 fas fa-sort-down fa-x"></i>
                </div>
                <div class="row flex-md-column p-0 no-gutters justify-content-center">
                  <ul class="mx-3">
                    <li class="my-3 px-3 py-2 h6 mr-md-0 border border-pdc" v-for="items in categories" :key="items">{{items}}</li>
                  </ul>
                </div> -->
          <div class="px-3 py-2 pt-5 mr-2">
            <i class="fas fa-tags pr-2"></i>TAGS
            <div class="mx-2 my-2">
              <span class="badge badge-pill badge-warning m-1 py-2" v-for="items in categories" :key="items">
                <i class="fas fa-tag mx-2 fa" style="font-size:13px"></i>
                <span class="px-2 h6">{{items}}</span>
              </span>
            </div>
          </div>
          <hr class="mx-4" v-if="cart.carts.length !== 0">
          <div class="px-3 py-2 h6 pt-2 mr-2" v-if="cart.carts.length !== 0">
            購物清單
            <span class="badge badge-warning">{{cart.carts.length}}</span>
            <i class="pl-1 fas fa-sort-down fa-x"></i>
          </div>
          <div class="row flex-md-column pl-2 no-gutters justify-content-center">
            <div class="row py-2 h6 mr-md-0 no-gutters" v-for="items in cart.carts" :key="items.id">
              <img class="col-md-4 cart-img" :src="items.product.imageUrl"></img>
              <ul class="ml-2 col-md-5 d-flex flex-column justify-content-center">
                <li class="text-title mb-3">{{items.product.title}}</li>
                <li>數量：{{items.qty }}{{items.product.unit}}</li>
                <li>價格：{{items.total}}</li>
              </ul>
              <div class="col-md-2 d-flex flex-column justify-content-center">
                <button class="btn text-danger text-right" type="button" name="button" @click.prevent="removeCart(items.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <div class="row" v-if="cart.carts.length !== 0">
              <div class="col-md-6 text-right">
                <h5 style="line-height:38px">總金額:{{cart.final_total}}</h5>
              </div>
              <div class="col-md-6">
                <button class="btn bg-warning" type="button" name="button" @click.prevnet="gocart()">
                  CheckOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 產品列表 -->
      <div class="col-md-9 pl-4">
        <div class="row">
          <div class="card-deck col-md-6 mb-4"
          v-for="(item) in products.slice(pagination.pageStart, pagination.pageStart + pagination.num_page)"
          :key="item.id">
            <div class="card product-card text-center" @click.prevent="getproductId(item.id)">
              <div class="card-img-top card-img-bg" :style="{backgroundImage: 'url(' + item.imageUrl + ')' }"></div>
              <div class="card-body product-card-body">
                <p class="card-title py-2 m-0">{{ item.title }}</p>
                <div class="row">
                  <div class="col-md-6">
                    <span class="badge badge-warning mt-3 px-3 py-1">
                      <i class="fas fa-tag mr-2"></i>{{item.category}}
                    </span>
                  </div>
                  <div class="col-md-6">
                    <p class="text-secondary text-right pr-3 mb-0"><small><del class="endless-text">{{item.origin_price}}</del></small></p>
                    <p class="card-text text-right">{{item.price}}</p>
                  </div>
                </div>
                <div class="card-text">
                  More <i class="fas fa-angle-double-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 產品分頁 -->
        <div class="row justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <!-- <li class="page-item" :class="{'disabled': pagination.has_pre === false}">
                <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="getProducts(pagination.current_page - 1)">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li> -->
              <li class="page-item" v-for="pages in pagination.total_pages"
              :class="{'active':pagination.current_page === pages}"
              @click.prevent = getProducts(pages);>
                <a class="page-link" href="#">{{pages}}</a>
              </li>
              <!-- <li class="page-item" :class="{'disabled': pagination.has_next === false}">
                <a class="page-link" href="#" aria-label="Next"
                @click.prevent="getProducts(pagination.current_page + 1)">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li> -->
            </ul>
          </nav>
        </div>

      </div>
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

export default {
  name: 'Products',
  data() {
    return {
      searchText: '',
      ishover: true,
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
    ...mapGetters('productsModules', ['products','categories','pagination']),
    // carts Get
    // cart(){
    //   return this.$store.state.cart;
    // },
    ...mapGetters('cartModules', ['cart']),

  },
  methods: {
    getProducts(pages = 1) {
      this.$store.dispatch('productsModules/getProducts',pages);
      // this.pages = this.$store.state.productsModules.pages;
      // console.log(this.pages);
    },
    // ...mapActions('productsModules', ['getProducts']),

    // getCart(){
    //   this.$store.dispatch('getCart');
    // },
    ...mapActions('cartModules', ['getCart']),
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
    setPage(page){
      this.$store.dispatch('productsModules/setPage', page);
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
}
</script>
<style scpoed>
/* .product-bg-color{
    background-color: #262626;
  } */
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

.cart-img {
  height: 100px;
  width: 50px;
}

.card-title {
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
</style>
