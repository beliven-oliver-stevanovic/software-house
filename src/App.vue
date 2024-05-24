<script setup>
import { RouterView, useRouter } from 'vue-router'
import '@/main.css'
import { useGameStore } from '@/stores/gameStore'
import { hireTimer, salariesTimer, gameLoopInterval } from '@/config.js'
import { patchOne } from './server'

const gameStore = useGameStore()

const router = useRouter()

setInterval(async () => {
  if (gameStore.isGameStarted) {
    gameStore.decreaseBudget()
    gameStore.workDay()
    if (gameStore.budget <= 0) {
      await gameOver()
    }
    if (gameStore.hireTimer == 0) {
      gameStore.findCandidate()
      gameStore.hireTimer = hireTimer
    }
    if (gameStore.salariesTimer == 0) {
      gameStore.decreaseBudget(gameStore.totalSalaries)
      gameStore.dailyCost += gameStore.dailyCost
      gameStore.salariesTimer = salariesTimer
    }
    gameStore.hireTimer--
    gameStore.salariesTimer--
  }
}, gameLoopInterval)

const gameOver = async () => {
  gameStore.isGameStarted = false
  await patchOne('games', gameStore.id, {
    time_passed: gameStore.timePassed,
    max_budget: gameStore.highestBudgetPeak,
    player_id: gameStore.playerId,
    budget: gameStore.budget,
    status: JSON.stringify(gameStore.gameStatus)
  })
  alert('Game Over')
  router.push('/rankings')
}
</script>

<template>
  <RouterView />
</template>
