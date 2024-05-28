<script setup>
import { baseAPIUrl } from '@/config'
import { useGameStore } from '@/stores/gameStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { postOne } from '@/server'
import TitleComponent from '@/components/TitleComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

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
    <TitleComponent dimension="2xl">Rankings</TitleComponent>
  </header>
  <main class="h-full">
    <span class="flex items-center justify-evenly w-full">
      <button
        @click="getRankingsByBudget"
        :class="isByBudget ? 'p-2 rounded-lg activeButton' : 'p-2 rounded-lg border border-black'"
      >
        By Budget
      </button>
      <button
        @click="getRankingsByTime"
        :class="!isByBudget ? 'p-2 rounded-lg activeButton' : 'p-2 rounded-lg border border-black'"
      >
        By Time
      </button>
    </span>
    <ul class="flex flex-col items-center gap-1 w-[100%] overflow-scroll">
      <li
        v-for="(ranking, index) in rankings"
        :key="ranking.id"
        class="m-1 p-1 rounded-lg w-[90%] bg-neutral-50 border-2 shadow-md"
      >
        <span class="flex items-center justify-evenly">
          <TitleComponent dimension="2xl">{{ index + 1 }}.</TitleComponent>
          <p>
            {{ 'Player: ' + ranking.player.name }}
            <br />
            {{
              isByBudget
                ? 'Maximum budget: ' + ranking.max_budget + '$'
                : 'Game time: ' + ranking.time_passed + ' seconds'
            }}
          </p>
        </span>
      </li>
    </ul>
    <ButtonComponent @click="restartGame()" text="Restart game" :positive="true" />
  </main>
</template>

<style scoped>
.activeButton {
  background-color: gray;
  color: white;
}
</style>
