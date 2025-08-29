import { createApp } from 'vue'
import './assets/styles/tailwind.css' 
import App from './App.vue'
import router from './router'

// import { QuillEditor } from 'vue3-quill';

// // Import Quill styles
// import 'quill/dist/quill.snow.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
