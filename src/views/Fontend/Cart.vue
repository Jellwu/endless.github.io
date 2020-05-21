<template>
<div class="about">
  <cartMessage></cartMessage>
  <div class="product-banner d-flex align-items-center justify-content-center">
    <div class="">
      <h1 class="text-endless">購物車列表</h1>
    </div>
  </div>
  <div v-if="cart.carts.length === 0" class="no-carts">
    <div>
      <p class="text-endless">目前沒有選購任何商品</p>
      <div class="text-center">
        <router-link class="btn btn-outline-warning" to="/productList">
          <span class="underline">
            來去逛逛 <i class="fas fa-shipping-fast"></i>
          </span>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else-if="cart.carts.length !== 0">
    <div class="container my-5">
      <div class="row d-flex d-flex justify-content-between align-items-center">
        <div class="col-8">
          <h2 class="text-white">
            Step 1. 確認商品
          </h2>
        </div>
        <div class="col-4">
          <div class="pay-process">
            <ul class="d-flex justify-content-between">
              <li class="pay-process-1 complited-1"></li>
              <li class="pay-process-2"></li>
              <li class="pay-process-3"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-md-12 mt-5">
          <div class="h2 bg-warning text-dark text-center py-3">
            購物車清單
          </div>
          <table class="table table-borderless table-striped text-endless">
            <thead class="text-endless h5">
              <tr>
                <td class="text-center">功能</td>
                <td valign="middle">項目</td>
                <td valign="middle">產品名稱</td>
                <td>購買數量</td>
                <td class="text-right">產品單價</td>
              </tr>
            </thead>
            <tbody class="cartOrder-content">
              <tr v-for="items in sortedArray" :key="items.id">
                <td class="text-center" style="vertical-align: middle;">
                  <button class="btn text-danger" type="button" name="button" @click.prevent="removeCart(items.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
                <td style="width:120px;vertical-align: middle;">
                  <img class="img-fluid" :src="items.product.imageUrl">
                </td>
                <td style="vertical-align: middle;">
                  <a href="#" @click.prevent='getproductId(items.product.id)'>
                    {{ items.product.title }}
                  </a>
                  <p class="text-success" v-if="items.final_total !== items.total">
                    已套用優惠券
                  </p>
                </td>
                <td class="text-center cancelAlter p-0" style="width:140px; vertical-align: middle;">
                  <div v-for="(dropItem) in tempdropCart" :key='dropItem.id' class="cancelBox" :class="{'fadeInRight-cart':dropItem.id === items.id, 'fadeOutRight-cart':dropItem.qty > 0 }">
                    <div class="text-white d-flex flex-column align-items-center justify-content-center" style="height:105px">
                      <p class="text-dark h6 mb-1">刪除品項?</p>
                      <div>
                        <div id="button-addon3">
                          <button class="btn btn-sm btn-outline-dark mr-2" type="button" @click.prevent="removeCart(dropItem.id)">
                            是
                          </button>
                          <button class="btn btn-sm btn-outline-dark" type="button" @click.prevent="items.qty = 1">
                            否
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="text-endless" v-if="items.final_total !== items.total">
                    {{ items.qty }}
                  </p>
                  <div class="input-group input-group-sm pl-2" v-else-if="items.final_total === items.total">
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-warning" type="button" id="button-addon1" @click.prevent="changNum(items.product_id, -1)">
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                    <input class="text-center text-dark" type="number" min="0" max="100" v-model="items.qty" @change.prevent="changNum()">
                    <div class="input-group-append">
                      <button class="btn btn-outline-warning" type="button" id="button-addon2" @click.prevent="changNum(items.product_id, 1)">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="text-right" style="width:120px; vertical-align: middle;">{{ items.product.price * items.qty | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="cartOrder-content">
                <td class="text-right" colspan="4" style="vertical-align: bottom;">
                  <p>總計金額：</p>
                </td>
                <td class="text-right px-0 py-2">
                  <button class="btn btn-outline-warning mb-1" @click.prevent="updateCartqty()" type="button" name="button" :disabled="isDisabled" :class="{ 'discursor':isDisabled }">
                    更新購物車
                  </button>
                  <span class="ml-4 mr-0">{{ cart.total | currency }}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="row d-flex justify-content-around bg-cart-box no-gutters p-3 mt-4">
        <div class="col-md-7">
          <ul class="noticed-item text-endless mt-3 pl-4">
            <h4 class="pb-2"><i class="far fa-hand-point-right mr-2"></i>注意事項</h4>
            <li class="text-warning">數量修改後需重新計算。</li>
            <li class="text-warning">輸入優惠券後不可修改數量。</li>
            <li>確認所填寫的資料是否正確，若因資料不全而退貨，需負擔運費。</li>
            <li>收到商品後請確認本體(含外盒)是否有破損，於七天內提出瑕疵申請。</li>
            <li>本商品目前只供應台灣地區，只提供宅配到府。</li>
          </ul>
        </div>
        <div class="col-md-5">
          <div class="text-endless mt-4">
            <!-- 結帳資訊區 -->
            <div class="text-right">
              <p class="pt-3 pr-2">共計 <span class="text-warning">{{ cart.carts.length }}</span> 項商品</p>
              <p class="pr-2" v-if="cart.final_total !== cart.total">
                <span class="badge badge-pill badge-warning">已輸入優惠券</span>
                <br>
                結帳金額：<span class="text-warning">{{ cart.final_total | currency }}</span>
              </p>
              <p class="pr-2" v-else-if="cart.final_total === cart.total">
                結帳金額：<span class="text-warning">{{ cart.final_total | currency }}</span>
              </p>

              <!-- 優惠券按鈕區 -->
              <div class="pb-2">
                <div class="input-group ml-auto" v-if="cart.final_total !== cart.total">
                  <input type="text" class="form-control" placeholder="輸入優惠券號碼" v-model="couponCode" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" @click="cancelCoupon" type="button" id="button-addon2">取消</button>
                  </div>
                </div>
                <div class="input-group ml-auto" v-else-if="cart.final_total === cart.total">
                  <input type="text" class="form-control" placeholder="輸入優惠券號碼" v-model="couponCode" aria-label="Recipient's username" aria-describedby="button-addon2">
                  <div class="input-group-append">
                    <button class="btn btn-sm btn-outline-warning" @click="getCoupon" type="button" id="button-addon2">優惠券</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 text-right mt-3">
          <router-link to="/cart_info">
            <button class="btn btn-warning" :class="{'discursor': disNext }" type="button" name="button" :disabled="disNext">
              下一步
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import cartMessage from '@/components/CartMessage.vue'

export default {
  name: 'Cart',
  data () {
    return {
      couponCode: '',
      message: '',
      alterCart: [], // alterCart 購物車有修改時存放
      disNext: false,
      isDisabled: true,
      tempdropCart: {
        product: {}
      },
      alertShow: false
    }
  },
  computed: {
    ...mapGetters('cartModules', ['cart']),

    // 購物車產品排序(避免更新購物車時產生順序變動)
    sortedArray: function () {
      function compare (a, b) {
        if (a.product.title < b.product.title) {
          return -1
        }
        if (a.product.title > b.product.title) {
          return 1
        }
        return 0
      }
      return this.cart.carts.slice(0).sort(compare)
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('cartModules/getCart')
    },
    getproductId (id) {
      this.$router.push(`/productList/${id}`)
    },
    removeCart (id) {
      this.$store.dispatch('cartModules/removeCart', id)
      this.alterCart = []
      this.getCart()
    },
    getCoupon () {
      this.$store.dispatch('cartModules/applyCounpon', this.couponCode)
    },
    cancelCoupon () {
      this.$store.dispatch('cartModules/cancelCoupon', 'ORIGINP0')
    },
    // 用來判斷數值有沒有更改，若有不能進行下一步
    changNum (id, qty) {
      const vm = this
      if (qty !== 0) {
        vm.cart.carts.forEach((item, i) => {
          if (item.product_id === id) {
            item.qty = item.qty + qty
          }
        })
      }
      // alterItem 結合所有數量有更改的資料(用一開始存放的localStorage比較)
      let alterItem = []
      const localQtyarray = JSON.parse(localStorage.getItem('OrigincartQty'))
      localQtyarray.forEach((item, i) => {
        const data = vm.cart.carts.filter((items) => {
          return (items.product_id === item.product_id && items.qty !== parseInt(item.qty))
        })
        alterItem = alterItem.concat(data)
      })
      vm.alterCart = alterItem
    },
    updateCartqty () {
      const vm = this
      // 如果alterItem中有值去修改全部的資料
      if (vm.alterCart.length > 0) {
        vm.alterCart.forEach((item, i) => {
          const originCartId = item.id
          const originProductId = item.product_id
          const newQty = parseInt(item.qty)
          vm.$store.dispatch('cartModules/updateCartQty', {
            originCartId,
            originProductId,
            newQty
          })
          vm.alterCart = []
          vm.getCart()
        })
      }
    }
  },
  components: {
    cartMessage
  },
  watch: {
    alterCart: function () {
      const vm = this
      if (vm.alterCart.length === 0) {
        vm.disNext = false
        vm.isDisabled = true
      }
      if (vm.alterCart.length > 0) {
        vm.disNext = true
        vm.isDisabled = false
      }

      // 將數量等於0的資料丟到tempdropCart
      vm.tempdropCart = vm.alterCart.filter((item) => {
        return parseInt(item.qty) === 0
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
<style scpoed>
.product-banner {
  background-image: url('https://images.unsplash.com/photo-1580112646171-13522164ead4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 300px;
}

.about .bg-cart-box {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.bg-cart-box .input-group {
  margin: 10px;
  width: 90%;
}

.no-carts {
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}

tbody a {
  display: block;
  text-decoration: none;
  color: white;
}

tbody a:hover {
  text-decoration: none;
  color: #FFC107;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-group {
  width: 100%;
}
</style>
