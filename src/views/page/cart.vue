<template>
  <div class="about container my-5">
      <div class="row d-flex justify-content-center">
        <table class="table">
          <thead>
            <tr>
              <td valign="middle">產品名稱</td>
              <td valign="middle">產品縮圖</td>
              <td>購買數量</td>
              <td>產品單價</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in cart.carts" :key="items.id">
              <td style="height:150px" valign="middle">{{items.product.title}}</td>
              <td style="width:150px;"><img class="img-fluid" :src="items.product.imageUrl"></td>
              <td>{{items.qty}}</td>
              <td>{{items.product.price}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">
                  <p class="h5 text-right">結帳金額：{{cart.final_total}}</p>
              </td>
              <td>
                <button class="btn btn-info" type="button" name="button">結帳去</button>
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
  td{
    vertical-align:middle;
  }
</style>
