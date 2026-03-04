<template>
  <div class="grid-container">
    <div
      v-for="cell in calendar"
      :key="cell"
      class="grid-cell"
      @click="openModal(cell.date)"
    >
      {{ dateFormat(cell.date, 'DD') }}
      {{ !cell.isCurrentMonth ? '*' : '' }}
      <!-- Cell content can go here -->
    </div>
  </div>

  <CellModal
    :isOpen="showModal"
    :selectedCell="selectedCell"
    @close="closeModal"
    @submit="submitForm"
  />
</template>

<script>
import CellModal from './CellModal.vue';

export default {
  name: "SevenByFiveGrid",
  components: {
    CellModal
  },
  data() {
    const month = new Date(2026, 2, 1);
    const firstDayOfWeek = month.getDay() === 0 ? 7 : month.getDay() - 1;
    
    const calendar = Array(42).fill(null).map((_, index) => {
      var dayNumber = index - firstDayOfWeek + 2;
      return {
        date: new Date(month.getFullYear(), month.getMonth(), dayNumber),
        isCurrentMonth: dayNumber > 0 && dayNumber <= new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
      };
    });

    return {
      showModal: false,
      selectedCell: null,
      calendar: calendar, 
    };
  },
  methods: {
    openModal(cell) {
      this.selectedCell = cell;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    submitForm(formData) {
      // handle form submission, e.g. emit event or save data
      console.log('Form data', formData);
      this.closeModal();
    }
  }
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
  cursor: pointer;
}
</style>
