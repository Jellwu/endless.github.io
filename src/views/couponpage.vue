<template>
  <div>
    <div class="box-top"></div>
    <div class="container d-flex flex-column align-items-center">
      <h2 class="text-white">試試你的手氣吧！！</h2>
      <button class="btn btn-outline-warning my-5" type="button" name="button" @click="getLotto()">
        開始抽獎
      </button>
      <div class="LottoArea d-flex justify-content-around">
        <div class="box-1">1</div>
        <div class="box-2">2</div>
        <div class="box-3">3</div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// @ is an alias to /src
export default {
  name: 'COUPON',
data(){
  return{
    // 抽獎總數
    itemNum:3,
  }
},
methods:{
  getLotto:function(){
    const vm = this;
    console.log(Math.floor(Math.random() * vm.itemNum));
  }
},
computed:{
  ...mapGetters('loginModules',['isLoading']),
  // cart(){
  //   return this.$store.state.cart;
  // }
},
}
</script>
<style scope>
.box-top{
  height:100px;
}
.LottoArea{
  width:100%;
}
.box-1,.box-2,.box-3{
  width:33%;
  color:white
}
.win-border{
  border:2px solid white;
}

</style>
