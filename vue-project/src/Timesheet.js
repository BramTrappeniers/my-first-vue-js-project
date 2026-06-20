export class Timesheet {

    constructor() {
        // this.timeSheet = {
        //     2026: {
        //         1: 68.35,
        //         2: 70.95,
        //         3: 72.15,
        //     }
        // };
        if (localStorage.getItem('settings')) {
            this.timeSheet = JSON.parse(localStorage.getItem('settings')).settings;
        }
    }

    getTimeSheet(date) {
        return this.timeSheet[date.getFullYear()] ? this.timeSheet[date.getFullYear()][date.getMonth()] ? this.timeSheet[date.getFullYear()][date.getMonth()] : 0 : 0;
    }

    setTimeSheet(date, value) {
        if (!this.timeSheet[date.getFullYear()]) {
            this.timeSheet[date.getFullYear()] = {};
        }
        this.timeSheet[date.getFullYear()][date.getMonth()] = value;
        localStorage.setItem('settings', JSON.stringify({ settings: this.timeSheet }));
    }
}