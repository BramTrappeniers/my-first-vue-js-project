<script setup>
import './reset.css';
import SevenByFiveGrid from './SevenByFiveGrid.vue';
</script>

<template>
  <div class="full-wrapper">
    <SevenByFiveGrid />
  </div>
</template>

<style scoped>
.full-wrapper {
  background-color: cyan;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100svh;
}
p {
  text-align: center;
  background-color: cyan
}
</style>