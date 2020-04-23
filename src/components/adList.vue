<template>
  <div class="bg-adList px-2 py-2 rounded">
    <h2 class="my-5 text-endless">
      <span v-if="carouselList.length !== 0">
        <i class="fas fa-store text-warning mr-3"></i>
        你可能也喜歡這
        <font class="text-warning">{{ carouselList.length }}</font> 件商品
      </span>
      <span v-else-if="carouselList.length === 0">
        <i class="fas fa-store text-warning mr-3"></i>
        <font class="text-warning">沒有推薦的商品</font>
        <div class="text-warning py-5 text-center">
          <router-link class="btn btn-outline-warning" to="/productList">
              <h3 class="p-2">來去逛逛<i class="fas fa-shipping-fast"></i></h3>
          </router-link>
        </div>
      </span>
    </h2>
    <div id="carouselList" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(num,index) in listNum"
        :key="index" :class="{active: num === 1}">
          <div class="row">
            <div class="card col-3"
              v-for="(item,index) in carouselList.slice((num - 1) * pageofList, pageofList * num)" :key="index"
              @click.prevent="getproduct(item.id)">
              <div class="card-body rounded" :style="`background-image:url(${ item.imageUrl })`">
                <h5 class="card-title">{{ item.title }}</h5>
              </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselList" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselList" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tempProduct: {},
      listNum: 0,
      pageofList: 4
    }
  },
  computed: {
    ...mapGetters('productsModules', ['productDetail', 'products']),
    carouselList () {
      const vm = this
      vm.tempProduct = vm.productDetail
      const carouselProduct = vm.products.filter((item) => {
        const data = item.category.includes(vm.tempProduct.category) &&
        item.id !== vm.productDetail.id
        return data
      })
      if (carouselProduct !== 0) {
        vm.listNum = Math.ceil(carouselProduct.length / vm.pageofList)
      }
      return carouselProduct
    }
  },
  methods: {
    getproduct (id) {
      const vm = this
      vm.$store.dispatch('productsModules/getproductId', id)
      vm.$router.push(`/productList/${id}`)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cart-Message{
  padding:20px;
  background-color: rgba(242, 183, 5, 0.5);
  border-radius: 10px;
  position: fixed;
  top:20%;
  right:5%;
  color:orange;
  transition: 0.5s;
  color:white;
  z-index: 100;
}
.cart-Message p{
  margin-top: 5px;
  font-size:20px;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all .5s ease;
}
.fade-slide-enter, .fade-slide-leave-to  {
  transform: translateX(100%);
  opacity: 0;
}
.bg-adList{
  background-color: rgba(0,0,0,0.1);
}
.bg-adList span{
  text-indent: 20px;
}
.carousel-item .card{
  background-color: rgba(0,0,0,0);
  border:0px;
}
.card-body{
  background-position:center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
}
.card-title{
  color:white;
}
.card:hover{
  cursor: pointer;
}

</style>
