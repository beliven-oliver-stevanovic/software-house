<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { getOne, postOne } from '@/server'

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
    <h1>Register</h1>
  </header>

  <main>
    <form @submit.prevent="register">
      <h3>Welcome to Software house Tycoon!</h3>
      <span>
        <input type="name" id="name" v-model="name" placeholder="Player name" />
      </span>
      <button type="submit">Play!</button>
    </form>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  gap: 2rem;
}

span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 70%;
}

input {
  width: 100%;
}

button {
  width: 40%;
  background-color: green;
  color: white;
}
</style>
