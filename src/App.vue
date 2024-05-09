<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

setInterval(() => {
  gameStore.decreaseBudget(100 + gameStore.totalSalaries)
}, 1000)
</script>

<template>
  <RouterView />
  <nav>
    <RouterLink to="/">Production</RouterLink>
    <RouterLink to="/sales">Sales</RouterLink>
    <RouterLink to="/human-resources">HR</RouterLink>
  </nav>
</template>
