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