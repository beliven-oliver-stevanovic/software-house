<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { getOne, postOne } from '@/server'
import TitleComponent from '@/components/TitleComponent.vue'
import InputField from '@/components/InputField.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const name = ref('')
const router = useRouter()
const gameStore = useGameStore()
const register = async () => {
  const fetchedPlayer = await getOne('players', name.value)
  if (fetchedPlayer) {
    gameStore.playedGames = fetchedPlayer.games
    gameStore.playerId = fetchedPlayer.id
    gameStore.playerRegistered = true
    router.push({
      name: 'main-menu'
    })
  } else {
    const createdPlayer = await postOne('players', {
      name: name.value
    })
    const createdGame = await postOne('games', {
      time_passed: gameStore.timePassed,
      max_budget: gameStore.highestBudgetPeak,
      player_id: createdPlayer.id,
      budget: gameStore.budget,
      status: JSON.stringify(gameStore.gameStatus)
    })
    gameStore.playerId = createdPlayer.id
    gameStore.id = createdGame.id
    gameStore.isGameStarted = true
    gameStore.playerRegistered = true
    router.push({
      name: 'production'
    })
  }
}
</script>

<template>
  <header>
    <TitleComponent dimension="2xl">Software House Tycoon</TitleComponent>
  </header>

  <main>
    <form @submit.prevent="register" class="flex flex-col gap-5 py-5">
      <TitleComponent dimension="xl">Welcome to Software house Tycoon!</TitleComponent>
      <span class="flex w-full justify-evenly align-middle">
        <InputField v-model="name" type="text" placeholder="Enter your username" />
        <ButtonComponent type="submit" text="Play!" :positive="true" />
      </span>
    </form>
  </main>
</template>
