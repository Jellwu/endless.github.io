<template>
  <div class="my-5">
    <table class="table ml-auto mt-4 text-endless">
      <thead class="thead-dark">
        <tr>
          <th width="110px">訂單時間</th>
          <th>訂單編號</th>
          <th>訂購人</th>
          <th>產品資訊</th>
          <th>價格</th>
          <th width="110px">付款時間</th>
          <th>付款狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(items) in Orders" :key="items.id">
          <td>{{ items.create_at | timeTranse }}</td>
          <td>{{ items.id }}</td>
          <td>{{ items.user.name }}</td>
          <td>
            <div v-for ="items in items.products" :key="items.id">
              {{ items.product.title }} / {{ items.product.num }} {{ items.product.unit }}
            </div>
          </td>
          <td>{{  items.total| currency  }}</td>
          <td v-if="items.is_paid">{{ items.paid_date | timeTranse }}</td>
          <td v-else-if="!items.is_paid"> -- </td>
          <td v-if="items.is_paid" class="text-success"> 完成付款</td>
          <td v-else-if="!items.is_paid" class="text-danger">尚未付款</td>
        </tr>
      </tbody>
    </table>

    <!-- 預設10筆頁數 -->
    <div class="row justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-for="pages in pages.total_pages" :key="pages.current_page"
            :class="{'active': pages.current_page == pages }"
            @click.prevent = "getOrderList(pages)">
            <a class="page-link" href="#">{{ pages }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Order',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('orderModules', ['Orders', 'pages'])
  },
  methods: {
    getOrderList (page = 1) {
      this.$store.dispatch('orderModules/getOrderList', page)
    }
  },
  created () {
    this.getOrderList()
  }
}

</script>
<style scpoed>
tr,td{
  padding:0px;
}
</style>
