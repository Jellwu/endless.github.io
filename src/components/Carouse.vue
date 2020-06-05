<template>
  <div>
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img v-if ="screenWidth > 800" class="d-block w-100"
          src="https://i.imgur.com/ZoVoblp.jpg" alt="First slide">
          <div v-else-if="screenWidth <= 450" class="img-carousel-1 d-flex justify-content-center align-items-end">
            <h6 class="text-light">流行總會被取代，經典會永久流傳</h6>
          </div>
          <div class="carousel-caption d-none d-md-block">
            <h5 class="text-light">流行總會被取代，經典會永久流傳</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img v-if ="screenWidth > 800" class="d-block w-100"
          src="https://i.imgur.com/wHJruzA.jpg"  alt="Second slide">
          <div v-else-if="screenWidth <= 450" class="img-carousel-2 d-flex justify-content-center align-items-end">
            <h6 class="text-light">最新的技術，延續溫暖的好聲音</h6>
          </div>
          <div class="carousel-caption d-none d-md-block">
            <h5 class="text-light">最新的技術，延續溫暖的好聲音</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img v-if ="screenWidth > 800" class="d-block w-100"
          src="https://i.imgur.com/UpQOofq.jpg" alt="Third slide">
          <div v-else-if="screenWidth <= 450" class="img-carousel-3 d-flex justify-content-center align-items-end">
            <h6 class="text-light">無可取代的潮流，黑膠文化</h6>
          </div>
          <div class="carousel-caption d-none d-md-block">
            <h5 class="text-light">無可取代的潮流，黑膠文化</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img v-if ="screenWidth > 800" class="d-block w-100"
          src="https://i.imgur.com/X4ckhcO.jpg" alt="Third slide">
          <div v-else-if="screenWidth <= 450" class="img-carousel-4 d-flex justify-content-center align-items-end">
            <h6 class="text-light">無可取代的潮流，黑膠文化</h6>
          </div>
          <div class="carousel-caption d-none d-md-block">
            <h5 class="text-light">最新的編曲與經典的音質融合</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      screenWidth: 0
    }
  },
  created () {
    this.screenWidth = window.screen.width
  }
}

</script>
<style></style>
