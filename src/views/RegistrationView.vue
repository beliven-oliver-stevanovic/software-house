<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TitleComponent from '@/components/TitleComponent.vue'
import InputField from '@/components/InputField.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import axios from 'axios'
import { useGameStore } from '../stores/gameStore'
import { csfrURL, backendURL, apiURL } from '../config'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmation = ref('')
const errorMsg = ref('')
const router = useRouter()
const gameStore = useGameStore()

const register = async () => {
  if (password.value !== confirmation.value) {
    errorMsg.value = 'Passwords do not match'
    return
  }
  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true
  await axios.get(csfrURL).catch(() => {
    errorMsg.value = 'Something went wrong, please try again later.'
  })
  await axios
    .post(`${backendURL}/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmation.value
    })
    .catch((error) => {
      if (error.response.status === 403) {
        errorMsg.value = error.statusText
      }
      if (error.response.status == 422) {
        errorMsg.value = error.response.data.message
      }
      if (error.response.status === 500) {
        errorMsg.value = error.statusText
      }
    })

  const user = await axios.get(`${apiURL}/user`)

  gameStore.userId = user.data.id
  gameStore.userRegistered = true
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
    <h1 class="text-xl font-semibold text-center">Welcome to Software house Tycoon!</h1>
    <TitleComponent>Register</TitleComponent>
    <form @submit.prevent="register" class="flex flex-col gap-5 py-5">
      <InputField v-model="name" name="name" placeholder="Username" />
      <InputField v-model="email" type="email" name="email" placeholder="Email" />
      <InputField v-model="password" type="password" name="password" placeholder="Password" />
      <InputField v-model="confirmation" type="password" placeholder="Confirm password" />
      <p v-if="errorMsg != ''" class="text-red-500 font-bold">{{ errorMsg }}</p>
      <ButtonComponent type="submit" text="Play!" :positive="true" />
      <p>Already registered? <a class="text-black underline" href="/">Log in</a></p>
    </form>
  </main>
</template>
