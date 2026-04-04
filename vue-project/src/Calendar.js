/**
 * 
 */
import { Day } from './Day.js';

export class Calendar {
    
    /**
     * Creates a new Calandar instance.
     */
    constructor() {
        this.calendar = {};
        if (localStorage.getItem('calendar')) {
            for (const [key, value] of Object.entries(JSON.parse(localStorage.getItem('calendar')).calendar)) {
                this.calendar[key] = {};
                for (const [key2, value2] of Object.entries(value)) {   
                    const days = [];
                    for (const [key3, value3] of Object.entries(value2)) {
                        days.push(new Day(new Date(value3.date), value3.events));
                    }
                    this.calendar[key][key2] = days;
                }
            }
        }
    }

    /**
     * Adds an event to the day's event list.
     * @param {Date} date - The event to add.
     */
    getCalendarDaysOfMonth(date) {
        if (typeof this.calendar[date.getFullYear().toString()] === 'undefined') {
            this.calendar[date.getFullYear().toString()] = {};
        }
        if (typeof this.calendar[date.getFullYear().toString()][date.getMonth().toString()] === 'undefined') {
            this.calendar[date.getFullYear().toString()][date.getMonth().toString()] = this.getMonthView(date);
        }        
        return this.calendar[date.getFullYear().toString()][date.getMonth().toString()].days;
    }

    getDaysOfMonth(date) {
        if (typeof this.calendar[date.getFullYear().toString()] === 'undefined') {
            this.calendar[date.getFullYear().toString()] = {};
        }
        if (typeof this.calendar[date.getFullYear().toString()][date.getMonth().toString()] === 'undefined') {
            this.calendar[date.getFullYear().toString()][date.getMonth().toString()] = this.getMonthDays(date);
        }        
        return this.calendar[date.getFullYear().toString()][date.getMonth().toString()];
    }

    getCalendarViewOfMonth(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfMonth = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
        const endingDayOfMonth = lastDay.getDay() === 0 ? 6 : lastDay.getDay() - 1

        let days = []
        const today = new Date()

        // Previous month days
        const daysPreviousMonth = this.getDaysOfMonth(new Date(year, month, 0));
        for (let i = startingDayOfMonth - 1; i >= 0; i--) {
            days.push({ eventDay: daysPreviousMonth[daysPreviousMonth.length - i - 1], isCurrentMonth: false, isToday: false })
        }
        
        // Current month days
        const daysCurrentMonth = this.getDaysOfMonth(date);
        days.push(...daysCurrentMonth.map(day => ({ eventDay: day, isCurrentMonth: true, isToday: false })))

        // Next month days
        const remainingDays = 6 - endingDayOfMonth
        const daysNextMonth = this.getDaysOfMonth(new Date(year, month + 1, 1));
        for (let i = 1; i <= remainingDays; i++) {
            days.push({ eventDay: daysNextMonth[i - 1], isCurrentMonth: false, isToday: false })
        }
        
        return {
            days: days,
            workingTime: 0,
        };
    }

    /**
     * @param {Date} date
     */
    getMonthDays(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        // Current month days
        let days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Day(new Date(year, month, i), []));
        }
        return days;
    }

    getWorkingTimeOfMonth(date) {
        const monthDays = this.getDaysOfMonth(date);
        return monthDays.reduce((total, day) => total + day.getWorkingTime()*10, 0)/10;
    }

    getWorkedTimeOfMonth(date) {
        const monthDays = this.getDaysOfMonth(date);
        const previousMonthDays = this.getDaysOfMonth(new Date(date.getFullYear(), date.getMonth(), 0));
        return previousMonthDays[previousMonthDays.length - 1].getWorkedTimeLastDayPreviousMonth() + monthDays.reduce((total, day) => total + day.getWorkedTime()*10, 0)/10;
    }

}