<template>
  <div id="app">
    <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
    <a href="#" class="scrollTop smooth-scroll btn btn-outline-light btn-lg">
      <i class="fas fa-chevron-up"></i>
    </a>
    <cartMessage></cartMessage>
    <header>
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-dark nav-bg p-0 fixed-top shadow-sm text-dark">
        <button class="navbar-toggler order-md-3" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <router-link href="#" to="/" style="rgba(0,0,0,0);"
          class="order-md-1 navbar-brand d-flex justify-content-center align-items-center router-link-exact-active active ml-md-6">
          <div class="logo-title d-inline-block d-flex flex-column nav-title">
            <h1 class="mb-0 navbar-color">黑膠時光</h1>
            <span class="h6 align-self-center">Endless</span>
          </div>
        </router-link>

        <ul class="order-md-3 d-flex mr-md-6">
          <li class="nav-item mx-2">
            <div class="btn-group dropleft">
              <button type="button" class="btn m-0 p-0 moblieHide" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-heart position-relative" aria-haspopup="true" aria-expanded="false">
                  <span class="badge badge-pill badge-danger nav-length" v-if="favorite.length !== 0">
                    {{ favorite.length }}
                  </span>
                </i>
              </button>
              <div class="dropdown-menu bg-dark dropdown-menu-left">
                <h6 class="text-center m-0 py-2 text-warning">我的最愛清單</h6>
                <hr class="my-2">
                <div class="row justify-content-center my-1" v-for="items in favorite" :key="items.id">
                  <div class="col-1" @click.prevent="dropfavorite(items.id)">
                    <i class="fas fa-eraser" style="font-size:16px"></i>
                  </div>
                  <div class="col-1" @click.prevent="addtoCart(items.id,1)">
                    <i class="fas fa-plus-circle" style="font-size:16px"></i>
                  </div>
                  <div class="col-8 text-warning text-left">
                    <span class="bg-box-pop" style="display:block" @click.prevent="getproductId(items.id)">
                      {{ items.title }}
                    </span>
                  </div>
                </div>
                <div class="row" style="width:400px;">
                  <div class="col-12 text-warning text-center" v-if="favorite.length === 0">
                    <p>目前沒有追蹤的清單，快追起來吧！</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item mx-2">
            <router-link class="text-endless" href="#" to="/cart">
              <i class="fas fa-shipping-fast position-relative">
                <span class="badge badge-pill badge-danger nav-length" v-show="cart.carts.length !== 0">
                  {{ cart.carts.length }}
                </span>
              </i>
            </router-link>
          </li>
          <li class="nav-item moblieHide mx-2">
            <router-link class="text-endless" href="#" to="/login"><i class="fas fa-user-cog"></i></router-link>
          </li>
        </ul>

        <div class="collapse navbar-collapse order-md-1" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link mx-2" to="/">
                <span class="underline">關於黑膠</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link mx-2" to="/productList">
                <span class="underline">唱盤列表</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link mx-2" to="/couponpage">
                <span class="underline">我要酷碰</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </header>
    <main>
      <router-view/>
    </main>
    <footer class="bg-footer">
      <div class="container">
        <div class="row pb-2 d-flex pt-4">
          <div class="col-md-8 text-light">
            <div class="mb-5">
              <h1 class="ml-1">黑膠時光</h1>
              <h6 class="ml-2">Endless</h6>
            </div>
            <h3 class="ml-2">Light of your Life with Endless</h3>
            <div class="ml-2 text-bold">
              <i class="fas fa-envelope-open-text mr-1 mt-2"></i>
                Jell9916@gmail.com
            </div>
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-end">
            <div class="d-flex justify-content-end">
              <li class="list-inline-item">
                <a class="text-endless" href="#">
                  <i class="fab fa-instagram fa-3x" aria-hidden="true"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a class="text-endless" href="https://github.com/Jellwu/endless">
                  <i class="fab fa-github fa-3x"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <router-link to="/profile" class="text-endless">
                  <i class="far fa-address-card fa-3x"></i>
                </router-link>
              </li>
            </div>
            <p class="text-word text-right mt-2">本網頁並無商業用途，僅供個人使用</p>
          </div>
        </div>
          <p class="text-word text-center pb-3">Copyright © Jell's Website 2020</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
import 'vue-loading-overlay/dist/vue-loading.css'
import cartMessage from '@/components/CartMessage.vue'

export default {
  data () {
    return {
      active: false
    }
  },
  methods: {
    ...mapActions('cartModules', ['getCart']),
    handleScroll () {
      // 防止在別的頁面時也去判斷App.vue的拖拉視窗
      if ($(window).scrollTop() > $('#nav').offset().top + 50) {
        $('.nav-bg').addClass('nav-bg-visible')
      } else {
        $('.nav-bg').removeClass('nav-bg-visible')
      }
    },
    getfavorite () {
      this.$store.dispatch('productsModules/getfavorite')
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
    dropfavorite (id) {
      this.$store.dispatch('productsModules/dropfavorite', id)
    },
    getproductId (id) {
      this.$store.dispatch('productsModules/getproductId', id)
    }

  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartModules', ['cart']),
    ...mapGetters('productsModules', ['favorite'])
  },
  components: {
    cartMessage
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.getfavorite()
    this.getCart()
  }
}

</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
