<template>
  <!-- Modal overlay -->
  <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
    <div class="modal">
      <div class="event-left">
        <div class="day">{{ dateFormat(selectedCell.date, 'dddd') }}</div>
        <div class="num-date">{{ dateFormat(selectedCell.date, 'DD') }}</div>
        <div class="day">{{ dateFormat(selectedCell.date, 'MMMM') }}</div>
      </div>
      <div class="event-right">
        <div class="event-types">
          <div v-for="type in workTypes" :key="type.name" @click="selectType(type)" :class="{ 'active': selectedCell.hasEvent(type.name) }">
            {{ type.name }}
          </div>
        </div>
        <div class="modal-actions">
          <button type="button" @click="handleClose">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Day } from './Day.js';

export default {
  name: "CellModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    selectedCell: {
      type: Day,
      default: null
    }
  },
  data() {
    const workTypes = [
      {'name': 'Werkdag'},
      {'name': 'Vakantie'},
      {'name': 'Opleiding'},
      {'name': 'Vergadering'}
    ];

    return {
      workType: '',
      workLocation: '',
      form: {
        title: '',
        description: ''
      },
      workTypes: workTypes,
    };
  },
  methods: {
    selectType(type) {
      !this.selectedCell.hasEvent(type.name) ? this.selectedCell.addEvent(type.name) : this.selectedCell.removeEvent(type.name);
    },
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

body {
  width: 50%;
  margin: 100px auto;
  background-color: lightgray;
  font-family: 'Kanit', sans-serif;
}

.modal {
  width: 900px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  position: relative;
  z-index: -1;
  color: black;
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.event-left {
  width: 300px;
  height: 500px;
  border-radius: 20px 0px 0px 20px;
  background-color: #2ECC71;
  z-index: -1;
  color: white;
  text-align: center;
  padding-top: 50px;
}

.num-date {
  font-size: 150px;
  font-weight: 700;
}

.day {
  font-size: 30px;
  bottom: 60px;
}

.event-types {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 25px;
  margin-left: 25px;
  column-gap: 10px;
}
.event-types div {
  padding: 10px;
  border: solid #E8E8E8 1px;
  border-radius: 5px;
  text-align: center;
}
.event-types div.active {
  background-color: #2ECC71;
  color: white;
  border-color: #2ECC71;
}

.current-events {
  font-size: 15px;
  position: relative;
  margin-left: 25px;
  bottom: 30px;
}

.posts {
  text-decoration: underline dotted;
}
.posts:hover{
  color:#27e879 !important;
}

.create-event {
  font-size: 18px;
  position: relative;
  margin-top: 30px;
  margin-left: 25px;
}

.event-line {
  width: 90%;
}

.add-event {
  width: 20px;
  height: 20px;
  padding: 0px;
  border-radius: 50%;
  border: solid white 2px;
  position: relative;
  bottom: 42px;
  left: 260px;
}

.add {
  font-size: 25px;
  position: relative;
  left: 4px;
  bottom: 10px;
}

.add:hover, .create-event:hover, .add-event:hover{
  color:#27e879 !important;
  border-color: #27e879 !important;
}
</style>
