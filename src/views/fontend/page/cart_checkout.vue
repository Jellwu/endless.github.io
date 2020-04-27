<template>
<div class="about my-5">
  <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
      <div class="customform-banner d-flex align-items-center justify-content-center mb-5">
        <div>
          <h1 class="text-endless">訂單資料確認</h1>
        </div>
      </div>
      <div class="row justify-content-center" v-if="Order.is_paid === false">
        <form class="col-md-6" @submit.prevent="payOrder">
          <table class="table text-endless my-5">
            <thead class="thead-dark">
              <th colspan="3">訂貨資料</th>
            </thead>
              <tbody>
                <tr>
                  <th>產品名稱</th>
                  <th>數量</th>
                  <th class='text-right'>價格</th>
                </tr>
                <tr v-for="item in Order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total  | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-warning">
                  <td colspan="2" calss="text-right">總計：</td>
                  <td class="text-right">{{ Order.total | currency }}</td>
                </tr>
              </tfoot>
          </table>

          <table class="table text-endless">
            <thead class="thead-dark">
              <th colspan="2">客戶資料</th>
            </thead>
            <tbody class="customform">
              <tr>
                <th width="200">Email</th>
                <td>{{ Order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ Order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ Order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ Order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!Order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center" v-if="Order.is_paid === false">
            <button type="submit" class="btn btn-warning">確認付款去</button>
          </div>
        </form>
      </div>
      <div v-else-if="Order.is_paid === true">
        <div class="paid-msgBox d-flex flex-column justify-content-center align-items-around">
          <div class="text-center">
            <h2 class="text-endless mb-1">此筆訂單已完成付款</h2>
            <h3 class="text-warning mb-1">訂單編號為：{{ orderId }}</h3>
            <h3 class="text-endless mb-5">歡迎聯絡我們詢問出貨進度</h3>
            <div class="text-center">
          </div>
            <router-link class="btn btn-outline-warning" to="/productList">
              <span class="underline">
                來去逛逛 <i class="fas fa-shipping-fast"></i>
              </span>
            </router-link>
          </div>
        </div>
      </div>
</div>
</template>

<script>
// import mapGetter與mapActions的方法
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
