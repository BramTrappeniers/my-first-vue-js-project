<template>
    <div class="calendar-day" :class="{ 'out-of-current-month': !isCurrentMonth }" @click="isCurrentMonth && openModal()">
        <div class="num-date">{{ dateFormat(eventDay.date, 'DD') }}</div>
        <div class="day-agenda">
            <ul>
                <template v-if="eventDay.events.length === 0">
                    <li>&nbsp;</li>
                    <li>&nbsp;</li>
                </template>
                <template v-else-if="eventDay.events.length === 1">
                    <li>{{ eventDay.events[0].name }} ({{ eventDay.events[0].hours > 0 ? eventDay.events[0].hours + 'u' : '' }})</li>
                    <li>&nbsp;</li>
                </template>
                <template v-else-if="eventDay.events.length === 2">
                    <li>{{ eventDay.events[0].name }} ({{ eventDay.events[0].hours > 0 ? eventDay.events[0].hours + 'u' : '' }})</li>
                    <li>{{ eventDay.events[1].name }} ({{ eventDay.events[1].hours > 0 ? eventDay.events[1].hours + 'u' : '' }})</li>
                </template>
                <template v-else>
                    <li>{{ eventDay.events[0].name }} ({{ eventDay.events[0].hours > 0 ? eventDay.events[0].hours + 'u' : '' }})</li>
                    <li>En anderen ...</li>
                </template>
            </ul>
        </div>
    </div>

    <CellModal :isOpen="showModal" :selectedCell="selectedCell" @close="closeModal" @submit="submitForm" />
</template>

<script>
import CellModal from './CellModal.vue';
import { Day } from './Day';

export default {
    name: 'CalendarDay',
    components: {
        CellModal
    },
    props: {
        isCurrentMonth: {
            type: Boolean,
            required: true
        },
        eventDay: {
            type: Day,
            default: () => []
        }
    },
    data() {
        return {
            showModal: false,
            selectedCell: null
        };
    },
    methods: {
        openModal() {
            this.selectedCell = this.eventDay;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        submitForm(formData) {
            // handle form submission, e.g. emit event or save data
            console.log('Form data', formData);
            this.closeModal();
        }
    }
}
</script>

<style scoped></style>