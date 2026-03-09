import { createApp } from 'vue'
import App from './App.vue'
import moment from 'moment'
import 'moment/dist/locale/nl-be' // Import the Dutch (Belgium) locale

const app = createApp(App)

// global date formatting helper (similar to Vue 2 filter)
app.config.globalProperties.dateFormat = (value, format = 'YYYY-MM-DD') => {
  if (!value) return ''
  return moment(value).locale('nl-be').format(format)
}

app.mount('#app')
