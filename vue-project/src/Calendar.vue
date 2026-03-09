<template>
    <div id="container">
        <div id="overview-base"></div>
        <div id="calendar-base">
            <div id="calendar-years">
                <div class="triangle-left" @click="previousMonth"></div>
                <div class="year">{{ dateFormat(selectedMonth, 'MMMM YYYY') }}</div>
                <div class="triangle-right" @click="nextMonth"></div>
            </div>
            <!-- <div id="calendar-months">
                <div>Jan</div>
                <div>Feb</div>
                <div class="highlight">Maa</div>
                <div>Apr</div>
                <div>Mei</div>
                <div>Jun</div>
                <div>Jul</div>
                <div>Aug</div>
                <div>Sep</div>
                <div>Oct</div>
                <div>Nov</div>
                <div>Dec</div>
            </div> -->
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
                  :key="day.date"
                  :date="day.date"
                  :isCurrentMonth="day.isCurrentMonth"
                  :events="day.events"
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

export default {
    name: 'Calendar',
    components: {
        CalendarDay
    },
    data() {
        return {
            selectedMonth: new Date(),
        }
    },
    computed: {
        calendarDays() {
            const year = this.selectedMonth.getFullYear()
            const month = this.selectedMonth.getMonth()
            const firstDay = new Date(year, month, 1)
            const lastDay = new Date(year, month + 1, 0)
            const daysInMonth = lastDay.getDate()
            const startingDayOfMonth = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
            const endingDayOfMonth = lastDay.getDay() === 0 ? 6 : lastDay.getDay() - 1

            const days = []
            const today = new Date()

            // Previous month days
            for (let i = startingDayOfMonth - 1; i >= 0; i--) {
                days.push({ date: new Date(year, month, 0 - i), isCurrentMonth: false, isToday: false, events: [] })
            }

            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                days.push({ date: new Date(year, month, i), isCurrentMonth: true, isToday, events: ['Event 1', 'Event 2'] })
            }

            // Next month days
            const remainingDays = 6 - endingDayOfMonth
            for (let i = 1; i <= remainingDays; i++) {
                days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false, isToday: false, events: [] })
            }
            
            return days
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
#container {

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
  margin: 20px 20px 50px 20px;
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

.day {
  width: 50%;
  margin: 0px auto;
  font-size: 30px;
  position: relative;
  bottom: 60px;
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