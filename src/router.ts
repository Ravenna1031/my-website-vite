import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Gallery from './views/Gallery.vue'
import Projects from './views/Projects.vue'
import { RouterMap } from './constant'

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
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: { title: 'Projects - Ray Gu' },
      children: [
        {
          path: '/projects/01',
          component: RouterMap['01'],
        },
      ],
    },
  ],
})

export default router
