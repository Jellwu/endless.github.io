<template>
<div class="container">
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
            {{ productDetail.title }}
          </h2>
          <p class="mb-2" style="text-indent : 2em;">{{ productDetail.content }}</p>
          <p style="text-indent : 2em;">{{ productDetail.description }}</p>
          <div class="text-right">
            <del class="font-weight-lighter"><span class="my-2">原價：{{ productDetail.origin_price | currency }}</span></del><br>
            <span class="h4 text-warning font-weight-bolder">特價:{{ productDetail.price | currency }}</span>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <router-link to="/productList" class="btn btn-outline-warning" type="button" name="button">回產品頁</router-link>
        </div>
      </div>
  </div>
      <div class="px-5 my-4"></div>
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
                  <div class="input-group" style="width:100%">
                    <select class="custom-select border border-warning text-dark form-control"
                    id="inputGroupSelect04" v-model="productNum">
                      <option :value="0" selected disabled>--請選購數量--</option>
                      <option :value="Num" v-for="Num in 10" :key='Num'>
                        選購 {{ Num }} {{ productDetail.unit }}
                      </option>
                    </select>
                    <div class="input-group-append text-right">
                      <button class="btn btn-outline-warning" type="button"
                      :disabled = "productNum === 0" :class= "{ 'discursor': productNum === 0 }"
                      @click.prevent = 'addtoCart(productDetail.id, productNum)'>
                        購物車 <i class="fas fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div class="text-warning font-weight-bolder ml-4 mb-1" v-if="subtotal">
                    小計：{{ subtotal | currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <adList></adList>
</div>

</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import cartMessage from '@/components/CartMessage.vue'
import adList from '@/components/AdList.vue'

export default {
  name: 'Product',
  data () {
    return {
      productNum: 0
    }
  },
  computed: {
    ...mapGetters('productsModules', ['productDetail']),
    ...mapGetters('cartModules', ['cart']),
    subtotal () {
      const data = this.productDetail.price * this.productNum
      return data
    }
  },
  methods: {
    handleScroll () {
      if ($(window).scrollTop() > $('.box').offset().top + 150) {
        $('.nav-bg').addClass('nav-bg-visible')
      } else {
        $('.nav-bg').removeClass('nav-bg-visible')
      }
    },
    getProducts (pages = 1) {
      this.$store.dispatch('productsModules/getProducts', pages)
    },
    getproductDetail (id) {
      this.$store.dispatch('productsModules/getproductDetail', id)
    },
    getproductId (id) {
      this.$store.dispatch('productsModules/getproductId', id)
    },
    addtoCart (id, qty = 1) {
      // 判斷購物車是否有重複的資料:有的話重新給一個新的數量，無則直接新增一筆到購物車
      const vm = this
      const duplicatdItem = vm.cart.carts.filter(items => items.product_id === id)
      if (duplicatdItem.length > 0) {
        const sameItem = duplicatdItem[0]
        const originCartId = sameItem.id
        const originProductId = sameItem.product.id
        const newQty = parseInt(sameItem.qty) + parseInt(qty)
        vm.$store.dispatch('cartModules/updateCartQty', { originCartId, originProductId, newQty })
      } else {
        vm.$store.dispatch('cartModules/addtoCart', {
          id,
          qty
        })
      }
    }
  },
  // 監控route的變化：當路徑有改變的時候，重新去渲染網頁的內容
  watch: {
    $route (to, from) {
      this.getproductDetail(to.params.productID)
    }
  },
  components: {
    cartMessage,
    adList
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
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
  height: 200px;
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
