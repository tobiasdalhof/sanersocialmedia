import '@fontsource/readex-pro/200.css'
import '@fontsource/readex-pro/400.css'
import '@fontsource/readex-pro/500.css'
import '@fontsource/readex-pro/600.css'
import 'virtual:windi.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import * as views from './views'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: views.Sites },
    { path: '/quotes', component: views.Quotes },
    { path: '/about', component: views.About },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
