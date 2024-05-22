<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const name = ref('')
const router = useRouter()
const gameStore = useGameStore()
const register = async () => {
  await fetch('http://localhost:8000/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name.value })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      gameStore.playerId = data.id
      gameStore.isGameStarted = true

      router.push('/production')
    })
    .catch((error) => {
      console.error('Error:', error)
    })
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
