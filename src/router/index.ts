import { useAppStore } from '@/store/app';
import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/appSlideInit.vue')
  },
  {
    name: "slide",
    path: '/slide',
    component: () => import('@/views/appSlideInit.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/appSlideInit.vue')
  }
]

const router = createRouter({
  //process.env.BASE_URL
  history: createWebHashHistory(),
  routes
})


export default router
