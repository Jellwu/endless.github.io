<template>
    <div id="app">
      <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-dark nav-bg p-0 fixed-top">
          <div class="container-md p-0" style="max-width:1200px">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <router-link class="logo-text mr-5" to="/">Endless</router-link>
            <ul class="navbar-nav order-md-1">
              <li class="nav-item py-1 pl-4" style="display:inline-block">
                <div class="btn-group dropleft">
                  <button type="button" class="btn m-0 p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-heart" aria-haspopup="true" aria-expanded="false">
                      <span class="badge badge-pill badge-danger">{{favorite.length}}</span>
                    </i>
                  </button>
                    <div class="dropdown-menu bg-dark">
                        <h6 class="text-center m-0 py-2 text-warning">我的最愛清單</h6>
                      <hr class="my-2">
                      <div class="row justify-content-center my-1" v-for="items in favorite" :key="items.id" style="width:400px;">
                        <div class="col-1" @click.prevent="dropfavorite(items.id)">
                          <i class="fas fa-eraser" style="font-size:16px"></i>
                        </div>
                        <div class="col-9 text-warning text-left">
                          <span class="bg-box-pop" style="display:block" @click.prevent="getproductId(items.id)">
                            {{items.title}}
                          </span>
                        </div>
                      </div>
                      <div class="row" style="width:400px;">
                        <div class="col-12 text-warning text-center" v-if="favorite.length === 0">
                          <p>目前沒有追蹤的清單，快追起來吧！</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </li>
              <li class="nav-item py-1" style="display:inline">
                <router-link class="text-endless" href="#" to="/cart">
                  <i class="fas fa-shipping-fast">
                    <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
                  </i>
                </router-link>
              </li>
              <li class="nav-item py-1 pl-2" style="display:inline">
                <router-link class="text-endless" href="#" to="/login"><i class="fas fa-user-cog"></i></router-link>
              </li>
            </ul>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2" to="/">
                    <span class="underline">關於黑膠</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2 " to="/productList">
                    <span class="underline">唱盤列表</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2 " to="/couponpage">
                    <span class="underline">我要酷碰</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
      <router-view/>
      <footer class="bg-footer">
        <div class="container-md" style="max-width: 1210px;">
          <div class="row no-gutters py-1">
            <div class="col-md-10  d-flex justify-content-center align-items-end">
              <div>
                <p class="text-word">Copyright © Jell's Website 2020</p>
                <p class="badge badge-pill badge-warning px-3 py-2">此網站僅供教學使用，無其他商業用途</p>
              </div>
            </div>
            <div class="col-md-2 d-flex align-items-center content-center">
              <div>
                <li class="list-inline-item">
                  <a class="text-endless" href="#">
                    <i class="fab fa-instagram fa-2x text-endless" aria-hidden="true"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="text-endless" href="#">
                    <i class="fab fa-facebook fa-2x text-endless" aria-hidden="true"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <router-link to="/profile">
                    <i class="far fa-address-card fa-2x text-endless"></i>
                  </router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters,mapActions } from 'vuex';
// 抓localstorage資料用
import {mapMutations} from 'vuex';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
  data(){
    return{

    };
  },
  methods:{
    ...mapActions('cartModules', ['getCart']),
    // ...mapActions('productsModules', ['favorite']),
    dropfavorite(id){
      this.$store.dispatch('productsModules/dropfavorite',id);
    },
    // this.SETIMGINFO(this.favorite);
    getproductId(id) {
      // 帶入此產品的id給action抓api的資料
      this.$store.dispatch('productsModules/getproductId', id);
    },
  },
  computed:{
    ...mapGetters('cartModules',['isLoading']),
    ...mapGetters('cartModules', ['cart']),
    ...mapGetters('productsModules', ['favorite']),
  },
  created(){
    this.getCart();
  }
}

</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "./assets/all";
@import "~@nextindex/next-scss/next-scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:#262626;
}

#app .logo-text{
  text-decoration: none;
  font-family:'Brush Script MT',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  font-size: 38px;
  font-weight: bold;
  background: -webkit-linear-gradient(-30deg,#321c13,#cbb484);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding:0px;
  margin:0px;
}
#app .logo-text:hover{
  background: -webkit-linear-gradient(45deg,#482c1d,#321c13);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
#app .navbar-size{
  width: 100%;
  position: relative;
  max-width: 1180px;
  margin: auto;
}

#nav {
.router-link-exact-active {
      color: #F2CA52;
      font-weight: bold;
}
  .underline:hover{
    border-bottom: 2px solid #F2CA52;
    color:#F2CA52;
    font-weight: bold;
    transition: all 0.2s;
    }
.badge{
  font-size:9px;
  margin-right:10px;
}
.fas{
  font-size: 24px;
}
i{
  color:rgba(255, 255, 255, 0.5);
}
i:hover{
  color:#F2CA52;
}

}
.height-box{
  height:55px;
}
.navbar-dark{
  font-weight: bold;
}
.bg-endless{
  background-color:#594539;
}
.banner-bg{
  background-image: url('https://images.unsplash.com/photo-1543433983-d79d332dd7a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-position: bottom;
  background-size: contain;
}
.bg-box{
  background-color: #4679A6;
  box-shadow: 3px 3px 5px #9FA6B6;
  color:#F3F6E0;
}
.nav-bg{
  width:100%;
  background-color: rgba(0,0,0,0);
  background-image: url('assets/images/bg-nav.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-footer{
  background-image: url('assets/images/bg-footer.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.text-endless{
  color:#F3F6E0;
  font-weight: bold;
}
.list-inline-item{
  margin: 0px 10px;
}
.card-img-bg {
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
footer .text-word{
  color:#F3F6E0;
  font-weight: bold;
}
footer .text-endless{
  color:#321c13;
  font-weight: bold;
}
footer .text-endless:hover{
  color:#BF8F65;
}
footer .content-center{
  display: flex;
  justify-content: flex-end;
}
.bg-box-pop:hover{
  background-color: rgba(0,0,0,0.3);
  box-shadow: 0px 0px 5px black;
}

h1,h2,h3,h4,h5,h6{
  padding:0px;
  margin:0px;
}
.h1,.h2,.h3,.h4,.h5,.h6{
  padding:0px;
  margin:0px;
}
p{
  padding:0px;
  margin:0px;
}
ul,li{
  list-style: none;
}

@media (min-width: 768px){
.order-md-1 {
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;
}
}
@media (max-width: 768px){
footer .content-center{
  justify-content: center;
  padding:10px 0px 0px 0px;
}
footer .text-endless{
    color:#F3F6E0;
}
}
</style>
