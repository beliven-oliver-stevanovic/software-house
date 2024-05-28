<script setup>
import { useGameStore } from '@/stores/gameStore'
import { useRouter } from 'vue-router'
import { patchOne } from '@/server'
import ButtonComponent from './ButtonComponent.vue'
import TitleComponent from './TitleComponent.vue'

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
    <TitleComponent dimension="2xl"><slot></slot></TitleComponent>
    <ButtonComponent
      @click="exitGame"
      text="Exit"
      :negative="true"
      class="bg-red-500 fixed top-5 right-5"
    />
  </header>
</template>
