<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="container text-endless">
      <form class="form-signin my-5 p-3 ml-auto mr-auto border border-1" @submit.prevent="singin">
        <h1 class="h3 mb-5 mt-2 font-weight-normal text-warning text-center">管理者 登入</h1>
        <label class="text-left" for="inputEmail">Email address</label>
        <input v-model="user.username" type="email" id="inputEmail" class="form-control"
        placeholder="Email address" required autofocus>
        <label class="text-left" for="inputPassword">Password</label>
        <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-warning btn-block mt-5" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
// @ is an alias to /src
export default {
  name: 'LOGIN',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    singin () {
      const user = this.user
      this.$store.dispatch('loginModules/singin', user)
    },
    handleScroll () {
      if ($(window).scrollTop() > $('.form-signin').offset().top) {
        $('.nav-bg').addClass('nav-bg-visible')
      } else {
        $('.nav-bg').removeClass('nav-bg-visible')
      }
    }
  },
  computed: {
    ...mapGetters('loginModules', ['isLoading'])
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
input{
    margin-bottom: 15px;
}
.container{
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0px 50px 0px;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
