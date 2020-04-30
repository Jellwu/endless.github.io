<template>
  <div>
    <div class="box-top"></div>
    <vue-slide-up-down :active="active" :duration="1000" class="coverImg position-absolute">
      <img src="https://i.imgur.com/BQ9FP8q.jpg" class="img-fluid">
    </vue-slide-up-down>
    <div class="container d-flex flex-column align-items-center text-white">
      <h2 class="my-3 text-white">試著完成酷碰圖片吧！</h2>
      <p class="text-warning mb-2">遊戲規則：點選圖片時會向空白處移動，試著拼出完整的圖片吧！</p>
        <div class="LottoArea my-5">
          <img class="img-fluid" v-for="(item,index) in rePuzzles" :key="index"
          :src="item" @click.prevent = moveSquare(index);
          alt="..." style="width:33%">
        </div>
        <div class="col-md-11 bg-opacity  d-flex flex-column align-items-center mb-4 py-2">
          <h2 class="my-3 text-white">輸入你看到的數字吧！</h2>
          <p class="text-warning mb-3">提示：觀察蛛絲馬跡！不用完整拼出來也可以猜到拉！</p>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="驗證Coupon Code" v-model="couponCode">
            <div class="input-group-append" v-if="active === false">
              <button class="btn btn-outline-warning" @click.prevent = ansCheck()
              type="button" id="button-addon2">
                送出
              </button>
            </div>
          </div>
          <span v-if="ansMsg !== ''" class="text-white">{{ ansMsg }}</span>
        </div>

    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'COUPON',
  data () {
    return {
      puzzles: [],
      couponCode: '',
      active: false,
      ansMsg: ''
    }
  },
  methods: {
    handleScroll () {
      if ($(window).scrollTop() > $('.box-top').offset().top + 60) {
        $('.nav-bg').addClass('nav-bg-visible')
      } else {
        $('.nav-bg').removeClass('nav-bg-visible')
      }
    },
    // 建立puzzleArr 等等用來sort()亂數排序
    render () {
      const vm = this
      let puzzleArr = []
      for (let i = 1; i <= 6; i++) {
        switch (i) {
          case 1:
            puzzleArr.push('https://i.imgur.com/wj8cZJu.jpg')
            break
          case 2:
            puzzleArr.push('https://i.imgur.com/2LGgHSH.jpg')
            break
          case 3:
            puzzleArr.push('https://i.imgur.com/dp23WtP.jpg')
            break
          case 4:
            puzzleArr.push('https://i.imgur.com/2zbH58Z.jpg')
            break
          case 5:
            puzzleArr.push('https://i.imgur.com/HiR3bJj.jpg')
            break
          case 6:
            puzzleArr.push('https://i.imgur.com/TcF1tXS.png')
            break
        }
      }
      // 亂數排序puzzleArr陣列
      puzzleArr = puzzleArr.sort(() => {
        return Math.random() - 0.5
      })
      vm.puzzles = puzzleArr
    },
    moveSquare (index) {
      const vm = this
      // 取得現在資料上下左右的值(照片連結)
      const currentImg = vm.puzzles[index]
      const rightImg = vm.puzzles[index + 1]
      const leftImg = vm.puzzles[index - 1]
      const topImg = vm.puzzles[index - 3]
      const botImg = vm.puzzles[index + 3]
      const emptyImg = 'https://i.imgur.com/TcF1tXS.png'

      if (rightImg === emptyImg) {
        vm.$set(vm.puzzles, index + 1, currentImg)
        vm.$set(vm.puzzles, index, emptyImg)
      } else if (leftImg === emptyImg) {
        vm.$set(vm.puzzles, index - 1, currentImg)
        vm.$set(vm.puzzles, index, emptyImg)
      } else if (topImg === emptyImg) {
        vm.$set(vm.puzzles, index - 3, currentImg)
        vm.$set(vm.puzzles, index, emptyImg)
      } else if (botImg === emptyImg) {
        vm.$set(vm.puzzles, index + 3, currentImg)
        vm.$set(vm.puzzles, index, emptyImg)
      }
    },
    ansCheck () {
      const vm = this
      if (vm.couponCode === '776803') {
        vm.active = true
        vm.ansMsg = '正確答案，折扣起來！'
      } else {
        vm.ansMsg = '答錯了，再試一次！'
      }
    }
  },
  computed: {
    rePuzzles () {
      return this.puzzles
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    this.render()
  }
}
</script>
<style scope>
.box-top{
  height:100px;
}
.LottoArea{
  width:104%;
  height:100%;
}
.input-group{
  width:50%;
}
.bg-opacity{
  background-color: rgba(0,0,0,0.3);
}
.puzzle-empty {
  display: inline-block;
  width:425px;
  height: 360px;
  background: rgba(0,0,0,0);
}
.position-absolute{
  top:35.0%;
  right:10.6%;
}
.coverImg{
  width:1150px;
  background-color: rgba(0,0,0,0);
  z-index: 10;
}

</style>
