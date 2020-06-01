import axios from 'axios'

export default {
  namespaced: true,
  state: {
    coupon: {},
    isLogin: false,
    isLoading: false
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    COUPON (state, payload) {
      state.coupon = payload
    }
  },
  actions: {
    updateLoading (context, payload) {
      context.commit('LOADING', payload)
    },
    getCoupon (context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      context.commit('LOADING', true)
      axios.get(url).then((response) => {
        context.commit('COUPON', response.data.coupons)
        context.commit('LOADING', false)
      })
    },
    addCoupon (context, item) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      context.commit('LOADING', true)
      axios.post(url, { data: item }).then((response) => {
        if (response.data.success) {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
          context.dispatch('getCoupon')
        } else {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
        }
        context.commit('LOADING', false)
      })
    },
    editCoupon (context, item) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`
      context.commit('LOADING', true)
      axios.put(url, { data: item }).then((response) => {
        if (response.data.success) {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
          context.dispatch('getCoupon')
        } else {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
        }
        context.commit('LOADING', false)
      })
    },
    dropCoupon (context, item) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`
      context.commit('LOADING', true)
      axios.delete(url).then((response) => {
        if (response.data.success) {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
        } else {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
        }
        context.commit('LOADING', false)
      })
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    coupon (state) {
      return state.coupon
    }
  }
}
