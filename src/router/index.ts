import { createRouter, createWebHistory } from 'vue-router'
import BalanceView from '../views/BalanceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BalanceView
    },
    {
      path: '/:retailUnit/:period(\\d{4}-\\d{2})',
      component: BalanceView,
      props: true
    },
    {
      path: '/:retailUnit/:period/:businessUnit',
      component: BalanceView,
      props: true
    }
  ]
})

export default router
