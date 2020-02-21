<template>
  <div class="about container my-5">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-center">
          <img class="img-fluid" :src="productDetail.imageUrl" alt="">
        </div>
        <div class="col-md-6">
          <div class="row">
            <table class="table table-sm text-endless table-borderless">
              <thead>
                <tr>
                  <td width="120px">產品名稱：</td>
                  <td>{{productDetail.title}}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>單位：</td>
                  <td>{{productDetail.unit}}</td>
                </tr>
                <tr>
                  <td>價格：</td>
                  <td>{{productDetail.price}}</td>
                </tr>
                <tr>
                  <td>付款方式：</td>
                  <td>
                    <h4>
                      <span class="badge badge-success mx-2 p-2">信用卡</span>
                      <span class="badge badge-info mx-2 p-2">貨到付款</span>
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td>關於專輯：</td>
                  <td>
                    <p>{{productDetail.content}}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row no-gutters">
            <div class="col-md-6 d-flex align-items-end justify-content-end text-right">
              <div>
                <p class="text-warning font-weight-bolder" v-if="subtotal">小計：{{subtotal}}</p>
                <select class="custom-select border border-white bg-warning text-dark rounded"
                v-model="productDetail.num">
                  <option selected="selected" disabled>請選購數量</option>
                  <option v-for="num in 10" :value="num">
                    選購 {{num}} {{productDetail.unit}}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6 text-right">
              <div class="my-2">
                <del class="text-secondary font-weight-lighter mx-2"><span>原價：{{productDetail.origin_price}}</span></del>
                <span class="h4 text-warning font-weight-bolder">特價:{{productDetail.price}}</span>
              </div>
              <button class="btn btn-warning px-5" type="button" name="button" @click.prevent="addtoCart(productDetail.id, productDetail.num)">加入購物車</button>
            </div>
          </div>
        </div>
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
    ...mapGetters('productsModules',['productDetail']),
    subtotal(){
      const data = this.$store.state.productsModules.product.price * this.productDetail.num;
      return data;
    },
  },
  methods: {
    getproductDetail(id){
      this.$store.dispatch('productsModules/getproductDetail' , id);
    },
    addtoCart(id, qty){
      this.$store.dispatch('cartModules/addtoCart',{id , qty});
    },
    // ...mapActions('productsModules',['getproductDetail'], id),
   },
  created(){
    let productId = this.$route.params.productID
    this.getproductDetail(productId);
  },
}

</script>
<style scpoed>
.custom-select{
  width:260px;
  margin-left: 20px
}
</style>
