<script setup>
import { RouterView } from 'vue-router'
import '@/main.css'
import { useGameStore } from '@/stores/gameStore'
import { useRouter } from 'vue-router'
import { config } from '@/config.js'

const gameStore = useGameStore()

const router = useRouter()

let dailyCost = config.dailyCost

setInterval(async () => {
  console.log('started:', gameStore.isGameStarted)
  if (gameStore.isGameStarted) {
    gameStore.decreaseBudget(dailyCost)
    gameStore.workDay()
    if (gameStore.budget <= 0) {
      await gameOver()
    }
  }
}, config.gameLoopInterval)

setInterval(() => {
  if (gameStore.isGameStarted) {
    gameStore.decreaseBudget(gameStore.totalSalaries)
    dailyCost += dailyCost
  }
}, config.salaryInterval)

const gameOver = async () => {
  gameStore.isGameStarted = false
  await fetch('http://localhost:8000/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      time_passed: gameStore.timePassed,
      max_budget: gameStore.highestBudgetPeak,
      player_id: gameStore.playerId
    })
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log('Success:', data)
      alert('Game Over')
      router.push('/rankings')
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
</script>

<template>
  <RouterView />
</template>
