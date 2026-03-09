<template>
  <div class="calendar-day" :class="{ 'out-of-current-month': !isCurrentMonth }">
    <div class="num-date">{{ dateFormat(date, 'DD') }}</div>
    <div class="day-agenda">
        <ul>
            <li v-for="event in events">
            {{ event }}
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarDay',
  props: {
    date: {
      type: Date,
      required: true
    },
    isCurrentMonth: {
      type: Boolean,
      required: true
    },
    events: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
</style>