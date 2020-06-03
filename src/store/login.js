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
      context.dispatch('updateLoading', true, { root: true })
      axios.post(api, user).then(response => {
        context.dispatch('updateLoading', false, { root: true })
        if (response.data.success) {
          router.push('/admin/productscheck')
        }
      })
    },
    logout (context) {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      context.dispatch('updateLoading', true, { root: true })
      axios.post(api).then((response) => {
        context.dispatch('updateLoading', false, { root: true })
        router.push('/login')
      })
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    }
  }
}
