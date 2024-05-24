<script setup>
import { useGameStore } from '@/stores/gameStore'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { postOne } from '@/server'
import axios from 'axios'
import { baseAPIUrl } from '@/config'

const gameStore = useGameStore()
const inProgressGames = ref([])
const router = useRouter()

onMounted(async () => {
  inProgressGames.value = await axios
    .get(`${baseAPIUrl}/games/in_progress/${gameStore.playerId}`)
    .then((response) => {
      return response.data
    })
})

const decoratedGames = computed(() => {
  return inProgressGames.value.map((game) => {
    return {
      id: game.id,
      creation_date: game.created_at,
      time_passed: game.time_passed,
      max_budget: game.max_budget,
      budget: game.budget,
      labels: {
        creation_date: 'Played on',
        time_passed: 'Time passed',
        max_budget: 'Max budget',
        budget: 'Budget'
      }
    }
  })
})

const setupGame = (game) => {
  gameStore.id = game.id
  const gameStatus = gameStore.playedGames.find((g) => g.id === game.id).status
  gameStore.restoreGame(gameStatus)
  router.push({
    path: '/production'
  })
}

const newGame = async () => {
  gameStore.resetStats()
  const game = await postOne('games', {
    time_passed: gameStore.timePassed,
    max_budget: gameStore.highestBudgetPeak,
    player_id: gameStore.playerId,
    budget: gameStore.budget,
    status: JSON.stringify(gameStore.gameStatus)
  })
  gameStore.id = game.id
  gameStore.isGameStarted = true
  router.push({
    name: 'production'
  })
}
</script>

<template>
  <header>
    <h1>Main Menu</h1>
  </header>
  <main>
    <h2>Resume Game</h2>
    <ListCard class="list-card">
      <template #elements>
        <ListElement
          v-for="game in decoratedGames"
          :key="game.id"
          :element="game"
          :button="{ label: 'Resume', onClickFunction: () => setupGame(game) }"
        />
      </template>
    </ListCard>
    <button class="positive" @click="newGame()">New Game</button>
  </main>
</template>

<style scoped>
.list-card {
  overflow: scroll;
}

button {
  width: 40%;
  background-color: green;
  color: white;
  position: fixed;
  bottom: 3%;
}
</style>
