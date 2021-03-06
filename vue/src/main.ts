import 'quasar/src/css/index.sass'
import './assets/global.scss';
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons/faUserCircle';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';
import {Quasar} from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faMars} from '@fortawesome/free-solid-svg-icons/faMars';
import {faVenus} from '@fortawesome/free-solid-svg-icons/faVenus';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faTransgenderAlt} from '@fortawesome/free-solid-svg-icons/faTransgenderAlt';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {faBookReader} from '@fortawesome/free-solid-svg-icons/faBookReader';

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

library.add(faUserCircle);
library.add(faFilter);
library.add(faCheck);
library.add(faMars);
library.add(faVenus);
library.add(faTransgenderAlt);
library.add(faSpinner);
library.add(faTimes);
library.add(faBookmark);
library.add(faBookReader);
library.add(faTimes);

app.mount('#app')
