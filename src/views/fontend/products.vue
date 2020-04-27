<template>
<div class="product-bg-color">
  <!-- <Loading loader="dots" :active.sync="isLoading"></Loading> -->
  <div class="product-banner d-flex align-items-center justify-content-center">
    <div>
      <h1 class="text-endless">黑膠專區</h1>
    </div>
  </div>
  <div class="container-fluid mt-5">
    <div class="row no-gutters d-flex justify-content-center ml-5">
      <!-- sideBar -->
      <div class="col-md-3 mb-5 ml-5">
        <div class="rounded product-menu">
          <div class="title">
            <i class="fas fa-tags mt-5 mb-3"></i>
            <span class="pl-2">TAGS</span>
          </div>
          <div class="pl-md-4 pb-3">
            <div class="badge badge-pill badge-warning mx-2 mb-2 py-md-2"
            v-for="items in categories" :key="items" :class="{ tagActive : searchText === items }">
              <i class="fas fa-tag mx-1 fa" style="font-size:13px"></i>
              <span class="cursor px-1 h6" @click.prevent="searchText = items">
                {{ items }}
              </span>
            </div>
            <div class="mx-2">
              <div class="badge badge-pill badge-warning my-1 py-md-2" :class="{ tagActive : searchText == '' }">
                <i class="fas fa-tag mx-1 fa" style="font-size:13px"></i>
                <span class="cursor px-1 h6" @click.prevent="searchText = ''">
                  All Products
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center">
            <hr class="text-white px-5 mt-5">
            <div>
              <span class="title">
                <i class="fas fa-tags mt-5 mb-3"></i>
                <span class="px-2">Order List</span>
              </span>
              <span class="badge badge-warning px-1">{{ cart.carts.length }}</span>
            </div>
            <ul class="d-flex flex-column mb-2">
              <li class="row no-gutters px-3 py-2" v-for="items in cart.carts" :key="items.id">
                <div class="col-3 cart-bg" :style="{backgroundImage: 'url(' + items.product.imageUrl + ')' }"></div>
                <div class="col-8 d-flex align-items-center">
                  <div class="pl-3">
                    <div class="text-title mb-2">{{ items.product.title }}</div>
                    <div class="d-flex justify-content-start">
                      <div>價格：{{ items.total }} / {{ items.qty }}{{ items.product.unit }}</div>
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
            <div class="row no-gutters pb-3" v-if="cart.carts.length !== 0">
              <div class="col-8 text-right text-warning">
                <h5 style="line-height:38px">總金額: {{ cart.final_total |currency }}</h5>
              </div>
              <div class="col-4 text-center">
                <button class="btn bg-warning" type="button" name="button" @click.prevent="gocart()">
                  結帳
                </button>
              </div>
            </div>
            <div class="row no-gutters pb-3 justify-content-center" v-else-if="cart.carts.length === 0">
              <div class="col-10 text-right text-endless">
                <h5 style="line-height:38px">目前購物車是空的！歡迎選購！</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 產品列表 -->
      <div class="col-md-8 ml-4">
        <div class="row d-flex justify-content-start">
          <div class="card-deck col-md-4 mb-4" v-for="(item) in filterData[itemPage]" :key="item.id">
            <div class="card product-card text-center position-relative">
            <a href="#" @click.prevent="getproductId(item.id)">
              <div class="card-img" :style="{backgroundImage: 'url(' + item.imageUrl + ')' }">
                  <span class="card-img-title">查看更多</span>
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
                        <i class="fas fa-tag mr-2"></i>{{ item.category }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p class="text-secondary text-right pr-3 mb-0">
                      <small>
                        <del class="text-dark" style="font-weight:bold">
                          {{ item.origin_price |currency }}
                        </del>
                      </small>
                    </p>
                    <p class="card-text text-right">{{ item.price |currency }}</p>
                  </div>
                </div>
              </div>
              </a>
              <div class="card-footer-text d-flex justify-content-between">
                <div class="footer-btn p-2" @click="addfavorite(item.id,item.title)">
                  加入最愛 <i class="fas fa-heart"></i>
                </div>
                <div class="footer-btn p-2" @click.prevent="addtoCart(item.id,1)" style="width:50%;">
                  加入購物車 <i class="fab fa-shopify"></i>
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
            <li class="page-item" v-for="pages in filterData.length" :key="pages"
            @click.prevent='itemPage = pages - 1'
            :class="{active: itemPage === pages - 1}">
              <a class="page-link" href="#">{{ pages }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Products',
  data () {
    return {
      searchText: '',
      currentPage: 1,
      itemPage: 0,
      pageNum: 6,
      isActiveid: '',
      active: false
    }
  },
  computed: {
    filterData () {
      const vm = this
      const newData = []
      // 重新抓一次產品資料做過濾
      let products = this.$store.state.productsModules.products
      // 針對全產品第一次過濾
      if (vm.searchText) {
        vm.itemPage = 0
        products = products.filter((item) => {
          const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase())
          return data
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
      })
      return newData
    },
    ...mapGetters('productsModules', ['products', 'categories']),
    ...mapGetters('cartModules', ['cart'])

  },
  methods: {
    // 抓全產品資料
    getProducts (pages = 1) {
      this.$store.dispatch('productsModules/getProducts', pages)
    },
    getCart (payload) {
      this.$store.dispatch('cartModules/getCart', payload)
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const duplicatdItem = vm.cart.carts.filter(items => items.product_id === id)
      if (duplicatdItem.length > 0) {
        const sameItem = duplicatdItem[0]
        const originCartId = sameItem.id
        const originProductId = sameItem.product.id
        const newQty = sameItem.qty + qty
        this.$store.dispatch('cartModules/updateCartQty', { originCartId, originProductId, newQty })
      } else {
        this.$store.dispatch('cartModules/addtoCart', {
          id,
          qty
        })
      }
    },
    removeCart (id) {
      this.$store.dispatch('cartModules/removeCart', id)
    },
    getproductId (id) {
      // 帶入此產品的id給action抓api的資料
      this.$store.dispatch('productsModules/getproductId', id)
      this.$router.push(`/productList/${id}`)
    },
    gocart () {
      this.$router.push('/cart')
    },
    addfavorite (id, title) {
      this.$store.dispatch('productsModules/addfavorite', { id, title })
    }
  },
  created () {
    this.getProducts()
    this.getCart(true)
  }
}
</script>
<style>

</style>
