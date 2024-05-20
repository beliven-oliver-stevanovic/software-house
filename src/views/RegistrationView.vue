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
      router.push('/production')
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
</script>

<template>
  <h1>Register</h1>

  <form @submit.prevent="register">
    <div>
      <label for="name">Name</label>
      <input type="name" id="name" v-model="name" />
    </div>
    <button type="submit">Register</button>
  </form>
</template>
