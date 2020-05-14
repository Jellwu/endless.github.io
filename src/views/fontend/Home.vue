<template>
  <div>
    <div class="home-bg">
      <div class="home-text-box">
        <div class="home-text-absolute text-center ">
          <p class="text-endless-title">Endless</p>
          <p class="text-endless">不敗的，是經典</p>
        </div>
        <router-link class="nav-item nav-link mx-2" to="/productList">
          <div class="box-productLink">
            <div class="bg-productLink">
              New Arrival
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <section id='sectionAbout'>
      <div class="pt-5">
        <div class="container">
          <div class="row no-gutters my-5">
            <div class="col-md-7 left-position" style="z-index: 10">
              <img src="https://images.unsplash.com/photo-1513746469853-a03fc9a0d6ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" class="img-fluid rounded" alt="">
            </div>
            <div class="col-md-5 vertical-content d-flex justify-content-end">
              <div class="leftArea text-endless">
                <div class="ml-4 textArea" style="letter-spacing:5px;">
                  <h2>黑膠——</h2>
                  <h2 style="text-indent:4rem;margin-left:28px">是一種生活態度</h2>
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
    </div>

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <hr class="p-3 rightArea">
          </div>
        </div>
      </div>

      <div class="">
        <div class="container pb-5">
          <div class="row no-gutters my-5">
            <div class="col-md-5 vertical-content-l d-flex align-items-end">
              <div class="textArea-b pt-md-2 text-endless fadeInLeft mr-4">
                  <p>
                    盡情做自己：製作屬於你的黑膠播放器，讓黑膠融入你的生活，陪伴你。
                  </p>
                  <p>
                    如此與眾不同的我們，從不妥協追求自己想要的，暫時脫離別人眼光中的自己，放首歌，好好做自己。
                  </p>
                  <p>
                    「金窩銀窩，最愛的是自己的狗窩」
                  </p>
                <div class="ml-4" style="letter-spacing:5px;">
                  <h2 style="text-indent:4rem">專屬於你的聲音</h2>
                  <h2>堅持——</h2>
                </div>
              </div>
            </div>
            <div class="col-md-7 right-position">
              <img src="https://images.unsplash.com/photo-1522258079018-a20492fa3b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" class="img-fluid rounded" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="sectionLink">
      <div class="bg-News">
        <div class="row d-flex justify-content-around align-items-center">
          <div class="col-md-6 d-flex flex-column justify-content-center bg-underText bg-underText-red text-Link text-Link-left p-5">
            <div class="h2 mb-5 d-flex flex-column align-items-center">
              <i class="fas fa-ticket-alt fa-2x mb-2"></i>
              <span>入手優惠券</span>
            </div>
            <div class="">前往連結玩個小遊戲吧！<br>挑戰成功即刻享有8折優惠！</div>
            <div class="text-center mt-2">
              <router-link class="btn btn-outline-light mr-3" to="/couponpage">
                前往挑戰
              </router-link>
            </div>
          </div>
          <div class="col-md-6  d-flex flex-column justify-content-center bg-underText bg-underText-blue p-5">
            <div class="text-Link text-Link-right">
              <div class="h2 mb-5 d-flex flex-column align-items-center">
                <i class="fas fa-paper-plane fa-2x mb-2"></i>
                膠個朋友吧，訂閱我們！
              </div>
              <div class="mt-1">
                <p>訂閱我們給你更多特惠！</p>
              <form class="text-center mb-1">
                <div class="form-group mb-2 mr-3">
                  <label for="userMail" class="sr-only">Mail</label>
                  <input type="email" class="form-control text-center" id="userMail" placeholder="輸入你的Email，收到最新消息">
                </div>
              </form>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-outline-dark my-1 mr-3">訂閱</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters('productsModules', ['products'])
  },
  methods: {
    handleScroll () {
      if ($(window).scrollTop() > $('#sectionAbout').offset().top - 600) {
        $('.textArea').addClass('fadeInRight')
        $('.textArea-b').addClass('fadeInLeft')
      } else {
        $('.textArea').removeClass('fadeInRight')
        $('.textArea-b').removeClass('fadeInLeft')
      }
    },
    getProducts (pages = 1) {
      this.$store.dispatch('productsModules/getProducts', pages)
    }
  },
  created () {
    this.getProducts()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
</style>
