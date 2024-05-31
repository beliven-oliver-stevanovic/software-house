<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import TitleComponent from '@/components/TitleComponent.vue'
import InputField from '@/components/InputField.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import axios from 'axios'
import { csfrURL, backendURL, apiURL } from '@/config'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const gameStore = useGameStore()

const login = async () => {
  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true
  await axios.get(csfrURL)
  await axios.post(`${backendURL}/login`, {
    email: email.value,
    password: password.value
  })
  const user = await axios.get(`${apiURL}/user`)
  gameStore.userId = user.data.id
  gameStore.userRegistered = true
  gameStore.playedGames = user.data.games
  router.push({
    name: 'main-menu'
  })
}
</script>

<template>
  <header>
    <TitleComponent>Software House Tycoon</TitleComponent>
  </header>

  <main>
    <TitleComponent>Welcome back to Software house Tycoon!</TitleComponent>
    <form @submit.prevent="login" class="flex flex-col gap-5 py-5">
      <InputField v-model="email" type="email" name="email" placeholder="Email" />
      <InputField v-model="password" type="password" name="password" placeholder="Password" />
      <p v-if="error != ''" class="text-red-500 font-bold">{{ error }}</p>
      <ButtonComponent type="submit" text="Play!" :positive="true" />
      <p>Yet to register? <a class="text-black underline" href="/register">Sign up</a></p>
    </form>
  </main>
</template>
