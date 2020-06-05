<template>
  <div>
    <transition name="fade-slide">
      <div v-show="isCartmessage.state" class="cart-Message d-felx flex-column justify-content-center">
        <div class="text-center">
          <i class="fas fa-info-circle fa-3x"></i>
        </div>
        <p>{{ isCartmessage.msg }}</p>
      </div>
    </transition>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['isCartmessage'])
  }
}

</script>

<style scoped lang="scss">
.cart-Message-bg{
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
}

.cart-Message{
  padding:20px;
  background-color: rgba(242, 183, 5, 1);
  border-radius: 10px;
  position: fixed;
  top:20%;
  right:5%;
  color:orange;
  transition: 0.5s;
  color:#333333;
  z-index: 100;
}
.cart-Message p {
  margin-top: 5px;
  font-size:20px;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all .5s ease;
}
.fade-slide-enter, .fade-slide-leave-to  {
  transform: translateX(100%);
  opacity: 0;
}

</style>
