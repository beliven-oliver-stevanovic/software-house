import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'production',
      component: () => import('../views/ProductionView.vue')
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('../views/SalesView.vue')
    },
    {
      path: '/human-resources',
      name: 'human-resources',
      component: () => import('../views/HumanResourcesView.vue')
    }
  ]
})

export default router
