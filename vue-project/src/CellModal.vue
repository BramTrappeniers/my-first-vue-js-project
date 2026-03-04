<template>
  <!-- Modal overlay -->
  <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
    <div class="modal">
      <h2>Cell {{ selectedCell }} details</h2>
      <form @submit.prevent="handleSubmit">
        <div>Type:</div>
        <input type="radio" id="free" name="work_type" value="free" v-model="workType" /><label for="free">Vrij</label>
        <input type="radio" id="working" name="work_type" value="working" v-model="workType" /><label for="working">Werkdag</label>
        <div>Klant:</div>
        <input v-model="workLocation" type="text" />
        <label>
          Van/Tot:
        </label>
        <div class="modal-actions">
          <button type="button" @click="handleClose">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CellModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    selectedCell: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      workType: '',
      workLocation: '',
      form: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleSubmit() {
      // Emit submit event with form data
      this.$emit('submit', {
        selectedCell: this.selectedCell,
        workType: this.workType,
        workLocation: this.workLocation,
        form: this.form
      });
    }
  }
};
</script>

<style scoped>
/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.modal-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
