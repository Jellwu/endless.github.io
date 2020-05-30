<template>
    <div class="gif-player">
      <div class="source">
        <img v-if="isGif" v-bind:src="src" autoplay="false">
        <video v-if="isVideo" v-bind:loop="loop != null" v-on:mouseover="play()" v-on:mouseout="pause()">
          <source v-bind:src="src">
        </video>
      </div>
      <div class="progress" v-if="isVideo" v-bind:style="{ width: progress * 100 + '%'}"></div>
      <div class="controls" v-if="isVideo && controls != null">
        <div class="statistics">
          <p>{{currentTime}} / {{durationTime}}</p>
        </div>
        <button class="play" v-on:click="play">Play</button>
        <button class="pause" v-on:click="pause">Pause</button>
        <button class="reset" v-on:click="reset">Reset</button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style>
.clear {
  zoom: 1;
}
.clear:before,
.clear:after {
  content: "";
  display: table;
}
.clear:after {
  clear: both;
}
.gif-player {
  display: inline-block;
  float: left;
}
.progress {
  height: 5px;
  background-color: #008000;
}
</style>
