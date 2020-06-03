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
      // 將API抓到的原始資料先丟到localStorage
      const originQty = []
      payload.carts.forEach(items => {
        originQty.push({
          product_id: items.product_id,
          qty: items.qty
        })
        localStorage.setItem('OrigincartQty', JSON.stringify(originQty))
      })
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
      context.dispatch('updateLoading', true, { root: true })
      axios.delete(url).then((response) => {
        context.dispatch('updateLoading', true, { root: false })
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
    updateCartQty (context, { originCartId, originProductId, newQty }) {
      // 接收的變數名稱必須與回傳的變數名稱相同，在寫入item時改寫
      const changeId = originCartId
      const changeItem = {
        product_id: originProductId,
        qty: newQty
      }
      const delUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${changeId}`
      const addUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      function addApi (item) {
        context.dispatch('updateLoading', true, { root: true })
        axios.post(addUrl, { data: item }).then((response) => {
          context.dispatch('updateLoading', false, { root: true })
          context.dispatch('cartMessage',
            {
              state: true,
              msg: '已更新購物車'
            },
            { root: true })
        })
      }
      axios.all([axios.delete(delUrl), addApi(changeItem)])
        .then(axios.spread(() => {
          context.dispatch('getCart')
        }))
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
          context.dispatch('cartMessage',
            {
              state: true,
              msg: '取消異常'
            },
            { root: true })
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
