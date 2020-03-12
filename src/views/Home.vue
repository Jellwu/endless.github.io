<template>
  <div>
    <div class="home-bg">
      <div class="home-text-box">
        <div>
          <p class="text-endless">不敗的，是經典</p>
        </div>
      </div>
    </div>
    <section id='sectionAbout'>
      <div class="pt-5">
        <div class="container">
          <div class="row no-gutters my-5">
            <div class="col-md-7 left-position" style="z-index: 10">
              <img src="https://images.unsplash.com/photo-1513746469853-a03fc9a0d6ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" class="img-fluid rounded" alt="">
            </div>
            <!-- <div class="col-md-12 rounded-left d-flex align-content-end"> -->
            <div class="col-md-5 vertical-content d-flex justify-content-end">
              <div class="leftArea pt-4 pb-1 py-md-7 ml-auto mr-md-0 text-endless">
                <div class="ml-4 textArea" style="letter-spacing:5px;">
                  <h2>黑膠——</h2>
                  <h2 style="text-indent:4rem">是一種生活態度</h2>
                </div>
                <p>
                  「流行總會被取代，經典會永久流傳」
                </p>
                <p>
                  黑膠唱盤獨特又溫暖的聲音，是數位音樂無法取代的；以新技術傳承經典，體現了無法取代的聲音。
                </p>
                <p>
                  享受這個過程：將唱片從盒子裡拿出來，放到唱盤上、擺上唱針，細細品味。
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <hr class="p-3 rightArea">
          </div>
        </div>
      </div>

      <div class="">
        <div class="container">
          <div class="row no-gutters my-5">
            <div class="col-md-5 vertical-content-l d-flex justify-content-start">
              <div class="leftArea pt-md-5 text-endless fadeInLeft">
                <div class="ml-4 textArea" style="letter-spacing:5px;">
                  <h2>堅持——</h2>
                  <h2 style="text-indent:4rem">專屬於你的聲音</h2>
                </div>
                <p>
                  「金窩銀窩，最愛的是自己的狗窩」
                </p>
                <p>
                  如此與眾不同的我們，從不妥協追求自己想要的，暫時脫離別人眼光中的自己，放首歌，好好做自己。
                </p>
                <p>
                  盡情做自己：製作屬於你的黑膠播放器，讓黑膠融入你的生活，陪伴你。
                </p>
              </div>
            </div>
            <div class="col-md-7 right-position">
              <img src="https://images.unsplash.com/photo-1522258079018-a20492fa3b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" class="img-fluid rounded" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section id="sectionLink" class="bg-section" >
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 mt-5">
            <div class="link-product">
              <div class="box-link p-5 d-flex align-items-center">
                <h2> <i class="fas fa-compact-disc fa-2x"></i> 收藏你的黑膠</h2>
                <a href="#"></a>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-5">
            <div class="link-coupon">
              <div class="box-link">
                <div>
                  <h2>膠友們，交個朋友吧！</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section id="sectionLink" class="bg-News">
      <div class="row d-flex justify-content-center bg-underText align-items-center p-3">
        <div class="col-md-6">
          <div class="h2 mb-3 text-endless">
            <i class="fas fa-compact-disc text-white fa-2x"></i>
            開啟你的膠旅！
          </div>
          <div class="text-Link mb-2 mt-1">輸入優惠代碼「<span class="text-warning">FRD2020</span>」即刻享有8折優惠！</div>
          <div class="text-Link mb-2 mt-1">更多特惠請關注最新消息，<span class="text-warning">記得按訂閱！</span></div>
          <div class="text-right">
            <router-link class="btn btn-outline-warning my-1 mr-3" to="/productList">逛黑膠</router-link>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <div class="h2 mb-3 text-endless">
              <i class="fas fa-paper-plane text-white fa-2x"></i>
            膠個朋友吧！
            </div>
            <form class="">
              <div class="form-group mb-2 mr-3">
                <label for="userMail" class="sr-only">Mail</label>
                <input type="email" class="form-control" id="userMail" placeholder="輸入你的Email，收到最新消息">
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-outline-warning my-1 mr-3">訂閱</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import $ from 'jquery';
import {
  mapGetters,
  mapActions
} from 'vuex';
// import Parallax from '../components/Parallax.vue';
export default {
  name: 'Home',
  computed:{
    ...mapGetters('productsModules', ['products']),
  },
  methods:{
    handleScroll(){
      if ($(window).scrollTop() > $('#sectionAbout').offset().top - 400) {
        $('.rightArea').addClass('fadeInRight');
        $('.leftArea').addClass('fadeInLeft');
      } else {
        $('.rightArea').removeClass('fadeInRight')
        $('.leftArea').removeClass('fadeInLeft');
      }
    },
    getProducts(pages = 1) {
      this.$store.dispatch('productsModules/getProducts',pages);
      // this.pages = this.$store.state.productsModules.pages;
      // console.log(this.pages);
    },
  },
  created(){
    this.getProducts();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // carousel autoplay do not stop on flag change
    $('.carousel').carousel('cycle');
    },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>
hr{
  border-top: 1px solid #EDE8CB;
  background-color:rgba(0,0,0,0);
  margin:10px;

}
  .fadeInRight {
    animation-duration: 2s;
    animation-fill-mode: both;
    -webkit-animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-name: fadeInRight;
    -webkit-animation-name: fadeInRight;
  }
  .fadeInLeft {
    animation-duration: 2s;
    animation-fill-mode: both;
    -webkit-animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-name: fadeInLeft;
    -webkit-animation-name: fadeInLeft;
  }
  .bg-section{
    background-color: rgba(89, 77, 67,0.8);

  }
  .textArea{
    height: 400px;

  }
  .left-position{
    left:0px;
    top:-20px;
    height: 95%;
  }
  .right-position{
    right:0px;
    top:20px;
    height: 100%;
  }
  .vertical-content{
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl ;
  }
  .vertical-content-l{
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr ;
  }
  .vertical-content p,  .vertical-content-l p{
    font-size: 18px;
    margin-left: 28px;
    padding: 22px 0px 0px 0px;
    line-height:35px;
    color:#F2E3D5;
    font-family:'Apple LiGothic Medium',Microsoft JhengHei;
  }
  .home-bg{
    background-image: url("https://images.unsplash.com/flagged/photo-1574134299924-c9f3d4196de2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height:500px;
  }
  .home-box{
    position: absolute;
    height:400px;
    right:0px;
    top:0px;
    z-index: 10;
  }
  .bg-style{
    position: relative;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height:400px;
  }
  .home-text-box{
    font-size: 60px;
    width:100%;
    height:600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
#sectionProduct{
  margin-bottom: 100px;
}
#sectionLink .box-link{
  background-color:rgba(255, 255, 255, 0.7);
}
#sectionLink .text-Link{
  color:#F2E3D5;
  font-weight: bold;
  font-size: 22px;
}
#sectionLink .bg-underText{
  background-color: rgba(0,0,0,0.5);
}
 .bg-News{
    // background-image: url("https://images.unsplash.com/photo-1558125986-abf7f3428420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1360&q=80");
    background-image: url('https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1601&q=80');
    background-size: cover;
    background-position: center bottom;
    background-attachment: fixed;
    margin: 0px;
    padding: 100px 200px ;
    border-radius: 5px;
}
</style>
