<template>
  <div class="about container my-5">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right my-3">
      <button class="btn btn-warning" type="button" name="button"
      @click="openCouponModal(true)">
        新增優惠券
      </button>
    </div>
    <table class="table ml-auto mt-4 text-endless">
      <thead class="thead-dark">
        <tr>
          <th class="text-left">標題</th>
          <th width="150">折扣數</th>
          <th width="230">折扣碼</th>
          <th colspan="2" width="100" class="text-center">功能</th>
        </tr>
      </thead>
      <tbody v-for="(items) in coupon" :key="items.id">
        <tr>
          <td>{{ items.title }}</td>
          <td>{{ items.percent }}</td>
          <td>{{ items.code }}</td>
          <td>
            <button class="btn text-warning" @click="openCouponModal(false, items)">
              <i class="fas fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="btn text-danger" @click="opendropCoupon(items)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- CouponModal -->
    <div class="modal fade" id="CouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{  modelTitle  }}優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="category">標題</label>
                <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="price">優惠折扣數</label>
                <input type="number" class="form-control" id="percent" v-model="tempCoupon.percent" placeholder="百分比數值">
              </div>
              <div class="form-group col-md-6">
                <label for="origin_price">優惠碼</label>
                <input type="text" class="form-control" id="code" v-model="tempCoupon.code" placeholder="請輸入優惠碼">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="addCoupon">送出</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="coupondropModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-danger">
              <h5 class="modal-title text-white" id="exampleModalLabel">刪除視窗</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <h5>確認刪除  <span class="text-danger">{{ tempCoupon.title }}</span>？</h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="dropCoupon">確認</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'Coupon',
  data () {
    return {
      tempCoupon: {},
      modelTitle: '',
      isNew: true
    }
  },
  computed: {
    ...mapGetters('couponModules', ['coupon', 'isLoading'])
  },
  methods: {
    getCoupon (page = 1) {
      this.$store.dispatch('couponModules/getCoupon', page)
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        this.modelTitle = '新增'
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.modelTitle = '編輯'
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
      $('#CouponModal').modal('show')
    },
    opendropCoupon (item) {
      $('#coupondropModal').modal('show')
      this.tempCoupon = item
    },
    addCoupon () {
      if (this.isNew) {
        this.$store.dispatch('couponModules/addCoupon', this.tempCoupon)
        $('#CouponModal').modal('hide')
        this.$store.dispatch('couponModules/getCoupon')
      } else {
        this.$store.dispatch('couponModules/editCoupon', this.tempCoupon)
        $('#CouponModal').modal('hide')
      }
    },
    dropCoupon () {
      this.$store.dispatch('couponModules/dropCoupon', this.tempCoupon)
      $('#coupondropModal').modal('hide')
    }
  },
  created () {
    this.getCoupon()
  }
}

</script>
<style scpoed>
td{
  padding:0px;
}
.about{
  width: 60%;
  min-height:450px;
}

</style>
