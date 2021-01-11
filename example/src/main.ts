import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import { createRouter, createWebHistory } from 'vue-router'
import routes from 'voie-pages'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')

// @ts-ignore
import('vite-plugin-editor-nav/client').then(i => i.default(router, routes))
