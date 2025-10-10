<template>
  <div class="grid-container">
    <div
      v-for="cell in 35"
      :key="cell"
      class="grid-cell"
    >a
      <!-- Cell content can go here -->
    </div>
  </div>
</template>

<script>
export default {
  name: "SevenByFiveGrid",
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
}
.grid-cell {
  background: #e0e0e0;
  border-radius: 4px;
  /* Remove min-height so cells shrink */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  height: 100%;
}
</style>
