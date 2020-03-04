<template>
  <div class="about container my-5">
    <!-- <loading :active.sync="isLoading"></loading> -->
    <table class="table ml-auto mt-4 text-endless">
      <thead class="thead-dark">
        <tr>
          <th>訂單時間</th>
          <th>訂單編號</th>
          <th>訂購人</th>
          <th>產品資訊</th>
          <th>價格</th>
          <th>付款時間</th>
          <th>付款狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(items) in Orders" :key="items.id">
          <td>{{items.create_at | timeTranse}}</td>
          <td>{{items.id}}</td>
          <td>{{items.user.name}}</td>
          <td>
            <div v-for ="items in items.products" :key="items.id">
              {{items.product.title}} / {{items.product.num}} {{items.product.unit}}
            </div>
          </td>
          <td>{{ items.total| currency }}</td>
          <td v-if="items.is_paid">{{items.paid_date | timeTranse}}</td>
          <td v-else> -- </td>
          <td v-if="items.is_paid" class="text-success"> 完成付款</td>
          <td v-else class="text-danger">尚未付款</td>
          <!-- <td>
            <button class="btn text-warning
            " @click="openCouponModal(false, items)">
              <i class="fas fa-edit"></i>
            </button>
          </td> -->
          <!-- <td>
            <button class="btn text-danger" @click="opendropCoupon(items)">
              <i class="fas fa-trash"></i>
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';

export default{
  name: 'Order',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('orderModules',['Orders']),
  },
  methods: {
    getOrderList(page = 1){
      this.$store.dispatch('orderModules/getOrderList',page);
    }
  },
  created(){
    this.getOrderList();
  },
}

</script>
<style scpoed>

</style>
