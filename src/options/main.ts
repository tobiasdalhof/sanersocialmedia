import '@fontsource/readex-pro/200.css'
import '@fontsource/readex-pro/400.css'
import '@fontsource/readex-pro/500.css'
import '@fontsource/readex-pro/600.css'
import 'virtual:windi.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import Index from './views/Index.vue'
import Quotes from './views/Quotes.vue'
import About from './views/About.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/quotes', component: Quotes },
    { path: '/about', component: About },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
