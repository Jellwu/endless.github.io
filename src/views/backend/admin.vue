<template>
    <div class="container-fluid">
      <div class="row">
        <!-- sidebar -->
        <nav class="pt-3 col-md-2 d-none d-md-block sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span class="text-endless">管理員</span>
              <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link  to="/admin/productscheck" class="nav-link">
                  <i class="fas fa-list-ul mr-1"></i>
                  產品列表
                </router-link>
                <router-link  to="/admin/orders" class="nav-link">
                  <i class="far fa-folder-open mr-1"></i>
                  管理訂單
                </router-link>
                <router-link  to="/admin/coupon" class="nav-link">
                  <i class="fas fa-ticket-alt mr-1"></i>
                  優惠券
                </router-link>
              </li>
            </ul>
            <div class="text-right">
              <button class="btn btn-outline-warning mb-2" type="button" name="button" @click.prevent="logout">
                管理者登出
              </button>
            </div>
          </div>
        </nav>

        <!-- 內容區 -->
        <div class="col-md-10 my-5">
          <router-view/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Admin',
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(api).then((response) => {
        alert(response.data.message)
        this.$router.push('/login')
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.sidebar-style{
  height:800px;
  background-color: rgba(0, 0, 0, 0);
}
a {
    text-decoration: none;
    background-color: transparent;
    color: #F3E1AA;
}
.router-link-exact-active {
      color: #F2CA52;
      font-weight: bold;
}
.sidebar{
  border-right: 2px double #F3F6E0;
}

</style>
