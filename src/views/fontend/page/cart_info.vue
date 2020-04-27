<template>
  <div class="info">
      <div class="product-banner d-flex align-items-center justify-content-center">
        <div class="">
          <h1 class="text-endless">客戶資料填寫</h1>
        </div>
      </div>
      <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <div class="row justify-content-center text-warning my-5">
        <form class="col-md-7">
        <ValidationProvider rules="required" name="收件人姓名" v-slot="{ errors }">
          <div class="form-group">
            <label for="username">收件人姓名(*必填)：</label>
            <input class="form-control" type="text" name="name" id="username"
            v-model="form.user.name" placeholder="請輸入姓名"
            :class="{'is-invalid':errors[0]}">
            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|numeric|digits:10" name="電話" v-slot="{ errors }">
          <div class="form-group">
            <label for="usertel">收件人電話(*必填)：</label>
            <input class="form-control" type="tel" name="name" id="usertel"
            placeholder="請輸入電話" v-model="form.user.tel"
            :class="{'is-invalid':errors[0]}">
            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" name="地址" v-slot="{ errors }">
        <div class="form-group">
            <label for="useraddr">收件人地址(*必填)：</label>
            <input class="form-control" type="text" name="name" id="useraddr"
            placeholder="請輸入地址" v-model="form.user.address"
            :class="{'is-invalid':errors[0]}">
          <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
        </div>
        </ValidationProvider>

        <ValidationProvider rules="email" name="e-mail" v-slot="{ valid, errors }" ref="emailField">
          <div class="form-group">
            <label for="useremail">收到最新消息：</label>
            <input class="form-control" type="email" name="name" id="useremail"
            v-model="form.user.email" placeholder="請輸入Email取得優惠消息"
            :class="{'is-invalid':errors[0]}">
            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

            <div class="form-group">
                <label for="comment">留言</label>
                <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                  placeholder="備註:產品分開裝...等資訊"></textarea>
            </div>
            <div class="form-group text-right">
                <button class="btn btn-warning" :disabled="invalid"
                @click.prevent = "cartCheckout">送出訂單</button>
            </div>
        </form>
      </div>
    </ValidationObserver>
    </div>
</template>

<script>
// import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  computed: {
    // 抓productsModules中的state.product
    ...mapGetters('cartModules', ['cart'])
  },
  methods: {
    ...mapActions('cartModules', ['getCart']),
    removeCart (id) {
      this.$store.dispatch('cartModules/removeCart', id)
    },
    getCoupon () {
      this.$store.dispatch('cartModules/applyCounpon', this.couponCode)
    },
    cartCheckout () {
      const order = this.form
      this.$store.dispatch('orderModules/cartCheckout', order)
    }
  },
  created () {
    this.getCart()
  }
}

</script>
<style scpoed>
.product-banner{
  background-image: url('https://images.unsplash.com/photo-1580112646171-13522164ead4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height:300px;
}
.about .bg-cart-box{
  width:100%;
  background-color: rgba(0, 0, 0,0.1);
}
.bg-cart-box .input-group{
  margin:10px;
  width:90%;
}
.no-carts{
  height:400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:50px;
}

</style>
