<template>
  <div id="app">
    <croppa v-model="myCroppa" canvas-color="transparent"></croppa>
  <br>
  <button @click="generateImage">Generate</button>
  <button @click="flipXImage">Flip X</button>
  <button @click="flipYImage">Flip Y</button>
  <button @click="rotateClockwiseImage">Rotate Clockwise</button>
  <button @click="rotateCounterClockwiseImage">Rotate Clockwise</button>
  <br>
  <img data-caman="saturation(-10) brightness(20)" class="output" :src="imgUrl" >
  </div>
</template>

<script>


export default {
  name: "app",
  data(){
    return{
      
    myCroppa: null,
    imgUrl: ''
    }
  },
  methods: {
  	generateImage: function() {
    	let url = this.myCroppa.generateDataUrl()
      if (!url) {
      	alert('no image')
        return
      }
      this.imgUrl = url
    },
    flipXImage(){
      this.myCroppa.flipX();
    },
    flipYImage(){
      this.myCroppa.flipY();
    },
    rotateClockwiseImage(){
      this.myCroppa.rotate(1);
    },
    rotateCounterClockwiseImage(){
      this.myCroppa.rotate(-1);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
