/**
 * Represents a day with a date and a list of events.
 */
export class Day {
    /**
     * Creates a new Day instance.
     * @param {Date} date - The date for this day.
     * @param {Array} events - The list of events for this day. Defaults to an empty array.
     */
    constructor(date, events = []) {
        this.date = date;
        this.events = events;
    }

    getWorkingTime() {
        switch (this.date.getDay()) {
            case 1: // Monday
                return 8;
            case 2: // Tuesday
                return 4;
            case 3: // Wednesday
                return 4;
            case 4: // Thursday
                return 4;
            case 5: // Friday
                return 4;
        }
        return 0;
    }

    isLastDayOfMonth() {
        return new Date(this.date.getTime()+ 86400000).getDate() === 1;
    }

    hasEvent(event) {
        return this.events.indexOf(event) !== -1;
    }

    getWorkedTime() {
        if (this.hasEvent('Werkdag')) {
            switch (this.date.getDay()) {
                case 0: // Sunday
                    return this.isLastDayOfMonth() ? 4 : 13.1;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5: // Monday to Friday
                    return this.isLastDayOfMonth() ? 2.6 : 11.7;
                case 6: // Saturday
                    return this.isLastDayOfMonth() ? 2.6 : 16.6;
            }
        }
        return 0;
    }

    getWorkedTimeLastDayPreviousMonth() {
        if (this.hasEvent('Werkdag')) {
            switch (this.date.getDay()) {
                case 0: 
                case 1:
                case 2:
                case 3:
                case 4:
                case 5: // Sunday to Friday
                    return 9.1;
                case 6: // Saturday
                    return 14;
            }
        }
        return 0;
    }

    /**
     * Adds an event to the day's event list.
     * @param {string} event - The event to add.
     */
    addEvent(event) {
        this.events.push(event);
    }

    /**
     * Removes an event from the day's event list.
     * @param {string} event - The event to remove.
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
}