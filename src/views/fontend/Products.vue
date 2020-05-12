<template>
<div class="product-bg-color">
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
            <div class="badge badge-pill badge-warning mr-2 mb-2 py-md-2"
            v-for="items in categories" :key="items" :class="{ tagActive : searchText === items }">
              <i class="fas fa-tag mx-1 fa" style="font-size:13px"></i>
              <span class="cursor px-1 h6" @click.prevent="searchText = items">
                {{ items }}
              </span>
            </div>
            <div class="mr-2">
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
            <div class="row no-gutters pb-3 d-flex flex-column"
            v-if="cart.carts.length !== 0">
              <div class="text-right text-warning mr-3">
                <h5 style="line-height:38px">總金額: {{ cart.final_total | currency }}</h5>
              </div>
              <div class="text-right mr-3">
                <button class="btn bg-warning" type="button" name="button" @click.prevent="gocart()">
                  <i class="fas fa-shopping-basket">
                    <span class="ml-1">結帳</span>
                  </i>
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
          <div class="card-deck col-md-6 mb-4" v-for="(item) in filterData[itemPage]" :key="item.id">
            <div class="card product-card text-center position-relative">
            <a href="#" @click.prevent="getproductId(item.id)">
              <div class="card-img" :style="{backgroundImage: 'url(' + item.imageUrl + ')' }">
                  <span class="card-link-text">查看更多</span>
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
                  <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <span class="badge badge-warning px-3 py-1">
                      <i class="fas fa-tag mr-2"></i>{{ item.category }}
                    </span>
                  </div>
                  <div class="col-md-6">
                      <p class="text-center">
                        <del class="text-white" style="font-weight:bold">
                          {{ item.origin_price | currency }}
                        </del>
                      </p>
                    <p class="card-text text-center">{{ item.price | currency }}</p>
                  </div>
                </div>
              </div>
              </a>
              <div class="card-footer-text d-flex justify-content-between">
                <div class="footer-btn p-2 border-right" @click="addfavorite(item.id,item.title)">
                  <i class="fas fa-heart"></i> 加入最愛
                </div>
                <div class="footer-btn p-2" @click.prevent="addtoCart(item.id,1)" style="width:50%;">
                  <i class="fas fa-shipping-fast"></i> 加入購物車
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 產品分頁 -->
  <div class="row d-flex mb-4">
    <div class="col-md-11">
      <div class="row d-flex justify-content-end mr-1">
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
import $ from 'jquery'
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
      let products = vm.products
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
    handleScroll () {
      if ($(window).scrollTop() > $('.product-banner').offset().top + 150) {
        $('.nav-bg').addClass('nav-bg-visible')
      } else {
        $('.nav-bg').removeClass('nav-bg-visible')
      }
    },
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
        vm.$store.dispatch('cartModules/updateCartQty', { originCartId, originProductId, newQty })
      } else {
        vm.$store.dispatch('cartModules/addtoCart', {
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
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.getProducts()
    this.getCart(true)
  }
}
</script>
<style>

</style>
