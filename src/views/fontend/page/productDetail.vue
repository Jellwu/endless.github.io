<template>
<div class="about container my-5">
  <cartMessage></cartMessage>
  <div class="box"></div>
  <div class="row">
    <div class="col-md-6 d-flex justify-content-center">
      <img class="img-fluid rounded" :src="productDetail.imageUrl" alt="">
    </div>
      <div class="col-md-6 d-flex flex-column justify-content-around">
        <div class="text-endless">
          <h2 class="my-3">
            <span><i class="fas fa-crown text-warning"></i></span>
            {{productDetail.title}}
          </h2>
          <p class="mb-2" style="text-indent : 2em;">{{productDetail.content}}</p>
          <p style="text-indent : 2em;">{{productDetail.description}}</p>
          <div class="text-right">
            <del class="font-weight-lighter"><span class="my-2">原價：{{productDetail.origin_price | currency}}</span></del><br>
            <span class="h4 text-warning font-weight-bolder">特價:{{productDetail.price | currency}}</span>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <router-link to="/productList" class="btn btn-outline-warning" type="button" name="button">回產品頁</router-link>
        </div>
      </div>
  </div>
      <hr class="px-5">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="bg-box-endless rounded py-4 px-2">
            <div class="text-endless mb-3">
              <div class="text-center h4 mb-3"> 加入購物車
                  <i class="fas fa-sort-down"></i>
              </div>
              <ul class="pl-2 text-center">
                <li class="mb-1">
                  <span class="badge badge-pill badge-info mr-1">線上刷卡</span>
                  <span class="badge badge-pill badge-success mr-1">貨到付款</span>
                  <span class="badge badge-pill badge-light">轉帳付費</span>
                </li>
                <li>
                  <span class="badge badge-pill badge-success mr-1">超商取貨</span>
                  <span class="badge badge-pill badge-info">黑貓宅配</span>
                </li>
              </ul>
            </div>
            <div class="row no-gutters d-flex align-items-center justify-content-center">
              <div class="col-md-6">
                <div>
                  <div class="text-warning font-weight-bolder ml-4 mb-1" v-if="subtotal">
                    小計：{{subtotal |currency}}
                  </div>
                  <div class="input-group">
                    <select class="custom-select border border-warning text-dark"
                    id="inputGroupSelect04" v-model="productNum">
                      <option :value="0" selected disabled>--請選購數量--</option>
                      <option :value="num" v-for="num in 10" :key='num'>
                        選購 {{num}} {{productDetail.unit}}
                      </option>
                    </select>
                    <div class="input-group-append text-right">
                      <button class="btn btn-outline-warning" type="button" @click.prevent = 'addtoCart(productDetail.id,productNum)'>
                        購物車 <i class="fas fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="px-5">
      <adList></adList>
</div>

</template>

<script>
// import mapGetter與mapActions的方法
import { mapGetters } from 'vuex'
import cartMessage from '@/components/CartMessage.vue'
import adList from '@/components/adList.vue'

export default {
  name: 'Product',
  data () {
    return {
      productNum: 0
    }
  },
  computed: {
    ...mapGetters('productsModules', ['productDetail']),
    subtotal () {
      const data = this.$store.state.productsModules.product.price * this.productNum
      return data
    }
  },
  methods: {
    getProducts (pages = 1) {
      this.$store.dispatch('productsModules/getProducts', pages)
    },
    getproductDetail (id) {
      this.$store.dispatch('productsModules/getproductDetail', id)
    },
    getproductId (id) {
      // 帶入此產品的id給action抓api的資料
      this.$store.dispatch('productsModules/getproductId', id)
    },
    addtoCart (id, qty) {
      this.$store.dispatch('cartModules/addtoCart', {
        id,
        qty
      })
    }
  },
  components: {
    cartMessage,
    adList
  },
  created () {
    this.getProducts()
    const productId = this.$route.params.productID
    this.getproductDetail(productId)
  }
}
</script>
<style scpoed>
.box{
  height: 100px;
  width: 100%;
}
.card-title{
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  max-width: 200px;
}
.card-title:hover{
  background-color: rgba(0,0,0,0.6);
  border-radius: 10px;
}
.custom-select {
  width: 260px;
  margin-left: 20px
}
.bg-box-endless{
  width:100%;
  background-color: rgba(0, 0, 0,0.1);
}
.box-advice .card{
  max-height:300px;
}
</style>
