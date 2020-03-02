<template>
<div class="about container my-5 ">
    <!-- {{Order.products.product.title}} -->
    <div class="text-center">
      <h3 class="text-warning my-4">訂單資訊</h3>
    </div>
    <div class="row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table text-endless">
            <thead class="thead-dark">
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in Order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" calss="text-right">總計：</td>
                <td class="text-right">{{ Order.total | currency }}</td>
              </tr>
            </tfoot>
        </table>
        <div class="text-center">
          <h3 class="text-warning my-4">訂貨資料確認</h3>
        </div>
        <table class="table text-endless">
          <thead class="thead-dark">
            <th colspan="2">訂購資料</th>
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
          <button class="btn btn-warning">確認付款去</button>
        </div>
      </form>
    </div>

</div>
</template>

<script>
//import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Product',
  data() {
    return {
      orderId:'',
      order:{
        user:{},
      },
    };
  },
  computed: {
    ...mapGetters('orderModules',['Order']),
  },
  methods: {
    getOrder(){
      let id = this.orderId;
      this.$store.dispatch('orderModules/getOrder',id);
    },
    payOrder(){
      let id = this.orderId
      this.$store.dispatch('orderModules/payOrder',id);
    }
  },
  created() {
    this.orderId = this.$route.params.orderID;
    this.getOrder();
    // console.log(this.$store.state.orderModules.order.user);
  },
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
</style>
