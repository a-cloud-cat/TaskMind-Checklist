<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function entertest(){
  router.push('/next')
}

</script>

<template>
  <div class="background_z0">
    <div class="background_z1">
      <p class="welcome_font">Assist you in <br>perfecting the plan</p>
    </div>
  </div>

  <div class="Welcome_Box_z2"></div>
  <div class="welcome_box_z3">
    <img src="../assets/welcome_image.png" alt="宣传封面" class="box_z3-img">
  </div>

  <div class="Navigation_bar_z4"></div>
  <button class="Enter_button" @click="entertest">立即体验</button>
</template>

<style scoped>
  .background_z0{
    position: fixed;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
    border-radius: 1.5rem;
  }
 .background_z1{
   overflow: hidden;
   z-index: 1;
   position: relative;
   background-color: #1a1a1a;
   border-radius: 2rem;
   width: 98vw;
   height: 96vh;
   margin-left: 1vw;
   margin-top: 2vh;
 }
 .welcome_font{
   overflow: hidden;
   z-index: 2;
   color: #f9f9f9;
   font-size: 6vb;
   margin-top: 40vh;
   margin-left: 10vw;
 }
 .Welcome_Box_z2{
   position: absolute;
   z-index: 2;
   background: #f9f9f9;
   width: 30vw;
   height: 45vh;
   margin-left: 60vw;
   margin-top: 20vh;
 }

.welcome_box_z3{
  position: absolute;
  z-index: 3;
  background: transparent;
  width: 25vw;
  height: 50vh;
  margin-left: 70vw;
  margin-top: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box_z3-img {
  width: 100%;
  height: 80%;
  object-fit: fill;
}

.Navigation_bar_z4{
  position: absolute;
  z-index: 4;
  background: #333333;
  border-radius: 1rem 1rem 0 0;
  width: 98vw;
  height: 10vh;
  margin-top: 2vh;
  margin-left: 1vw;
}
.Enter_button{
  position: absolute;
  z-index: 3;
  width: 10vw;
  height: 8vh;
  background: #fc00ff;
  margin-top: 65vh;
  margin-left: 35vw;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
}
</style>