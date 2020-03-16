<template>
    <div id="app">
      <div id="nav">
        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-dark nav-bg p-0 fixed-top"  id="mainNav">
          <div class="container">
            <button class="navbar-toggler ml-3"  type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link class="navbar-brand logo-text p-0" to="/">Endless</router-link>
            <div class="collapse navbar-collapse" id="navbarContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2" to="/"><span class="underline">關於黑膠</span></router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2 " to="/productList"><span class="underline">唱盤列表</span></router-link>
                </li>
              </ul>
            </div>
            <div class="adminArea collapse navbar-collapse" id="navbarContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item py-1 pl-2">
                  <router-link class="text-endless" href="#" to="/cart"><i class="fas fa-shipping-fast">
                    <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
                  </i></router-link>
                </li>
                <li class="nav-item py-1 pl-2">
                  <router-link class="text-endless" href="#" to="/login"><i class="fas fa-user-cog"></i></router-link>
                </li>
              </ul>
            </div>
          </div>
          </nav>
        </div>
      </div>

      <Loading loader="bars" color="#C4A670" :active.sync="isLoading"></Loading>
      <router-view/>

      <footer class="bg-endless py-4">
        <div class="container">
          <div class="row no-gutters">
            <div class="col-md-4 text-center mb-2">
              <p class="badge badge-pill badge-warning px-3 py-2">此網站僅供教學使用，無其他商業用途</p>
            </div>
            <div class="col-md-4 mb-2">
              <div class="row d-flex justify-content-center">
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
                  <a class="text-endless"href="#">
                    <i class="fab fa-twitter fa-2x text-endless" aria-hidden="true"></i>
                  </a>
                </li>
              </div>
            </div>
            <div class="col-md-4 d-flex justify-content-center mb-2">
              <p class="text-word">Copyright © Jell's Website 2020</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters,mapActions } from 'vuex';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
  data(){
    return{

    };
  },
  methods:{
    ...mapActions('cartModules', ['getCart']),
    // getCart(payload){
    //   this.$store.dispatch('cartModules/getCart',payload)
    // }
  },
  computed:{
    ...mapGetters('cartModules',['isLoading']),
    ...mapGetters('cartModules', ['cart']),
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
  display: inline-block;
  text-decoration: none;
  font-family:'Brush Script MT',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  font-size: 40px;
  background: -webkit-linear-gradient(60deg,white,#1B72BF);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
#app .logo-text:hover{
  background: -webkit-linear-gradient(30deg,#1B72BF,white);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
  background-color: #594539;
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
  color:#F3F6E0;
  font-weight: bold;
}
footer .text-endless:hover{
  color:#BF8F65;
}

// .cartspace{
//   color:black;
//   text-align: center;
//   position: fixed;
//   padding:10px;
//   right:15px;
//   top:10px;
//   z-index:10px;
//   border:1px solid black;
//   border-radius: 50%;
// }
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
</style>
