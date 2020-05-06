<template>
<div class="about">
  <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
      <div class="customform-banner d-flex align-items-center justify-content-center mb-5">
        <div>
          <h1 class="text-endless">訂單資料確認</h1>
        </div>
      </div>
      <div class="container my-5">
        <div class="row d-flex d-flex justify-content-between align-items-center mt-5">
          <div class="col-md-6">
            <h2 class="text-white carts-check-title">
              Step 3. 輸入付款資訊
            </h2>
          </div>
          <div class="col-md-4">
            <div class="pay-process">
              <ul class="d-flex justify-content-between">
                <li class="pay-process-1 complited-1"></li>
                <li class="pay-process-2 complited-2"></li>
                <li class="pay-process-3 complited-3"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row justify-content-center my-5" v-if="Order.is_paid === false">
          <div class="col-md-10">
            <div class="my-2">
              <div class="h2 bg-warning text-dark text-center py-3">
                客戶資料確認
              </div>
              <div class="bg-white text-dark cartOrder-content">
                <p class="d-flex justify-content-between">
                  <span>收件人姓名:</span>
                  <span>{{ Order.user.name }}</span>
                </p>
                <p class="d-flex justify-content-between">
                  <span>收件人電郵:</span>
                  <span>{{ Order.user.email }}</span>
                </p>
                <p class="d-flex justify-content-between">
                  <span>聯絡電話:</span>
                  <span>{{ Order.user.tel }}</span>
                </p>
                <p class="d-flex justify-content-between">
                  <span>寄送地址:</span>
                  <span>{{ Order.user.address }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="h2 bg-warning text-dark text-center py-3">
              輸入付款資訊
            </div>
            <div class="bg-white text-dark cartOrder-content">
                <form class="my-4">
                  <div class="form-row" id="creditNo">
                  <label for="credit" class="col-2 col-form-label">信用卡號:</label>
                    <div class="col-2 creditform">
                      <input type="text" class="form-control" placeholder="xxxx">
                    </div>
                    <div class="col-2 creditform">
                      <input type="text" class="form-control" placeholder="xxxx">
                    </div>
                    <div class="col-2 creditform">
                      <input type="text" class="form-control" placeholder="xxxx">
                    </div>
                    <div class="col-2">
                      <input type="text" class="form-control" placeholder="xxxx">
                    </div>
                  </div>
                  <div class="form-row" id="creditNo">
                  <label for="credit" class="col-2 col-form-label">持卡人姓名:</label>
                    <div class="col-4">
                      <input type="text" class="form-control" placeholder="江">
                    </div>
                    <div class="col-4">
                      <input type="text" class="form-control" placeholder="誌青">
                    </div>
                  </div>
                  <div class="form-row" id="creditNo">
                  <label for="credit" class="col-2 col-form-label">卡片期限:</label>
                    <div class="col-2 creditform">
                      <input type="text" class="form-control" placeholder="09">
                    </div>
                    <div class="col-2">
                      <input type="text" class="form-control" placeholder="36">
                    </div>
                  </div>
                  <div class="form-row" id="creditNo">
                  <label for="credit" class="col-2 col-form-label">安全碼:</label>
                    <div class="col-3">
                      <input type="text" class="form-control" placeholder="999">
                    </div>
                  </div>
                  <div class="form-row justify-content-center mt-4">
                    <div class="col-11">
                      <button type="button" name="button" class="btn btn-block btn-warning btn-lg rounded-0 text-dark py-3">
                        確認付款
                      </button>
                    </div>
                  </div>
                </form>
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
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  computed: {
    ...mapGetters('orderModules', ['Order']),
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
    payOrder (e) {
      e.preventDefault()
      const id = this.orderId
      this.$store.dispatch('orderModules/payOrder', id)
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
.customform th{
  text-align: right;
}
.customform td{
  text-align: center;
}
thead th{
  text-align: center;
}
.customform-banner{
  background-image: url('https://images.unsplash.com/photo-1580112646171-13522164ead4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height:300px;
}
.paid-msgBox{
  background-color: rgba(0,0,0,0.3);
  border-radius:10px;
  width:700px;
  margin:0px auto;
  height:500px;
}

</style>
