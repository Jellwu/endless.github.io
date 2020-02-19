<template>
  <div class="about container my-5">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-center">
          <img class="img-fluid" :src="productDetail.imageUrl" alt="">
        </div>
        <div class="col-md-6">
          <div class="row my-5">
            <table class="table my-5">
              <thead>
                <tr>
                  <td>產品名稱：</td>
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
                      <span class="badge badge-secondary mx-2 p-2">信用卡</span>
                      <span class="badge badge-secondary mx-2 p-2">貨到付款</span>
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row mt-5">
            <div class="col-md-6 mt-5 d-flex align-items-end">

                {{productDetail.num * 3}}
                <select class="custom-select border border-white bg-info text-white rounded"
                v-model="productDetail.num">
                  <option v-for="num in 10" :value="num" selected="selected">
                    {{num}} {{productDetail.unit}}
                  </option>
                </select>
              </option>
            </div>
            <div class="col-md-6 text-right mt-5 ">
              <div class="my-2">
                <del class="text-secondary font-weight-lighter mx-2"><span>原價：{{productDetail.origin_price}}</span></del>
                <span class="h4 text-info font-weight-bolder">特價:{{productDetail.price}}</span>
              </div>
              <button class="btn btn-info px-5" type="button" name="button">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
      <section class="text-center mt-5">
        <h4>產品特色</h4>
        <p>{{productDetail.content}}</p>
        <h4>機能說明</h4>
        <p>{{productDetail.description}}</p>
      </section>

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
  },
  methods: {
    getproductDetail(id){
      this.$store.dispatch('productsModules/getproductDetail' , id);
    }
    // ...mapActions('productsModules',['getproductDetail'], id),
   },
  created(){
    let productId = this.$store.state.productsModules.productId;
    this.getproductDetail(productId);
  },
}

</script>
<style scpoed>

</style>
