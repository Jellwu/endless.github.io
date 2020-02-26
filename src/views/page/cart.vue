<template>
  <div class="about container my-5">
      <div class="text-center">
        <h3 class="text-warning my-4">購物車列表</h3>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-md-7">
          <table class="table table-sm text-endless">
            <thead>
              <tr>
                <td>功能</td>
                <td valign="middle">項目</td>
                <td valign="middle">產品名稱</td>
                <td>購買數量</td>
                <td class="text-right">產品單價</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="items in cart.carts" :key="items.id">
                <td style="vertical-align: middle;">
                  <button class="btn text-danger" type="button"
                  name="button" @click.prevent="removeCart(items.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
                <td style="width:80px;"><img class="img-fluid" :src="items.product.imageUrl"></td>
                <td style="vertical-align: middle;">{{items.product.title}}
                  <p class="text-success" v-if="items.coupon">
                    已套用優惠券
                  </p>
                </td>
                <td class="text-center" style="width:80px; vertical-align: middle;">{{items.qty}}</td>
                <td class="text-right" style="width:100px; vertical-align: middle;">{{items.product.price | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td  class="py-3" colspan="4" style="vertical-align: middle;">
                    <p class="h6 text-right pt-2">總計金額：</p>
                </td>
                <td class="py-3"  style="vertical-align: middle;">
                    <p class="h6 text-right pt-2">{{cart.total | currency}}</p>
                </td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td  class="py-2 text-success" colspan="4" style="vertical-align: middle;">
                    <p class="h6 text-right pt-2">折扣金額：</p>
                </td>
                <td class="py-3"  style="vertical-align: middle;">
                    <p class="h6 text-right pt-2">{{cart.final_total | currency}}</p>
                </td>
              </tr>
              <tr>
                  <td colspan="4" class="text-right" style="vertical-align: middle;">
                    <form class="form-inline my-3 d-flex justify-content-end">
                      <div class="form-group mx-sm-3">
                        <input type="text" class="form-control"
                        v-model="couponCode" placeholder="輸入優惠券號碼">
                      </div>
                      <button type="button" class="btn btn-warning"
                      @click="getCoupon">
                        <i class="fas fa-ticket-alt"></i> 使用優惠券
                      </button>
                    </form>
                  </td>
                  <td class="text-center" style="vertical-align: middle;">
                    <button class="btn btn-secondary" type="button" name="button">
                      取消
                    </button>
                  </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div class="text-center">
        <h3 class="text-warning my-4">訂單資料</h3>
      </div>
      <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <div class="row justify-content-center text-warning">
        <form class="col-md-7">
        <ValidationProvider rules="required" name="收件人姓名" v-slot="{ errors }">
          <div class="form-group">
            <label for="username">收件人姓名：</label>
            <input class="form-control" type="text" name="name" id="username"
            v-model="form.user.name" placeholder="請輸入姓名"
            :class="{'is-invalid':errors[0]}">
            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required|email" name="e-mail" v-slot="{ valid, errors }" ref="emailField">
          <div class="form-group">
            <label for="useremail">收件人信箱：</label>
            <input class="form-control" type="email" name="name" id="useremail"
            v-model="form.user.email" placeholder="請輸入 Email"
            :class="{'is-invalid':errors[0]}">
            <span class="text-danger" v-if="errors[0]">{{errors[0]}}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|numeric|digits:10" name="電話" v-slot="{ errors }">
          <div class="form-group">
            <label for="usertel">收件人電話：</label>
            <input class="form-control" type="tel" name="name" id="usertel"
            placeholder="請輸入電話" v-model="form.user.tel"
            :class="{'is-invalid':errors[0]}">
            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" name="地址" v-slot="{ errors }">
        <div class="form-group">
            <label for="useraddr">收件人地址：</label>
            <input class="form-control" type="text" name="name" id="useraddr"
            placeholder="請輸入地址" v-model="form.user.address"
            :class="{'is-invalid':errors[0]}">
          <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
        </div>
        </ValidationProvider>

            <div class="form-group">
                <label for="comment">留言</label>
                <textarea name="" id="comment" class="form-control" cols="30" rows="10"></textarea>
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
//import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider } from 'vee-validate';

export default{
  name: 'Cart',
  data() {
    return {
      couponCode:'',
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:''
      }
    };
  },
  computed: {
    // 抓productsModules中的state.product
    ...mapGetters('cartModules',['cart']),
  },
  methods: {
    ...mapActions('cartModules',['getCart']),
    removeCart(id){
      this.$store.dispatch('cartModules/removeCart', id);
    },
    getCoupon(){
      this.$store.dispatch('cartModules/applyCounpon',this.couponCode);
    },
    cartCheckout(){
      const order = this.form;
      this.$store.dispatch('orderModules/cartCheckout',order);
    },

  },
  created(){
    this.getCart();
  },
}

</script>
<style scpoed>

</style>
