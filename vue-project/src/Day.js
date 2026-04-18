/**
 * Represents a day with a date and a list of events.
 */
export class Day {
    /**
     * Creates a new Day instance.
     * @param {Date} date - The date for this day.
     * @param {Array} events - The list of events for this day. Defaults to an empty array.
     * @param {boolean} isHoliday - Whether the day is a holiday. Defaults to false.
     */
    constructor(date, events = [], isHoliday = false) {
        this.date = date;
        this.events = events;
        this.isHoliday = isHoliday
    }

    getWorkingTime() {
        switch (this.date.getDay()) {
            case 1: // Monday
                return this.isHoliday ? 2.4 : 8;
            case 2: // Tuesday
                return this.isHoliday ? -1.6 : 4;
            case 3: // Wednesday
                return this.isHoliday ? -1.6 : 4;
            case 4: // Thursday
                return this.isHoliday ? -1.6 : 4;
            case 5: // Friday
                return this.isHoliday ? 2.4 : 8;
        }
        return 0;
    }

    isLastDayOfMonth() {
        return new Date(this.date.getTime()+ 86400000).getDate() === 1;
    }

    hasEvent(eventName) {
        return this.events.some(event => event.name === eventName);
    }

    getWorkedTime(previousDay) {
        let totalWorkedTime = 0;
        if (previousDay && previousDay.hasEvent('Werkdag')) {
            if (this.date.getDay() === 0 || this.isHoliday) { // Sunday
                totalWorkedTime = this.hasEvent('Werkdag') ? 18 : 14;
            } else { // Monday to Saturday
                totalWorkedTime = this.hasEvent('Werkdag') ? 11.7 : 9.1;
            }
        } else {
            if (this.date.getDay() === 0 || this.isHoliday) { // Sunday
                totalWorkedTime = this.hasEvent('Werkdag') ? 4 : 0;
            } else { // Monday to Saturday
                totalWorkedTime = this.hasEvent('Werkdag') ? 2.6 : 0;
            }
        }
        if (this.hasEvent('Opleiding')) {
            totalWorkedTime += this.events.find(event => event.name === 'Opleiding').hours;
        }
        if (this.hasEvent('Vergadering')) {
            totalWorkedTime += this.events.find(event => event.name === 'Vergadering').hours;
        }
        if (this.hasEvent('Vakantie')) {
            totalWorkedTime += this.events.find(event => event.name === 'Vakantie').hours;
        }
        return totalWorkedTime;
    }

    /**
     * Adds an event to the day's event list.
     * @param {WorkEvent} event - The event to add.
     */
    addEvent(event) {
        this.events.push(event);
    }

    /**
     * Removes an event from the day's event list.
     * @param {WorkEvent} event - The event to remove.
     */
    removeEvent(event) {
        const index = this.events.indexOf(event);
        if (index > -1) {
            this.events.splice(index, 1);
        }
    }

    /**
     * Gets the number of events for this day.
     * @returns {number} The number of events.
     */
    getEventCount() {
        return this.events.length;
    }

    setHoliday(isHoliday) {
        this.isHoliday = isHoliday;
    }
}