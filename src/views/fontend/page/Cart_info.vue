<template>
  <div class="info">
      <div class="product-banner d-flex align-items-center justify-content-center">
        <div class="">
          <h1 class="text-endless">客戶資料填寫</h1>
        </div>
      </div>
      <div class="container my-5">
        <div class="row d-flex d-flex justify-content-between align-items-center">
          <div class="col-md-6">
            <h2 class="text-white carts-check-title">
              Step 2. 填寫寄貨資料
            </h2>
          </div>
          <div class="col-md-4">
            <div class="pay-process">
              <ul class="d-flex justify-content-between">
                <li class="pay-process-1 complited-1"></li>
                <li class="pay-process-2 complited-2"></li>
                <li class="pay-process-3"></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row align-items-baseline text-warning my-5 justify-content-center">
          <div></div>
          <div class="col-md-4 sticky-top">
            <div class="">
              <div class="h3 bg-warning text-dark text-center py-3">
                訂單摘要
              </div>
              <div class="bg-orders text-endless cartOrder-content">
                <p class="d-flex justify-content-between">
                  <span>原價:</span>
                  <span>{{ cart.total | currency }}</span>
                </p>
                <p class="d-flex justify-content-between" v-if=" cart.final_total !== cart.total">
                  <span>折扣:</span>
                  <span class="text-success">{{ cart.total - cart.final_total | currency }}</span>
                </p>
                <p class="d-flex justify-content-between">
                  <span>運費:</span>
                  <span>{{ 0 | currency }}</span>
                </p>
                <p class="d-flex justify-content-between mt-2" style="font-size:26px;">
                  <span>總計:</span>
                  <span>{{ cart.final_total | currency }}</span>
                </p>
              </div>
            </div>
            <div class="mt-5">
              <div class="h2 bg-warning text-dark text-center py-3">
                訂購明細
              </div>
              <div class="bg-orders text-endless py-4">
                <div class="row d-flex justify-content-center py-2" v-for="items in cart.carts" :key='items.id'>
                  <div class="col-4">
                    <img :src="items.product.imageUrl" class="img-fluid rounded" alt="...">
                  </div>
                  <div class="col-6" style="font-weight:bold;">
                    <p>{{ items.product.title }}</p>
                    <p>{{ items.qty }} {{ items.product.unit }}</p>
                    <p v-if="items.final_total === items.total">
                      {{ items.total | currency }}
                    </p>
                    <p v-else-if="items.final_total !== items.total">
                      <del>{{ items.total | currency }}</del><br>
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
          <form class="col-md-7">
            <div class="h2 bg-warning text-dark text-center py-3">
              寄送資料
            </div>
            <div class="bg-orders text-endless" style="padding:20px 25px;font-weight:bold;">
            <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
              <ValidationProvider rules="required" name="收件人姓名" v-slot="{ errors }">
                <div class="form-group">
                  <label for="username">收件人姓名(*必填)：</label>
                  <input class="form-control" type="text" name="name" id="username"
                  v-model="form.user.name" placeholder="請輸入姓名"
                  :class="{'is-invalid':errors[0]}">
                  <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider rules="required|numeric|digits:10" name="電話" v-slot="{ errors }">
                <div class="form-group">
                  <label for="usertel">收件人電話(*必填)：</label>
                  <input class="form-control" type="tel" name="tel" id="usertel"
                  placeholder="請輸入電話" v-model="form.user.tel"
                  :class="{'is-invalid':errors[0]}">
                  <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider rules="required" name="地址" v-slot="{ errors }">
              <div class="form-group">
                  <label for="useraddr">收件人地址(*必填)：</label>
                  <input class="form-control" type="text" name="name" id="useraddr"
                  placeholder="請輸入地址" v-model="form.user.address"
                  :class="{'is-invalid':errors[0]}">
                <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
              </div>
              </ValidationProvider>

              <ValidationProvider rules="email" name="e-mail" v-slot="{ valid, errors }" ref="emailField">
                <div class="form-group">
                  <label for="useremail">電子信箱：</label>
                  <input class="form-control" type="email" name="name" id="useremail"
                  v-model="form.user.email" placeholder="請輸入Email取得優惠消息"
                  :class="{'is-invalid':errors[0]}">
                  <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                      v-model="form.message" placeholder="備註:產品分開裝...等資訊"></textarea>
                </div>
                <div class="form-group text-right">
                    <button class="btn btn-warning" :disabled="invalid" :class="{'discursor':invalid}"
                    @click.prevent = "cartCheckout">送出訂單</button>
                </div>
            </ValidationObserver>
          </div>
        </form>
      </div>
      </div>
    </div>

</template>

<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters('cartModules', ['cart'])
  },
  methods: {
    ...mapActions('cartModules', ['getCart']),
    handleScroll () {
      if ($(window).scrollTop() > $('.product-banner').offset().top + 150) {
        $('.nav-bg').addClass('nav-bg-visible')
      } else {
        $('.nav-bg').removeClass('nav-bg-visible')
      }
    },
    cartCheckout () {
      const order = this.form
      this.$store.dispatch('orderModules/cartCheckout', order)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    this.getCart()
  }
}

</script>
<style scpoed>
.product-banner{
  background-image: url('https://images.unsplash.com/photo-1580112646171-13522164ead4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height:300px;
}
.about .bg-cart-box{
  width:100%;
  background-color: rgba(0, 0, 0,0.1);
}
.bg-cart-box .input-group{
  margin:10px;
  width:90%;
}
.no-carts{
  height:400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:50px;
}
.badge-pill{
  cursor:none;
}

</style>
