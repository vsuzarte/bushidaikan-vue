import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router'
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import '@/assets/css/main.css';


createApp(App).use(Quasar, quasarUserOptions).use(router).use(createPinia()).mount('#app')
