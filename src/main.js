import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import directives from './directives';

const app = createApp(App);

app.use(createPinia());
app.use(router);

directives(app);

app.mount('#app');
