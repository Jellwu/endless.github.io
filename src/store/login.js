import axios from 'axios'
import router from '../router'

export default {
  namespaced: true,
  state: {
    isLogin: false,
    isLoading: false
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    updateLoading (context, payload) {
      context.commit('LOADING', payload)
    },
    singin (context, user) {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      context.commit('LOADING', true)
      axios.post(api, user).then(response => {
        context.commit('LOADING', false)
        if (response.data.success) {
          router.push('/admin/productscheck')
        } else {
          alert(response.data.message)
        }
      })
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    }
  }
}
