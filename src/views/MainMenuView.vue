<script setup>
import { computed, onMounted, ref } from 'vue'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useGame } from '@/game'
import { formatDateTime } from '@/utils'

const inProgressGames = ref([])
const { setupGame, newGame, getInProgressGames, logout } = useGame()

onMounted(async () => {
  inProgressGames.value = await getInProgressGames()
})

const decoratedGames = computed(() => {
  return inProgressGames.value.map((game) => {
    return {
      id: game.id,
      creation_date: formatDateTime(game.created_at),
      time_passed: game.time_passed,
      max_budget: game.max_budget,
      budget: game.budget,
      labels: {
        creation_date: 'Played on: ',
        time_passed: 'Time passed: ',
        max_budget: 'Max budget: $',
        budget: 'Current budget: $'
      }
    }
  })
})
</script>

<template>
  <header>
    <TitleComponent>Main Menu</TitleComponent>
    <ButtonComponent
      @click="async () => await logout()"
      text="Logout"
      :negative="true"
      class="bg-red-500 fixed top-5 right-5"
    />
  </header>
  <main>
    <h2 class="text-xl font-bold">Resume Game</h2>
    <ListCard class="overflow-scroll">
      <template #elements>
        <ListElement
          v-for="game in decoratedGames"
          :key="game.id"
          :element="game"
          :button="{ label: 'Resume', onClickFunction: () => setupGame(game) }"
        />
      </template>
    </ListCard>
    <ButtonComponent type="submit" @click="newGame" text="New Game" :positive="true" />
  </main>
</template>
