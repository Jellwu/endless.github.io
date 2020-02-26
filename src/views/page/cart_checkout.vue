<template>
<div class="about container my-5">
  <p class="text-white">it's cartCheckout {{Order.user.email}}
  </p>
  <button type="btn btn-warning" name="button">確認付款</button>

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
    }
  },
  created() {
    this.orderId = this.$route.params.orderID;
    this.getOrder();
    console.log(this.$store.state.orderModules.order.user);
  },
}
</script>
<style scpoed>

</style>
