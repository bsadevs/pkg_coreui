import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-blue/theme.css'; // [TODO] Evaluate replace with primevue.min.css
//import 'primevue/resources/primevue.min.css';
//import 'primeicons/primeicons.css'; // [TODO] It's working without it. Docs say it's necessary for table ordering.

import './style.css';

const app = createApp(App);

app.use(PrimeVue);

app.mount('#app');
