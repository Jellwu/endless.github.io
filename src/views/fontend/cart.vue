<template>

  <div class="about">
    <cartMessage></cartMessage>
    <div class="product-banner d-flex align-items-center justify-content-center">
      <div class="">
        <h1 class="text-endless">購物車列表</h1>
      </div>
    </div>
    <div v-if="cart.carts.length === 0" class="no-carts">
      <div>
        <p class="text-endless">目前沒有選購任何商品</p>
        <div class="text-center">
          <router-link class="btn btn-outline-warning" to="/productList">
            <span class="underline">
              來去逛逛 <i class="fas fa-shipping-fast"></i>
            </span>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else-if="cart.carts.length !== 0">
    <div class="container my-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-10 mt-5">
          <table class="table table-sm text-endless">
            <thead>
              <tr>
                <td>功能</td>
                <td valign="middle">項目</td>
                <td valign="middle">產品名稱</td>
                <td>購買數量</td>
                <td class="text-right">產品單價</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="items in cart.carts" :key="items.id">
                <td style="vertical-align: middle;">
                  <button class="btn text-danger" type="button"
                  name="button" @click.prevent="removeCart(items.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
                <td style="width:80px;"><img class="img-fluid" :src="items.product.imageUrl"></td>
                <td style="vertical-align: middle;">{{ items.product.title }}
                  <p class="text-success" v-if="items.final_total !== items.total">
                    已套用優惠券
                  </p>
                </td>
                <td class="text-center" style="width:80px; vertical-align: middle;">{{ items.qty }}</td>
                <td class="text-right" style="width:100px; vertical-align: middle;">{{ items.product.price | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td  class="py-3" colspan="4" style="vertical-align: middle;">
                    <p class="h6 text-right pt-2">總計金額：</p>
                </td>
                <td class="py-3"  style="vertical-align: middle;">
                    <p class="h6 text-right pt-2">{{ cart.total | currency }}</p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
        <div class="row d-flex justify-content-around bg-cart-box no-gutters p-3">
          <div class="col-md-7">
              <ul class="text-endless mt-3 pl-4">
                <h4 class="pb-2"><i class="far fa-hand-point-right mr-2"></i>注意事項</h4>
                <li>確認所填寫的資料是否正確，若因資料不全而退貨，需負擔運費。</li>
                <li>收到商品後請確認本體(含外盒)是否有破損，於七天內提出瑕疵申請。</li>
                <li>本商品目前只供應台灣地區，只提供宅配到府。</li>
                <li>目前支援貨到付款、超商付款、ATM付款。</li>
              </ul>
          </div>
          <div class="col-md-5 bg-cart-box">
            <div class="text-endless mt-4">
              <!-- 結帳資訊區 -->
              <div class="text-right">
                <p class="pt-3 pr-2">共計 <span class="text-warning">{{ cart.carts.length }}</span> 項商品</p>
                <p class="pr-2" v-if="cart.final_total !== cart.total">
                  <span class="badge badge-pill badge-warning">已輸入優惠券</span>
                  <br>
                  結帳金額：<span class="text-warning">{{ cart.final_total | currency }}</span>
                </p>
                <p class="pr-2" v-else-if="cart.final_total === cart.total">
                  結帳金額：<span class="text-warning">{{ cart.final_total | currency }}</span>
                </p>

                <!-- 優惠券按鈕區 -->
                <div class="pb-2">
                  <div class="input-group ml-auto" v-if="cart.final_total !== cart.total">
                    <input type="text" class="form-control" placeholder="輸入優惠券號碼" v-model="couponCode"
                   aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                    <div class="input-group-append">
                      <button  class="btn btn-outline-secondary" @click="cancelCoupon"
                      type="button" id="button-addon2">取消</button>
                    </div>
                  </div>
                  <div class="input-group ml-auto" v-else-if="cart.final_total === cart.total">
                    <input type="text" class="form-control" placeholder="輸入優惠券號碼" v-model="couponCode"
                   aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-outline-warning" @click="getCoupon"
                      type="button" id="button-addon2">優惠券</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row text-right d-flex justify-content-center">
          <div class="col-md-10">
            <router-link class="btn btn-outline-warning" to="/cart_info">下一步</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'
import cartMessage from '@/components/CartMessage.vue'

export default {
  name: 'Cart',
  data () {
    return {
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      newCart: {}
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
    removeCart (id) {
      this.$store.dispatch('cartModules/removeCart', id)
    },
    getCoupon () {
      this.$store.dispatch('cartModules/applyCounpon', this.couponCode)
    },
    cancelCoupon () {
      this.$store.dispatch('cartModules/cancelCoupon', 'ORIGINP0')
    },
    cartCheckout () {
      const order = this.form
      this.$store.dispatch('orderModules/cartCheckout', order)
    }
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

</style>
