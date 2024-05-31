<script setup>
import { RouterView, useRouter } from 'vue-router'
import '@/main.css'
import { useGameStore } from '@/stores/gameStore'
import { hireTimer, salariesTimer, gameLoopInterval } from '@/config.js'
import { patchOne } from './server'
import axios from './axios'
import { apiURL } from './config'
import { onMounted } from 'vue'

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
    user_id: gameStore.userId,
    budget: gameStore.budget,
    status: JSON.stringify(gameStore.gameStatus)
  })
  alert('Game Over')
  router.push('/rankings')
}

onMounted(async () => {
  if (!gameStore.userRegistered) {
    await axios.get(`${apiURL}/user`).then((user) => {
      gameStore.userId = user.data.id
      gameStore.userRegistered = true
      gameStore.playedGames = user.data.games
      router.push({
        name: 'main-menu'
      })
    })
  }
})
</script>

<template>
  <RouterView />
</template>
