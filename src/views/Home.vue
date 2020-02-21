<template>
  <div>
    <div class="home-bg">
      <div class="home-text-box">
        <p class="text-white home-text-bg">不敗的，是經典</p>
      </div>
    </div>
    <div class="container">
      <div class="text-center my-5 px-5">
        <h3>Explore endless</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
        <div class="row no-gutters endless-block my-5">
          <div class="col-md-6" style="z-index: 10" border->
            <img src="./view-img/homephoto1.jpg" class="img-fluid rounded-right" alt="">
          </div>
          <div class="col-md-6 bg-section endless-position rounded-left d-flex align-items-center ">
            <div class="mb-2 pl-5">
              <h5 class="text-center">title1</h5>
              <p class="px-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div class="text-right mr-5">
                <button class="btn btn-outline-info" type="button" name="button">來去逛逛</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Parallax from '../components/Parallax.vue';
export default {
  name: 'Home',
  components: {
  Parallax,
}
}
</script>

<style lang="scss" scoped>
  .bg-section{
    background-color: rgba( 67, 48, 34, 0.9);
  }
  .endless-block{
    position: relative;
    height: 400px;
  }
  .endless-position{
    position: absolute;
    right:55px;
    top:50px;
    height: 95%;
  }
  .home-bg{
    background-image: url("https://images.unsplash.com/photo-1489068353139-3740c7af5fb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1522&q=80");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height:650px;
  }
  .home-box{
    position: absolute;
    height:400px;
    right:0px;
    top:0px;
    z-index: 10;
  }
  .bg-style{
    position: relative;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height:400px;
  }
  .home-text-box{
    font-size: 60px;
    width:100%;
    height:650px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .home-text-bg{
    // background-color: rgba(0, 0, 0, 0.7);
    padding:10px 50px;
    border-radius: 20px;
  }
</style>
