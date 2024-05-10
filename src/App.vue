<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import '@/main.css'

const gameStore = useGameStore()

const dailycosts = 50

const gameLoop = setInterval(() => {
  gameStore.workDay
  gameStore.decreaseBudget(dailycosts)
  if (gameStore.budget <= 0) {
    gameOver()
  }
}, 1000)

const salaries = setInterval(() => {
  gameStore.decreaseBudget(gameStore.totalSalaries)
  dailycosts += dailycosts
}, 30000)

const gameOver = () => {
  clearInterval(gameLoop)
  clearInterval(salaries)
  alert('Game Over')
  window.location.reload()
}
</script>

<template>
  <RouterView />
  <nav>
    <RouterLink class="router-link" to="/"
      ><img src="../src/assets/programming.png" alt="Production"
    /></RouterLink>
    <RouterLink class="router-link" to="/sales"
      ><img src="../src/assets/sales.png" alt="Production"
    /></RouterLink>
    <RouterLink class="router-link" to="/human-resources"
      ><img src="../src/assets/approved.png" alt="Production"
    /></RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  position: fixed;
  bottom: 0;
  height: 10vh;
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 1rem;
}

img {
  width: 2rem;
}

.router-link {
  text-decoration: none;
  color: black;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 1rem;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.router-link:hover {
  background-color: lightgrey;
}
</style>
