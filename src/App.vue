<template>
    <div id="app">
      <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-dark nav-bg p-0 fixed-top"  id="mainNav">
          <div class="container">
            <router-link class="navbar-brand logo-text" to="/">Endless</router-link>
            <div class="collapse navbar-collapse " id="navbarResponsive">
              <ul class="navbar-nav text-uppercase ml-auto">
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2" to="/"><span class="underline">關於黑膠</span></router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2 " to="/productList"><span class="underline">唱盤列表</span></router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2" to="/customList"><span class="underline">機台資訊</span></router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-item nav-link mx-2" to="/blog"><span class="underline">黑膠歷程</span></router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="height-box"></div>
      <!-- <div class="d-flex justify-content-center banner-bg">
      <img src="../image/banner.jpg" class="img-fluid p-1" alt="">
      </div>
      <div class="bg-endless">
        <div id="nav">
          <div class="row justify-content-center pb-1 mt-3">
            <div class="col-md-12 d-flex justify-content-center">
              <nav class="navbar navbar-expand-lg navbar-light">
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div class="navbar-nav">
                    <router-link class="nav-item nav-link mx-2" to="/">關於我們</span></router-link>
                    <router-link class="nav-item nav-link mx-2" to="/productList"><span class="underline ">冒險行頭</span></router-link>
                    <router-link class="nav-item nav-link mx-2" to="/customList"><span class="underline">客製行程</span></router-link>
                    <router-link class="nav-item nav-link mx-2" to="/blog"><span class="underline">記憶行旅</span></router-link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div> -->
      <Loading :active.sync="isLoading"></Loading>
      <router-view/>
      <footer class="bg-endless py-4">
        <div class="container">
          <div class="row no-gutters">
            <div class="col-md-4">
              <p class="badge badge-pill badge-warning p-2">此網站僅供教學使用，無其他商業用途</p>
            </div>
            <div class="col-md-4 ">
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
                  <a class="text-endless" href="#">
                    <i class="fab fa-twitter fa-2x text-endless" aria-hidden="true"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <router-link class="text-endless" href="#" to="/login">
                    <i class="fas fa-cog fa-2x text-endless" aria-hidden="true"></i>
                  </router-link>
                </li>
              </div>
            </div>
            <div class="col-md-4 d-flex justify-content-end">
              <p class="text-word">Copyright © Jell's Website 2020</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
  data(){
    return{

    };
  },
  computed:{
    ...mapGetters('cartModules',['isLoading'],{root:true}),
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
  font-family:'Kaushan Script',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  font-size: 30px;
  padding: 5px 15px;
  background: -webkit-linear-gradient(45deg,#F3E1AA,#66698D);
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
