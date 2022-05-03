import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Gallery from './views/Gallery.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Ray Gu' },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery,
      meta: { title: 'Gallery - Ray Gu' },

    },
  ],
})

export default router
