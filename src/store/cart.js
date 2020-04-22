import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cart: {
      carts: []
    },
    couponCode: {}
  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    },
    COUPONCODE (state, payload) {
      state.couponCode = payload
    }
  },
  actions: {
    getCart (context, payload) {
      context.dispatch('updateLoading', true, { root: true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(url).then((response) => {
        context.commit('CART', response.data.data)
        context.dispatch('updateLoading', false, { root: true })
      })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      axios.delete(url).then((response) => {
        context.dispatch('cartMessage',
          {
            state: true,
            msg: response.data.message
          },
          { root: true })
        // 刪除後重新抓getCart的資料
        context.dispatch('getCart')
      })
    },
    addtoCart (context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const item = {
        product_id: id,
        qty
      }
      axios.post(url, { data: item }).then((response) => {
        // 動態抓response.data.message的資料，整個物件寫回CartMessage
        context.dispatch('cartMessage',
          {
            state: true,
            msg: response.data.message
          },
          { root: true })

        context.dispatch('getCart')
      })
    },
    applyCounpon (context, code) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const cupon = {
        code: code
      }
      axios.post(url, { data: cupon }).then((response) => {
        if (response.data.success) {
          context.commit('COUPONCODE', cupon)
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
          context.dispatch('getCart')
        } else {
          context.commit('COUPONCODE', {})
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
        }
      })
    },
    cancelCoupon (context, code) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const cupon = {
        code: code
      }
      axios.post(url, { data: cupon }).then((response) => {
        if (response.data.success) {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: '已取消'
            },
            { root: true })
          context.commit('COUPONCODE', cupon)
          context.dispatch('getCart')
        } else {
          context.commit('COUPONCODE', {})
          alert(response.data.message)
        }
      })
    }
  },
  getters: {
    cart (state) {
      return state.cart
    }
  }
}
