<script setup>
import { onMounted, ref } from "vue";
import { init } from "../functions/function";
import Loading from "./components/Loading.vue";

const myCanvas = ref(null);

const isLoading = ref(true);
onMounted(() => {
  window.onload = () => {
    setTimeout(() => {
      isLoading.value = false;
      init(myCanvas.value);
    }, 2000);
  };
});
</script>

<template>
  <Loading text="threejs-underwater" v-show="isLoading" />
  <canvas ref="myCanvas" v-show="!isLoading"></canvas>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

canvas {
  background-image: linear-gradient(to top, #aa9966 0%, #5bbee5 100%);
}
</style>
