<template>
  <div class="about container my-5">
      <div class="row d-flex justify-content-center">
        <table class="table table-sm text-endless" style="width:60%">
          <thead>
            <tr>
              <td valign="middle">項目</td>
              <td valign="middle">產品名稱</td>
              <td>購買數量</td>
              <td>產品單價</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in cart.carts" :key="items.id">
              <td style="width:80px;"><img class="img-fluid" :src="items.product.imageUrl"></td>
              <td style="vertical-align: middle;">{{items.product.title}}</td>
              <td style="width:80px; vertical-align: middle;">{{items.qty}}</td>
              <td style="width:100px; vertical-align: middle;">{{items.product.price}}</td>
            </tr>
          </tbody>
          <tfoot class="pt-2">
            <tr>
              <td colspan="3" style="vertical-align: middle;">
                  <p class="h5 text-right pt-2">結帳金額：{{cart.final_total}}</p>
              </td>
              <td class="text-right">
                <button class="btn btn-outline-warning" type="button" name="button">結帳去</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
</template>

<script>
//import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex';

export default{
  name: 'Product',
  data() {
    return {

    };
  },
  computed: {
    // 抓productsModules中的state.product
    ...mapGetters('cartModules',['cart']),
  },
  methods: {
    ...mapActions('cartModules',['getCart']),
  },
  created(){
    this.getCart();
  },
}

</script>
<style scpoed>

</style>
