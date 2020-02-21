<template>
  <div class="about container my-5">
    <div class="text-right mb-4">
      <button type="button" class="btn btn-warning" @click="openPdcModal(true)">
        新增產品
        </button>
    </div>
    <table class="table mt-4 text-endless">
      <thead>
        <tr>
          <th width="120px">分類</th>
          <th>產品名稱</th>
          <th width="120px" class="text-right">原價</th>
          <th width="120px" class="text-right">售價</th>
          <th width="80px">啟用</th>
          <th width="150px">功能</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="products.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right"></td>
          <td class="text-right"> </td>
          <td class="text-success">啟用</td>
          <td class="text-danger">未啟用</td>
          <td>
            <button class="btn btn-outline-dark">編輯</button>
            <button class="btn btn-outline-danger">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script>
//import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex';

export default{
  name: 'ProductCheck',
  data() {
    return {

    };
  },
  computed: {
    // ...mapGetters('productsModules',['products','categories']),
  },
  methods: {
    ...mapActions('productsModules',['getProducts']),
  },
  created(){
    getProducts()
  },
}

</script>
<style scpoed>

</style>
