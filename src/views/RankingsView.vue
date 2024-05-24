<script setup>
import { baseAPIUrl } from '@/config'
import { useGameStore } from '@/stores/gameStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { postOne } from '@/server'

const rankings = ref([])
const isByBudget = ref(true)
const router = useRouter()
const gameStore = useGameStore()

onMounted(async () => {
  getRankingsByBudget()
})

const getRankingsByBudget = async () => {
  const response = await fetch(`${baseAPIUrl}/games/ranking/max_budget`)
  rankings.value = await response.json()
  isByBudget.value = true
}

const getRankingsByTime = async () => {
  const response = await fetch(`${baseAPIUrl}/games/ranking/time_passed`)
  rankings.value = await response.json()
  isByBudget.value = false
}

const restartGame = async () => {
  gameStore.resetStats()
  await postOne('games', {
    time_passed: gameStore.timePassed,
    max_budget: gameStore.highestBudgetPeak,
    player_id: gameStore.playerId,
    budget: gameStore.budget,
    status: JSON.stringify(gameStore.gameStatus)
  }).then((data) => {
    gameStore.id = data.id
    gameStore.isGameStarted = true
    router.push({
      name: 'production'
    })
  })
}
</script>

<template>
  <header>
    <h1>Rankings</h1>
  </header>
  <main>
    <span>
      <button @click="getRankingsByBudget" :class="isByBudget ? 'activeButton' : null">
        By Budget
      </button>
      <button @click="getRankingsByTime" :class="!isByBudget ? 'activeButton' : null">
        By Time
      </button>
    </span>
    <ul class="ranking-list">
      <li v-for="(ranking, index) in rankings" :key="ranking.id">
        <span>
          <h2>{{ index + 1 }}.</h2>
          <p>
            {{ 'Player: ' + ranking.player.name }}
            <br />
            {{
              isByBudget
                ? 'Maximum budget: ' + ranking.max_budget
                : 'Game time: ' + ranking.time_passed
            }}
          </p>
        </span>
      </li>
    </ul>
    <button class="restartButton" @click="restartGame()">Restart game</button>
  </main>
</template>

<style scoped>
.ranking-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  width: 90%;
  overflow: scroll;
}

li {
  list-style-type: none;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 20px;
  width: 90%;
  background-color: #f0f0f0;
  border: 1px solid black;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.activeButton {
  background-color: gray;
  color: white;
}

.restartButton {
  width: 40%;
  background-color: green;
  color: white;
}

span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
