<template>
    <div id="container">
        <div id="overview-base"></div>
        <div id="calendar-base">
            <div id="calendar-years">
                <div class="triangle-left" @click="previousMonth"></div>
                <div class="year">{{ dateFormat(selectedMonth, 'MMMM YYYY') }}</div>
                <div class="triangle-right" @click="nextMonth"></div>
            </div>
            <div id="data">
              <div>Sarah Degreef</div>
              <div></div>
              <div>Vorig saldo: {{ previousBalance }}</div>
              <div>Nieuw saldo: {{ newBalance }}</div>
            </div>
            <div id="calendar-days">
              <!-- <div id="calendar-day-titles"> -->
                <div class="header-item">MAANDAG</div>
                <div class="header-item">DINSDAG</div>
                <div class="header-item">WOENSDAG</div>
                <div class="header-item">DONDERDAG</div>
                <div class="header-item">VRIJDAG</div>
                <div class="header-item">ZATERDAG</div>
                <div class="header-item">ZONDAG</div>
              <!-- </div> -->
              <!-- <div id="calendar-dates"> -->
                <CalendarDay
                  v-for="day in calendarDays"
                  :key="day.eventDay.date"
                  :isCurrentMonth="day.isCurrentMonth"
                  :eventDay="day.eventDay"
                />
                <!-- <div
                  v-for="cell in calendarDays"
                  :key="cell.date"
                  class="calendar-day"
                  :class="{ 'out-of-current-month': !cell.isCurrentMonth}"
                >
                  <div class="num-date">{{ dateFormat(cell.date, 'DD') }}</div>
                  <div class="day-agenda">
                    <ul>
                      <li v-for="event in cell.events">
                        {{ event }}
                      </li>
                    </ul>
                  </div>
                </div> -->
            </div>
        </div>
    </div>
    <!-- container -->
</template>

<script>
import CalendarDay from './CalendarDay.vue'
import { Day } from './Day.js';
import { Calendar } from './Calendar.js';

export default {
    name: 'Calendar',
    components: {
        CalendarDay
    },
    data() {
        return {
            selectedMonth: new Date(),
            calendar: new Calendar(),
        }
    },
    computed: {
        calendarDays() {
            return this.calendar.getCalendarViewOfMonth(this.selectedMonth).days;
        },
        previousBalance() {
          return 0
        },
        newBalance() {
          return (this.previousBalance*10 - this.calendar.getWorkingTimeOfMonth(this.selectedMonth)*10 + this.calendar.getWorkedTimeOfMonth(this.selectedMonth)*10)/10;
        },
        workingTime() {
            return this.calendar.getWorkingTimeOfMonth(this.selectedMonth);
        },
        workedTime () {
            return this.calendar.getWorkedTimeOfMonth(this.selectedMonth);
        }
    },
    watch: {
        calendar: {
            handler(newValue) {
                localStorage.setItem('calendar', JSON.stringify(this.calendar));
            },
            deep: true
        }
    },
    methods: {
        previousMonth() {
            this.selectedMonth
             = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() - 1)
        },
        nextMonth() {
            this.selectedMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1)
        }
    }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#overview-base {
  display: flex;
  width: 30%;
  background-color: #2ECC71;
}
#calendar-base {
  display: grid;
  width: 100%;
  background-color: white;
}
#calendar-years {
  display: grid;
  grid-template-columns: 30px auto 30px;
  width: calc(100% - 40px);
  text-align: center;
  margin: 40px 20px 20px 20px;
}
#calendar-months {
  display: grid;
  width: calc(100% - 40px);
  grid-template-columns: repeat(12, 1fr);
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  margin-left: 20px;
  border-bottom: 3px solid #E8E8E8;
} 
#data {
  display: grid;
  width: calc(100% - 40px);
  grid-template-columns: repeat(4, 1fr);
  margin-left: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
  border-top: 3px solid #E8E8E8;
  border-bottom: 3px solid #E8E8E8;
  padding: 20px 0px;
  font-weight: bolder;
}
#calendar-days {
  display: grid;
  width: calc(100% - 40px);
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  text-align: right;
  margin-left: 20px;
}
#calendar-days div.header-item {
  text-align: center;
}
#calendar-days div.calendar-day {
  display: grid;
  text-align: center;
  border: 1px solid #E8E8E8;
  padding: 5px;
}
#calendar-days div.calendar-day div.num-date {
  text-align: right;
}
#calendar-days div.calendar-day div.day-agenda {
  text-align: left;
  padding: 10px 0px 10px 10px;
  font-size: 13px;
  color: #333;
}

.out-of-current-month {
  color: #AAAAB1;
}

.year {
  color: #E8E8E8;
  font-size: 30px;
  font-weight: bold;
}

.triangle-left {
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-right: 30px solid #E8E8E8;
  border-bottom: 15px solid transparent;
}

.triangle-right {
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-left: 30px solid #E8E8E8;
  border-bottom: 15px solid transparent;
}
.triangle-left:hover{
  border-right: 30px solid#2ECC71;
}
.triangle-right:hover{
  border-left: 30px solid#2ECC71;
}

.highlight {
  color: #27AE60;
}
.month-hover:hover{
  color:#27e879 !important;
}

.months {
    color: #AAAAAA;
    display: flex;
    justify-content: space-between;
}


.calendar-left {
  width: 300px;
  height: 500px;
  border-radius: 20px 0px 0px 20px;
  background-color: #2ECC71;
  position: relative;
  z-index: -1;
  bottom: 500px;
  color: white;
}

.hamburger {
  position: relative;
  top: 25px;
  left: 25px;
}

.burger-line:hover, .hamburger:hover{
  background-color:#27e879 !important;
}

.burger-line {
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 15%;
  margin-bottom: 3px;
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