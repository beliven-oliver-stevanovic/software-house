<script setup>
import { RouterView, useRouter } from 'vue-router'
import '@/main.css'
import { useGameStore } from '@/stores/gameStore'
import { config } from '@/config.js'

const gameStore = useGameStore()

const router = useRouter()

setInterval(async () => {
  console.log('started:', gameStore.isGameStarted)
  if (gameStore.isGameStarted) {
    gameStore.decreaseBudget()
    gameStore.workDay()
    if (gameStore.budget <= 0) {
      await gameOver()
    }
    if (gameStore.hireTimer == 0) {
      console.log('find candidate')
      gameStore.findCandidate()
      gameStore.hireTimer = config.hireTimer
    }
    if (gameStore.salariesTimer == 0) {
      console.log('decrease salaries')
      gameStore.decreaseBudget(gameStore.totalSalaries)
      gameStore.dailyCost += gameStore.dailyCost
      gameStore.salariesTimer = config.salariesTimer
    }
    gameStore.hireTimer--
    gameStore.salariesTimer--
  }
}, config.gameLoopInterval)

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
