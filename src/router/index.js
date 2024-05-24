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
      path: '/main-menu',
      name: 'main-menu',
      component: () => import('../views/MainMenuView.vue')
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

let whiteList = ['register', 'rankings']

router.beforeEach((to, from, next) => {
  const gameStore = useGameStore()
  if (whiteList.includes(to.name)) {
    gameStore.isGameStarted = false
    next()
  } else if (gameStore.playerRegistered) {
    if (gameStore.isGameStarted && to.name != 'main-menu') next()
    else if (gameStore.isGameStarted && to.name == 'main-menu') next({ name: from.name })
    else if (!gameStore.isGameStarted && to.name == 'main-menu') next()
    else next({ name: 'main-menu' })
  } else {
    next({ name: from.name })
  }
})

export default router
