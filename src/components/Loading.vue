<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <div>
    <div class="loading"></div>
    <h1>{{ props.text }}</h1>
  </div>
</template>

<style scoped>
.loading {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border: 3px solid #333;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

.loading::after {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: inherit;
  height: inherit;
  border: inherit;
  border-radius: inherit;
  transform: rotate(60deg);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
h1 {
  text-shadow: 0px 4px 10px black;
  white-space: nowrap;
  position: absolute;
  bottom: 2%;
  right: 2%;
}

@media screen and (min-width: 482px) {
  h1 {
    font-size: 3rem;
  }
}

@media screen and (max-width: 481px) {
  h1 {
    font-size: 1rem;
  }
}
</style>
