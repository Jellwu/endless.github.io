import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 若使用者在網站隨意輸入不存在的分頁，會直接導向首頁
  {
    path: '*',
    redirect: '/'
  },
  // 前台
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/fontend/home.vue')
  },
  {
    path: '/Profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/fontend/profile.vue')
  },
  {
    path: '/productList',
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Products" */ '../views/fontend/products.vue')
  },
  {
    path: '/productList/:productID',
    name: 'Productsdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Products" */ '../views/fontend/page/productDetail.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Custom" */ '../views/fontend/cart.vue')
  },
  {
    path: '/cart_info',
    name: 'CartInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Custom" */ '../views/fontend/page/cart_info.vue')
  },
  {
    path: '/cart_checkout/:orderID',
    name: 'cart_checkout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Custom" */ '../views/fontend/page/cart_checkout.vue')
  },
  {
    path: '/couponpage',
    name: 'couponpage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/fontend/couponpage.vue')
  },
  // 後台管理
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/backend/login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/backend/admin.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'productscheck',
        name: 'Productscheck',
        component: () => import(/* webpackChunkName: "login" */ '../views/backend/Dashboard/productscheck.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "login" */ '../views/backend/Dashboard/orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import(/* webpackChunkName: "login" */ '../views/backend/Dashboard/coupon.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
