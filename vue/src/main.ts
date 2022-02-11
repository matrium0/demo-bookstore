import './assets/global.scss';
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons/faUserCircle';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

library.add(faUserCircle);
library.add(faFilter);

app.mount('#app')