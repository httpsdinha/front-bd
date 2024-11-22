import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import router from './router/router'

// eslint-disable-next-line no-undef
const vuetify = createVuetify()

createApp(App).use(router).use(vuetify).mount('#app')
