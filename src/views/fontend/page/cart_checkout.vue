<template>
<div>
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
        <div class="row justify-content-center align-items-baseline my-5">
            <div class="col-md-5 sticky-top">
                <div class="col my-2">
                  <div class="h2 bg-warning text-dark text-center py-3">
                    客戶資料確認
                  </div>
                  <div class="bg-orders text-endless cartOrder-content">
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
                <div class="col mt-4">
                  <div>
                    <div class="h3 bg-warning text-dark text-center py-3">
                      訂單摘要
                    </div>
                    <div class="bg-orders text-endless cartOrder-content">
                      <p class="d-flex justify-content-between">
                        <span>費用:</span>
                        <span>{{ Order.total | currency }}</span>
                      </p>
                      <p class="d-flex justify-content-between">
                        <span>運費:</span>
                        <span>{{ 0 | currency }}</span>
                      </p>
                      <p class="d-flex justify-content-between">
                        <span>付款狀態:</span>
                        <span class="text-success" v-if="Order.is_paid === true">已完成付款</span>
                        <span class="text-danger" v-if="Order.is_paid === false">未完成付款</span>
                      </p>
                      <p class="d-flex justify-content-between mt-2" style="font-size:26px;">
                        <span>總計:</span>
                        <span>{{ Order.total | currency }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            <div class="col-md-7">
              <div class="h2 bg-warning text-dark text-center py-3">
                訂單資料確認與修改
              </div>
              <div class="bg-orders pt-3">
                <table class="table table-borderless table-striped text-endless mx-auto" style="width:590px">
                  <thead class="text-endless h5">
                    <tr>
                      <td valign="middle">項目</td>
                      <td valign="middle">產品名稱</td>
                      <td style="width:75px">數量</td>
                      <td class="text-right" style="width:75px">單價</td>
                    </tr>
                  </thead>
                  <tbody class="cartOrder-content">
                    <tr v-for="items in Order.products" :key="items.id">
                      <td style="width:120px;">
                        <img class="img-fluid" :src="items.product.imageUrl" style="width:80px">
                      </td>
                      <td style="vertical-align: middle;">
                          {{ items.product.title }}
                      </td>
                      <td class="text-center" style="vertical-align: middle;">
                        {{ items.qty }}
                      </td>
                      <td class="text-right" style="vertical-align: middle;">{{ items.product.price * items.qty | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="cartOrder-content">
                      <td  class="py-3" colspan="3" style="vertical-align: middle;">
                          <p class="text-right pt-2">總計金額：</p>
                      </td>
                      <td class="py-3"  style="vertical-align: middle;">
                          <p class="text-right text-warning">{{ Order.total | currency }}</p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
        </div>

          <div class="row justify-content-center align-items-baseline my-5">
            <div class="col-md-12">
              <div class="h2 bg-warning text-dark text-center py-3">
                輸入付款資訊
              </div>
              <div class="bg-orders text-endless cartOrder-content">
                <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
                  <form class="my-4">
                    <div class="form-row mb-2" style="widht:80%">
                      <label for="creditNo" class="col-form-label">信用卡號:</label>
                      <ValidationProvider class="col creditform" rules="required|numeric|digits:4" name="卡號" v-slot="{ errors }">
                          <input type="text" class="form-control" name="creditNo" maxlength="4"
                           v-model="order.credit.no1" :class="{'is-invalid':errors[0]}"
                          placeholder="06xx">
                          <span class="text-error" v-if="errors[0]">{{ errors[0] }}</span>
                      </ValidationProvider>

                      <ValidationProvider class="col creditform" rules="required|numeric|digits:4" name="" v-slot="{ errors }">
                          <input type="text" class="form-control" v-model="order.credit.no2"
                          :class="{'is-invalid':errors[0]}" maxlength="4"
                          placeholder="xxxx">
                      </ValidationProvider>

                      <ValidationProvider class="col creditform" rules="required|numeric|digits:4" name="" v-slot="{ errors }">
                          <input type="text" class="form-control" v-model="order.credit.no3"
                          :class="{'is-invalid':errors[0]}" maxlength="4"
                          placeholder="xxxx">
                      </ValidationProvider>

                      <ValidationProvider class="col" rules="required|numeric|digits:4" name="" v-slot="{ errors }">
                          <input type="text" class="form-control" v-model="order.credit.no4"
                          :class="{'is-invalid':errors[0]}" maxlength="4"
                          placeholder="xxxx">
                      </ValidationProvider>
                  </div>

                  <div class="form-row mb-2" id="creditNo">
                  <label for="credit" class="col-form-label">卡片期限:</label>
                  <ValidationProvider class="col-2" rules="required|numeric|digits:2" name="期限" v-slot="{ errors }">
                      <input type="text" class="form-control" name="creditNo"
                       v-model="order.credit.month" :class="{'is-invalid':errors[0]}"
                      placeholder="06" maxlength="2">
                  </ValidationProvider>
                  <ValidationProvider class="col-2" rules="required|numeric|digits:2" name="期限" v-slot="{ errors }">
                      <input type="text" class="form-control" v-model="order.credit.year"
                      :class="{'is-invalid':errors[0]}" maxlength="2"
                      placeholder="30">
                    </ValidationProvider>
                  </div>

                    <div class="form-row mb-2">
                    <label for="creditName" class="col-form-label">持卡人姓名:</label>
                      <ValidationProvider class="col-2" rules="required" name="姓名" v-slot="{ errors }">
                            <input type="text" class="form-control" v-model="order.credit.surname"
                            :class="{'is-invalid':errors[0]}"
                            placeholder="江" maxlength="1">
                      </ValidationProvider>

                      <ValidationProvider class="col-3" rules="required" name="姓名" v-slot="{ errors }">
                          <input type="text" class="form-control" v-model="order.credit.name"
                          :class="{'is-invalid':errors[0]}"
                          placeholder="誌青" maxlength="2">
                      </ValidationProvider>
                    </div>

                    <div class="form-row mb-2" id="creditNo">
                    <label for="credit" class="col-form-label">安全碼:</label>
                      <ValidationProvider class="col-2" rules="required|numeric|digits:3" name="安全碼" v-slot="{ errors }">
                          <input type="text" class="form-control" v-model="order.credit.secureCode" :class="{'is-invalid':errors[0]}"
                          placeholder="999" maxlength="3">
                      </ValidationProvider>
                    </div>
                    <div class="form-row justify-content-center mt-4">
                      <div class="col-11">
                        <button type="button" name="button" :disabled="invalid" :class="{'discursor':invalid}"
                        class="btn btn-block btn-warning btn-lg rounded-0 text-dark py-3" @click.prevent="payOrder">
                          確認付款
                        </button>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
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
        user: {},
        credit: {
          n1: '',
          n2: '',
          n3: '',
          n4: '',
          Surname: '',
          name: '',
          month: '',
          year: '',
          secureCode: ''
        }
      }
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
    changeQty (item) {
      const vm = this
      vm.$store.dispatch('orderModules/updateOrder', item)
    },
    payOrder (e) {
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
.discursor{
  cursor: not-allowed;
}
</style>
