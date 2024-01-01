import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/navigation.css'
import 'swiper/css'
import 'swiper/css/navigation'
import router from '@/router/index.js'
import { VueQueryPlugin } from '@tanstack/vue-query'
const app = createApp(App)

app.use(router).use(VueQueryPlugin)

app.mount('#app')
