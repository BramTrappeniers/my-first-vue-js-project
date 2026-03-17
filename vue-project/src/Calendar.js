/**
 * 
 */
import { Day } from './Day.js';

export class Calendar {
    
    /**
     * Creates a new Calandar instance.
     */
    constructor() {
        if (localStorage.getItem('calendar')) {
            this.calendar = {};
            for (const [key, value] of Object.entries(JSON.parse(localStorage.getItem('calendar')).calendar)) {
                this.calendar[key] = {};
                for (const [key2, value2] of Object.entries(value)) {   
                    const days = [];
                    for (const [key3, value3] of Object.entries(value2)) {
                        days.push({ eventDay: new Day(new Date(value3.eventDay.date), value3.eventDay.events), isCurrentMonth: value3.isCurrentMonth, isToday: value3.isToday });
                    }
                    this.calendar[key][key2] = days;
                }
            }
        } else {
            this.calendar = {};
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
            this.calendar[date.getFullYear().toString()][date.getMonth().toString()] = this.getMonthDays(date);
        }        
        return this.calendar[date.getFullYear().toString()][date.getMonth().toString()];
    }

    /**
     * @param {Date} date
     */
    getMonthDays(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfMonth = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
        const endingDayOfMonth = lastDay.getDay() === 0 ? 6 : lastDay.getDay() - 1

        const days = []
        const today = new Date()

        // Previous month days
        for (let i = startingDayOfMonth - 1; i >= 0; i--) {
            const day = new Day(new Date(year, month, 0 - i), []);
            days.push({ eventDay: day, isCurrentMonth: false, isToday: false })
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            const day = new Day(new Date(year, month, i), []);
            days.push({ eventDay: day, isCurrentMonth: true, isToday })
        }

        // Next month days
        const remainingDays = 6 - endingDayOfMonth
        for (let i = 1; i <= remainingDays; i++) {
            const day = new Day(new Date(year, month + 1, i), []);
            days.push({ eventDay: day, isCurrentMonth: false, isToday: false })
        }
        
        return days
    }

}