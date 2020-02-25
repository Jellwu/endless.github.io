<template>
  <div class="about container my-5">
    <div class="text-right mb-4">
      <button type="button" class="btn btn-warning" @click="openPdcModal(true)">
        新增產品
        </button>
    </div>
    <table class="table mt-4 text-endless">
      <thead class="thead-dark">
        <tr>
          <th width="200px">分類</th>
          <th>產品名稱</th>
          <th width="120px" class="text-right">原價</th>
          <th width="120px" class="text-right">售價</th>
          <th width="80px">啟用</th>
          <th width="150px">功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="products.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.price | currency}}</td>
          <td class="text-right">{{item.origin_price | currency}}</td>
          <td v-if="item.is_enabled" class="text-success">啟用</td>
          <td v-else="item.is_enabled" class="text-danger">未啟用</td>
          <td>
            <button class="btn btn-outline-warning mr-2" @click.prevent="openPdcModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger" @click.prevent="opendropModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div class="modal fade" id="pdcModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <i class="fas fa-sync fa-spin text-success" v-if="status.preuploadFile"></i>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadFile">
            </div>
            <div class="text-success" v-if="fileDone">
              <p>圖片上傳成功！</p>
            </div>
            <img :src="tempProduct.imageUrl"
              class="img-fluid" alt="">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempProduct.title">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category"
                  placeholder="請輸入分類" v-model="tempProduct.category">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input type="unit" class="form-control" id="unit"
                  placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price"
                  placeholder="請輸入原價" v-model="tempProduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price"
                  placeholder="請輸入售價" v-model="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description"
                placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content"
                placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="is_enabled"
                v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="updateProduct">確認</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>

    <!-- dropModel -->
        <div class="modal fade" id="dropModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">刪除確認</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="p-2" v-model="tempProduct.title">
                    <p>是否刪除產品：<span class="text-danger font-weight-bold">{{tempProduct.title}}?</span></p>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="dropProduct">刪除</button>
              </div>
            </div>
          </div>
        </div>

    </div>
    </template>
  </div>
</template>

<script>
//import mapGetter與mapActions的方法
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';

export default{
  name: 'ProductCheck',
  data() {
    return {
      tempProduct:{},
      status:{
        preuploadFile:false,
      },
      fileDone:false,
    };
  },
  computed: {
    ...mapGetters('productsModules',['products','categories']),
  },
  methods: {
    ...mapActions('productsModules',['getProducts']),
    openPdcModal(isNew,item){
      if(isNew){
        this.tempProduct = {};
        this.isNew = true;
      }else{
        this.tempProduct = Object.assign({},item);
        this.isNew = false
      }
      $('#pdcModal').modal('show');
    },
    opendropModal(item){
      $('#dropModel').modal('show');
      this.tempProduct = item;
    },

    updateProduct(){
      if(!this.isNew){
        this.$store.dispatch('productsModules/updateProduct',this.tempProduct);
        $('#pdcModal').modal('hide');
      }else{
        this.$store.dispatch('productsModules/addProduct',this.tempProduct);
        $('#pdcModal').modal('hide');
      }
    },
    // 上傳圖片
    uploadFile(){
    const uploadedFile = this.$refs.files.files[0];
    const vm = this;
    const formData = new FormData();
    formData.append('file-to-file',uploadedFile);
    vm.status.preuploadFile = true;

    const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
    this.$http.post(url, formData, {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then((response) =>{
    vm.status.preuploadFile = false;
    if(response.data.success){
      // formData直接塞入值會無法雙向綁定(set,get方法未正常)，需要用$set強制寫入
      // vm.tempProducts.imageUrl = response.data.imageUrl;
      // vm.$set(要寫入的變數, 要寫入的欄位, 寫入的值)
      vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
      vm.fileDone = true;
    }else{
      response.data.message;
        }
      })
    },

    dropProduct(){
      this.$store.dispatch('productsModules/dropProduct',this.tempProduct);
      $('#dropModel').modal('hide');
    }
  },
  created(){
    this.getProducts()
  },
}

</script>
<style scpoed>

</style>
