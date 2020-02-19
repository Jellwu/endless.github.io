<template>
    <div id="app" class="bg-endless">
      <!-- <div class="">
          <div class="nav-bg fixed-top">
            <div class="container">
              <div class="row">
                <div class="col-md-9">
                    <a class="navbar-brand" href="#">
                      endless
                    </a>
                </div>
                <div class="col-md-3 d-flex justify-content-end">
                  <button class="btn btn-outline-info border-0 mx-1" type="button" name="button">
                    <i class="fas fa-cogs" style="font-size:20px"></i>
                  </button>
                  <button class="btn btn-outline-info border-0 mx-1" type="button" name="button">
                    <i class="fas fa-shopping-cart" style="font-size:20px">
                      <span class="badge badge-light">{{cart.carts.length}}</span>
                    </i>

                  </button>
                </div>
              </div>

            </div>
            </div>
      </div> -->
      <div class="d-flex justify-content-center banner-bg">
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
      </div>
      <Loading :active.sync="isLoading"></Loading>
      <router-view/>
      <footer class="bg-endless text-muted py-5">
        <div class="container">
            <div class="row">
              <div class="col-md-6 justify-content-center d-flex">
                <div class="row">
                <div class="col-md-12 text-center text-endless">
                    <h5>Contact US</h5>
                </div>
                <div class="col-md-12 text-center">
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-instagram fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-facebook fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-twitter fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-github-square fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                </div>
              </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                <div class="col-md-12 text-center text-endless">
                    <h5 style="font-weight:bold;">Contact US</h5>
                </div>
                <div class="col-md-12 text-center">
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-instagram fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-facebook fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-twitter fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a class="text-info" href="#">
                      <i class="fab fa-github-square fa-2x text-endless" aria-hidden="true"></i>
                    </a>
                  </li>
                </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <p class="badge badge-pill badge-info p-2">此網站僅供教學使用，無其他商業用途</p>
              <p class="mb-0">Copright 2020 © JELL</p>
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
@import "~@nextindex/next-scss/next-scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5A83A5;
}

#app .logo-text{
  display: inline-block;
  text-decoration: none;
  font-family:cursive;
  font-size: 30px;
  padding: 5px 15px;
  background: -webkit-linear-gradient(45deg,#433022,#FEAC1A);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #5A83A5;
    }
  }
  .underline:hover{
    border-bottom: 2px solid #2E4959;
    }
}
.bg-endless{
  background-color:#C5D1D9;
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
  background-color: rgba(26, 67, 89,0.8)
}
.text-endless{
  color:#5A83A5;
  font-weight: bold;
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
  color:#153E5A;
  font-weight: bold;
}
ul,li{
  list-style: none;
}
</style>
