<template>
    <div id="app">
      <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
      <cartMessage></cartMessage>
      <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-dark nav-bg p-0 fixed-top">
          <div class="container my-1">
            <a href="#" class="navbar-brand d-flex justify-content-center align-items-center router-link-exact-active active my-1 mx-2">
              <div class="logo-title d-inline-block d-flex flex-column nav-title">
                <h1 class="mb-0">黑膠時光</h1>
                <span class="h6 align-self-center">Endless</span>
              </div>
            </a>
            <ul class="navbar-nav order-md-1">
              <li class="nav-item py-1 pl-4" style="display:inline-block">
                <div class="btn-group dropleft">
                  <button type="button" class="btn m-0 p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-heart" aria-haspopup="true" aria-expanded="false">
                      <span class="badge badge-pill badge-danger">{{favorite.length}}</span>
                    </i>
                  </button>
                    <div class="dropdown-menu bg-dark">
                        <h6 class="text-center m-0 py-2 text-warning">我的最愛清單</h6>
                      <hr class="my-2">
                      <div class="row justify-content-center my-1" v-for="items in favorite" :key="items.id" style="width:400px;">
                        <div class="col-1" @click.prevent="dropfavorite(items.id)">
                          <i class="fas fa-eraser" style="font-size:16px"></i>
                        </div>
                        <div class="col-1" @click.prevent="addtoCart(items.id,1)">
                          <i class="fas fa-plus-circle" style="font-size:16px"></i>
                        </div>
                        <div class="col-9 text-warning text-left">
                          <span class="bg-box-pop" style="display:block" @click.prevent="getproductId(items.id)">
                            {{items.title}}
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
              <li class="nav-item py-1" style="display:inline">
                <router-link class="text-endless" href="#" to="/cart">
                  <i class="fas fa-shipping-fast">
                    <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
                  </i>
                </router-link>
              </li>
              <li class="nav-item py-1 pl-2" style="display:inline">
                <router-link class="text-endless" href="#" to="/login"><i class="fas fa-user-cog"></i></router-link>
              </li>
            </ul>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-link mx-2" to="/">
                    <span class="underline">關於黑膠</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link mx-2 " to="/productList">
                    <span class="underline">唱盤列表</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link mx-2 " to="/couponpage">
                    <span class="underline">我要酷碰</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <router-view/>
      <footer class="bg-footer">
        <div class="container">
          <div class="row no-gutters pb-2 d-flex pt-4 justify-content-end">
            <div class="col-md-10 text-white">
              <div>
                <p class="h3">About US</p>
                <hr class="pl-5 mt-1 mb-3" style="width:25%">
              </div>
              <div style="width:25%">
                <h1 class="ml-1">黑膠時光</h1>
                <h6 class="ml-2 mb-5">Endless</h6>
              </div>
              <h3 class="ml-2">Light of your Life with Endless</h3>
              <div class="ml-2 text-bold">
                <i class="fas fa-envelope-open-text mr-1 mt-2"></i>
                Jell9916@gmail.com
              </div>
            </div>
            <div class="col-md-2">
              <p class="h3 text-white">Follow US</p>
              <hr class="pl-5 mt-1 mb-3 text-white">
              <div class="d-flex align-items-center">
                <li class="list-inline-item">
                  <a class="text-endless" href="#">
                    <i class="fab fa-instagram fa-2x text-endless" aria-hidden="true"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="text-endless" href="https://github.com/Jellwu/endless">
                    <i class="fab fa-github fa-2x text-endless"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <router-link to="/profile">
                    <i class="far fa-address-card fa-2x text-endless"></i>
                  </router-link>
                </li>
              </div>
            </div>
          </div>
          <p class="text-word text-center">Copyright © Jell's Website 2020</p>
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

    }
  },
  methods: {
    ...mapActions('cartModules', ['getCart']),
    handleScroll () {
      const vm = this
      const path = vm.$route.path
      // 防止在別的頁面時也去判斷App.vue的拖拉視窗
      if (path === '/') {
        if ($(window).scrollTop() > $('.home-bg').offset().top + 150) {
          $('.nav-bg').addClass('nav-bg-visible')
        } else {
          $('.nav-bg').removeClass('nav-bg-visible')
        }
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
@import "~bootstrap/scss/bootstrap";
@import "./assets/scss/all.scss";
</style>
