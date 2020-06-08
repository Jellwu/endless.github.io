<template>
  <div>
    <Carouse></Carouse>
    <section id = "intro" class="d-flex flex-column justify-content-center">
      <a href="#goProdcuts">
        <div class="scrollDown d-flex flex-column align-items-center">
          <span class="h5">
            Scroll
          </span>
          <i class="fas fa-angle-double-down"></i>
        </div>
      </a>
      <div id="goProdcuts" class="text-endless text-center">
        <div class="h3">
          <p class="font-weight-bold" style="font-family:Arial Black;font-size:40px;">
            Endless
          </p>
          <span>經典是無可取代的</span>
        </div>
        <p class="h4 mt-3">有溫度的聲音，是我們追求的品質</p>
        <router-link href="#" to="/productList">
          <button class="btn btn-outline-light" type="button" name="button">
            <i class="fas fa-compact-disc mr-2"></i>瀏覽產品
          </button>
        </router-link>
      </div>
    </section>
    <section id="active">
      <div class="row bg-active">
          <div class="col-md-6 active-info d-flex flex-column justify-content-between pl-md-5">
            <p class="h2 font-weight-bold text-dark pb-2"><i class="fas fa-headphones-alt"></i>
              Pop-up shop of Vinyl Record
            </p>
            <p class="h5 text-endless mb-3">2020年第三季快閃店出爐囉！一同來感受黑膠的溫暖吧！</p>
            <div class="popShop">
              <p class="font-weight-bold">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span class="text-dark">台北 華山藝術特區A5</span>
              </p>
              <p>
                <i class="far fa-clock"></i> 2020/06/15 ~ 2020/08/15
              </p>
            </div>

            <div class="popShop">
              <p class="font-weight-bold">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span class="text-dark">台南 南紡購物中心</span>
              </p>
              <p>
                <i class="far fa-clock"></i> 2020/06/15 ~ 2020/08/15
              </p>
            </div>

            <div class="popShop">
              <p class="font-weight-bold">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span class="text-dark">高雄 三多遠東百貨B1</span>
              </p>
              <p>
                <i class="far fa-clock"></i> 2020/06/15 ~ 2020/12/15
              </p>
            </div>

            <div class="popShop font-weight-bold">
              <i class="fas fa-exclamation-circle mr-1"></i>
              <span class="text-dark">來店參觀即可索取優惠折扣碼，別錯過我們這次的快閃活動囉！</span>
            </div>
          </div>
      </div>
    </section>
    <div class="spacing"></div>

    <section id="collection">
      <p class="h2 text-endless text-center">
        <span class="border-collection">
          PRODUCTS
        </span>
      </p>

      <div class="container mt-5">
        <div class="row d-flex justify-content-around mt-5">
          <div class="col-xl-4 col-md-3 d-flex flex-column align-items-center flow-hidden">
            <div class="h3 text-center text-light mb-5">
              <i class="fas fa-headphones mr-3"></i>
              <span class="text-endless text-endless-spacing">聽嘻哈</span>
            </div>
            <div class="bg-collection hvr-hang" @click.prevent = "goPage('Hip Hop')">
              <div class="bg-hiphop hvr-hang-content">
                <div class="go-icon" v-if="screenWidth < 767">
                  點擊看更多 <i class="fas fa-shipping-fast mr-1"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-3 d-flex flex-column align-items-center flow-hidden">
            <div class="h3 text-center text-light mb-5">
              <i class="fas fa-headphones mr-3"></i>
              <span class="text-endless text-endless-spacing">聽搖滾</span>
            </div>
            <div class="bg-collection hvr-hang" @click.prevent = "goPage('Independent')">
              <div class="bg-rock hvr-hang-content">
                <div class="go-icon" v-if="screenWidth < 767">
                  點擊看更多 <i class="fas fa-shipping-fast mr-1"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-3 d-flex flex-column align-items-center flow-hidden">
            <div class="h3 text-center text-light mb-5">
              <i class="fas fa-headphones mr-3"></i>
              <span class="text-endless text-endless-spacing">聽浪漫</span>
            </div>
            <div class="bg-collection hvr-hang" @click.prevent = "goPage('Popular')">
              <div class="bg-popular hvr-hang-content">
                <div class="go-icon" v-if="screenWidth < 767">
                  點擊看更多 <i class="fas fa-shipping-fast mr-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="spacing"></div>

    <section id="feature">
      <p class="h2 text-endless text-center mb-5">
        <span class="border-collection">
          FEATURE
        </span>
      </p>
    <div class="container">
      <a data-toggle="collapse" href="#multiCollapseFeature" role="button" aria-expanded="false" aria-controls="multiCollapseFeature">
        <div class="row bg-feature d-flex justify-content-around py-3 hvr-float-shadow">
          <div class="col-md-9 order-md-2">
            <div class="git-speaker"></div>
          </div>
          <div class="col-md-3 d-flex align-items-center mt-md-5 order-md-1">
            <div class="d-flex flex-column w-100 justify-content-around justify-contetnt-end" style="height:75%;">
              <p class="text-title">
                <i class="fas fa-compact-disc"></i>
                黑膠癮
              </p>
              <div class="text-endless text-center h4 text-endless-spacing pl-md-4">
                <p class="endless-text-indent">
                  黑膠獨特的魅力<br>
                  不禁讓人想一探究竟
                </p>
                <p class="endless-text-indent">
                  數位與經典結合<br>
                  創造充滿質感的聲音</p>
              </div>
            </div>
          </div>
        </div>
      </a>
      <div class="mt-2">
          <div class="collapse multi-collapse collapse-content bg-collapse py-2 show" id="multiCollapseFeature">
              <div class="row p-md-4 m-md-3 d-flex justify-content-around align-items-center bg-underText-yellow hvr-grow-shadow">
                <img class="col-md-4 img-fluid" src="https://images.unsplash.com/photo-1584679109597-c656b19974c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80" alt="">
                <div class="col-md-8 text-endless">
                  <p class="h2 text-center">黑膠是什麼</p>
                  <span class="mt-2">
                    從黑膠的製程開始講起，黑膠唱片是用刻片機刻在空白的唱片上面製成母片，刻完之後的母片再經過電鍍、翻模變成母板（分成上下兩片），再注入聚氯乙烯壓制夾成黑膠唱片。
                    因為母片需要一邊播放盤帶一邊刻片，磁帶播放久了音質也會越差，刻出來的唱片音質也就不會如初回那樣好，而母板用久了也會逐漸損毀，也就是為什麼原廠的初版唱片總是被爭相收藏的原因了。
                  </span>
                </div>
              </div>
              <div class="row p-md-4 m-md-3 d-flex justify-content-around align-items-center bg-underText-black hvr-grow-shadow">
                <img class="col-md-4 img-fluid order-md-2" src="https://images.unsplash.com/photo-1584696401562-f9dbc7ff939f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80" alt="">
                <div class="col-md-8 text-endless order-md-1">
                  <p class="h2 text-center">獨特的將經典重現</p>
                  <span class="d-flex pr-2 text-icon justify-content-center">
                    <i class="fas fa-compact-disc"></i>
                    <i class="fas fa-plus"></i>
                    <i class="fas fa-chalkboard"></i>
                    <i class="fas fa-equals"></i>
                    <i class="fab fa-napster"></i>
                  </span>
                  <span class="text-endless">
                    利用了現今的數位科技與黑膠結合，呈現了輕巧又獨特的黑膠唱盤機，將黑膠音質與數位介面結合；我們擁有製作黑膠的獨特技術，
                    目前已將兩萬多張 78 轉速百年老黑膠唱片重置並實體化，不僅能用黑膠播放，更能將這些音樂以數位化的方式存放。
                  </span>
                </div>
              </div>
              <div class="row p-md-4 m-md-3 d-flex justify-content-around align-items-center bg-underText-yellow hvr-grow-shadow">
                <img class="col-md-4 img-fluid" src="https://images.unsplash.com/photo-1535953472862-9cc610a70f8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80" alt="">
                <div class="col-md-8 text-endless">
                  <p class="h2 text-center">我對黑膠唱盤機有興趣</p>
                  <span class="d-flex pr-2 text-icon justify-content-center">
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-plus"></i>
                    <i class="fas fa-envelope-open-text"></i>
                    <i class="fas fa-equals"></i>
                    <i class="fab fa-replyd"></i>
                  </span>
                  <span class="text-endless">
                    在下方留下你的 Mail，我們將會有專人聯絡，與您討論獨特的黑膠唱盤機
                  </span>
                  <div class="input-group mt-3 mr-auto ml-auto">
                    <input type="text" class="form-control" placeholder="輸入Mail">
                    <div class="input-group-append">
                      <button class="btn btn-outline-dark" type="button" id="button-addon2">
                        送出
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>

    </section>

    <div class="spacing"></div>
    <section id="sectionLink">
      <div class="bg-News">
        <div class="row d-flex justify-content-around align-items-center no-gutters">
          <div class="col-md-6 d-flex flex-column justify-content-center bg-underText bg-underText-black text-Link text-Link-left p-5">
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
          <div class="col-md-6  d-flex flex-column justify-content-center bg-underText bg-underText-yellow p-5">
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
import Carouse from '@/components/Carouse.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      screenWidth: 0
    }
  },
  computed: {
    ...mapGetters('productsModules', ['products'])
  },
  methods: {
    goPage (Category) {
      const vm = this
      vm.$store.dispatch('productsModules/changeCategory', Category)
      vm.$router.push('/productList')
    }
  },
  components: {
    Carouse
  },
  created () {
    this.screenWidth = window.screen.width
  }
}
</script>

<style>
</style>
