import { createApp } from 'vue'
import App from './App.vue'
import moment from 'moment'

const app = createApp(App)

// global date formatting helper (similar to Vue 2 filter)
app.config.globalProperties.dateFormat = (value, format = 'YYYY-MM-DD') => {
  if (!value) return ''
  return moment(value).format(format)
}

app.mount('#app')
