import axios from 'axios'
import router from '../router'

export default {
  namespaced: true,
  state: {
    products: [],
    categories: [],
    productId: '',
    product: {},
    favorite: [],
    category: ''
  },
  mutations: {
    // 全產品寫入
    PRODUCTS (state, payload) {
      state.products = payload
    },
    // 分類資料寫入
    CATEGORIES (state, payload) {
      const categories = new Set()
      payload.forEach((item) => {
        categories.add(item.category)
      })
      state.categories = Array.from(categories)
    },
    // 分類選擇
    CATEGORYSELECTED (state, payload) {
      state.category = payload
    },
    // 單一產品的ID
    PRODUCTID (state, payload) {
      state.productId = payload
      router.push(`/productList/${payload}`)
    },
    // 單一產品寫入
    PRODUCTDETAIL (state, payload) {
      state.product = payload
    },
    // 單一產品更新
    UPDATEPRODUCT (state, payload) {
      state.product = payload
    },
    // 取得我的最愛初始值
    GETFAVORITE (state, payload) {
      const getLocalarray = JSON.parse(localStorage.getItem('favorite'))
      // if判斷：給localstorage一個初始值
      if (getLocalarray === null) {
        localStorage.setItem('favorite', JSON.stringify(state.favorite))
      } else {
        localStorage.setItem('favorite', JSON.stringify(getLocalarray))
      }
    },
    // 加入我的最愛
    ADDFAVORITE (state, payload) {
      state.favorite.push(payload)
      localStorage.setItem('favorite', JSON.stringify(state.favorite))
    },
    // 移除我的最愛
    DROPFAVORITE (state, payload) {
      state.favorite.splice(payload, 1)
      localStorage.setItem('favorite', JSON.stringify(state.favorite))
    }
  },
  actions: {
    // 抓全產品資料
    getProducts (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        context.commit('CATEGORIES', response.data.products)
      })
    },
    // 抓單一產品id(要丟給明細頁面用的)
    getproductId (context, id) {
      context.commit('PRODUCTID', id)
    },
    // 修改分類
    changeCategory (context, Category) {
      context.commit('CATEGORYSELECTED', Category)
    },
    // 抓單一產品內容
    getproductDetail (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      context.dispatch('updateLoading', true, { root: true })
      axios.get(url).then((response) => {
        context.commit('PRODUCTDETAIL', response.data.product)
        context.dispatch('updateLoading', false, { root: true })
      })
    },
    // 更新單一產品內容(接收tempProduct的資料)
    updateProduct (context, item) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`
      axios.put(url, { data: item }).then(response => {
        if (response.data.success) {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
          context.dispatch('getProducts')
        } else {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: response.data.message
            },
            { root: true })
        }
      })
    },
    addProduct (context, item) {
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/`
      axios.post(url, { data: item }).then((response) => {
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
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
        axios.get(url).then((response) => {
          context.commit('PRODUCTS', response.data.products)
          context.commit('CATEGORIES', response.data.products)
        })
      })
    },
    dropProduct (context, item) {
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`
      axios.delete(url).then((response) => {
        context.dispatch('cartMessage',
          {
            state: true,
            msg: response.data.message
          },
          { root: true })
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
        axios.get(url).then((response) => {
          // 將api取到的資料抓出來，準備給mutation改寫
          context.commit('PRODUCTS', response.data.products)
          context.commit('CATEGORIES', response.data.products)
        })
      })
    },
    getfavorite (context) {
      context.commit('GETFAVORITE')
    },
    addFavorite (context, payload) {
      // 抓目前localstorage有的資料，轉成陣列
      const getLocalarray = JSON.parse(localStorage.getItem('favorite'))
      // 比較陣列中沒有回傳值id的資料
      const result = getLocalarray.map((item) => {
        return item.id
      }).indexOf(`${payload.id}`)
      // 結果不是'-1'的話就不寫入(表示Localstorage中已有資料)
      if (result === -1) {
        context.dispatch('cartMessage',
          {
            state: true,
            msg: '加入我的最愛'
          },
          { root: true })
        context.commit('ADDFAVORITE', payload)
      } else if (result !== -1) {
        context.dispatch('cartMessage',
          {
            state: true,
            msg: '已在我的最愛清單'
          },
          { root: true })
      }
    },
    dropfavorite (context, payload) {
      const getLocalarray = JSON.parse(localStorage.getItem('favorite'))
      getLocalarray.forEach((item, key) => {
        if (item.id === payload) {
          context.dispatch('cartMessage',
            {
              state: true,
              msg: '已刪除我的最愛'
            },
            { root: true })
          context.commit('DROPFAVORITE', key)
          context.commit('GETFAVORITE')
        }
      })
    }
  },
  // 給computed的mapGetters使用
  getters: {
    // 回傳所有分類
    categories (state) {
      return state.categories
    },
    // 回傳首頁選取分類
    category (state) {
      return state.category
    },
    products (state) {
      return state.products
    },
    productDetail (state) {
      return state.product
    },
    favorite (state) {
      state.favorite = JSON.parse(localStorage.getItem('favorite'))
      return state.favorite
    }
  }
}
