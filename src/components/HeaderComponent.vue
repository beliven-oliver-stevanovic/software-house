<script setup>
import ButtonComponent from './ButtonComponent.vue'
import TitleComponent from './TitleComponent.vue'
import { useGame } from '@/composables/game'

const { exitGame } = useGame()
</script>

<template>
  <header>
    <TitleComponent><slot></slot></TitleComponent>
    <ButtonComponent
      @click="async () => await exitGame()"
      text="Exit"
      :negative="true"
      class="bg-red-500 fixed top-5 right-5"
    />
  </header>
</template>
