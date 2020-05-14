<template>
<div>
  <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
      <div class="customform-banner d-flex align-items-center justify-content-center mb-5">
        <div>
          <h1 class="text-endless">訂單查詢</h1>
        </div>
      </div>
      <div class="container my-5">
          <div class="row d-flex justify-content-center my-5">
            <div class="col-md-5 d-flex flex-column">
              <div class="col mb-4">
                  <div class="h2 bg-warning text-dark text-center py-3">
                    貨運明細
                  </div>
                  <div class="bg-orders text-endless py-3">
                    <p class="d-flex cartOrder-content">
                      <span>收件者姓名:</span>
                      <span>{{ Order.user.name }}</span>
                    </p>
                    <p class="d-flex cartOrder-content">
                      <span>收件地址:</span>
                      <span>{{ Order.user.address }}</span>
                    </p>
                    <p class="d-flex cartOrder-content">
                      <span>聯絡方式:</span>
                      <span>{{ Order.user.tel }}</span>
                    </p>
                    <p class="d-flex cartOrder-content">
                      <span>備註:</span>
                      <span>{{ Order.message }}</span>
                    </p>
                  </div>
              </div>

              <div class="col mb-4">
                  <div class="h2 bg-warning text-dark text-center py-3">
                    訂單摘要
                  </div>
                  <div class="bg-orders text-endless py-3">
                    <p class="cartOrder-content">
                      <span>訂單編號:</span>
                      <span style="font-size:18px">{{ Order.id }}</span>
                    </p>
                    <p class="cartOrder-content">
                      <span>付款狀態:</span>
                      <span class="text-success" v-if="Order.is_paid === true">
                        已完成付款
                      </span>
                      <span class="text-danger" v-else-if="Order.is_paid === false">
                        尚未完成付款
                      </span>
                    </p>
                    <p class="cartOrder-content">
                      <span>訂單總價:</span>
                      <span>{{ Order.total | currency }}</span>
                    </p>
                  </div>
              </div>

              <div class="col">
                <div class="h2 bg-warning text-dark text-center py-3">
                  訂購明細
                </div>
                <div class="bg-orders text-endless py-4">
                  <div class="row d-flex justify-content-center py-2" v-for="items in Order.products" :key='items.id'>
                    <div class="col-4">
                      <img :src="items.product.imageUrl" class="img-fluid rounded" alt="...">
                    </div>
                    <div class="col-6" style="font-weight:bold;">
                      <p>{{ items.product.title }}</p>
                      <p>{{ items.qty }} {{ items.product.unit }}</p>
                      <p v-if="items.final_total === items.total">
                        {{ items.product.price | currency }}
                      </p>
                      <p v-else-if="items.final_total === items.total">
                        <del>{{ items.product.price | currency }}</del><br>
                        <span class="h5 text-success mr-2">{{ items.final_total | currency }}</span>
                        <small class="text-white text-center shadow-none badge badge-success">
                          折扣價
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="sticky-top">
                <router-link class="order-link" href="#" to="/productList" v-if="Order.is_paid === true">
                  <div class="bg-orderpay d-flex justify-content-center align-items-center">
                    <div class="text-center textArea-order">
                      <p>我們正儘速出貨</p>
                      <p>點擊這裡繼續逛逛吧</p>
                    </div>
                  </div>
                </router-link>
                <a class="order-link" href="#" v-if="Order.is_paid === false" @click.prevent="gocheck()">
                  <div class="d-flex justify-content-center align-items-center" :class="{ 'bg-nopay': !Order.is_paid }">
                    <div class="text-center textArea-order">
                      <p>歐喔！還沒付款呢！</p>
                      <p>點擊這裡去付款吧！</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
        </div>
      </div>
</div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'

export default {
  name: 'Product',
  data () {
    return {
      orderId: ''
    }
  },
  computed: {
    ...mapGetters('orderModules', ['Order']),
    ...mapGetters('cartModules', ['cart']),
    ...mapGetters(['isLoading'])
  },
  methods: {
    handleScroll () {
      if ($(window).scrollTop() > $('.customform-banner').offset().top + 150) {
        $('.nav-bg').addClass('nav-bg-visible')
      } else {
        $('.nav-bg').removeClass('nav-bg-visible')
      }
    },
    getOrder () {
      const id = this.orderId
      this.$store.dispatch('orderModules/getOrder', id)
    },
    gocheck () {
      const id = this.orderId
      this.$router.push(`/cart_checkout/${id}`)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    this.orderId = this.$route.params.orderID
    this.getOrder()
  }
}
</script>
<style scpoed>
.customform-banner{
  background-image: url('https://images.unsplash.com/photo-1580112646171-13522164ead4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height:300px;
}
</style>
