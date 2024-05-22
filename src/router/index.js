import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: () => import('../views/RegistrationView.vue')
    },
    {
      path: '/production',
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
    },
    {
      path: '/rankings',
      name: 'rankings',
      component: () => import('../views/RankingsView.vue')
    }
  ]
})

let whiteList = ['register']

router.beforeEach((to, from, next) => {
  const gameStore = useGameStore()
  if (whiteList.includes(to.name)) {
    next()
  } else if (gameStore.isGameStarted) {
    next()
  } else {
    next({ name: 'register' })
  }
})

export default router
