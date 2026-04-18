export class Timesheet {

    constructor() {
        this.timeSheet = {
            2026: {
                2: 70.95
            }
        };
        // if (localStorage.getItem('settings')) {
        //     this.settings = JSON.parse(localStorage.getItem('settings')).settings;
        // }
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