import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.scss';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons/faUserCircle';

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router);
library.add(faUserCircle);

app.mount('#app')
