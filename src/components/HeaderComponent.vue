<script setup>
import { useGameStore } from '@/stores/gameStore'
import { useRouter } from 'vue-router'
import { patchOne } from '@/server'

const gameStore = useGameStore()
const router = useRouter()

const exitGame = async () => {
  let gameObj = {
    time_passed: gameStore.timePassed,
    max_budget: gameStore.highestBudgetPeak,
    player_id: gameStore.playerId,
    budget: gameStore.budget,
    status: JSON.stringify(gameStore.gameStatus)
  }
  const patchedGame = await patchOne('games', gameStore.id, gameObj)
  gameStore.isGameStarted = false
  let index = gameStore.playedGames.findIndex((game) => game.id === patchedGame.id)
  if (index === -1) {
    gameStore.playedGames.push(patchedGame)
  } else {
    gameStore.playedGames[index] = patchedGame
  }
  router.push('/main-menu')
}
</script>

<template>
  <header>
    <h1><slot></slot></h1>
    <button class="exit-button" @click="exitGame()">Exit</button>
  </header>
</template>

<style scoped>
.exit-button {
  position: absolute;
  right: 0;
  top: 0;
  margin: 2rem;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: red;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
