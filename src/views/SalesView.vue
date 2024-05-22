<script setup>
import { useGameStore } from '@/stores/gameStore'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { computed } from 'vue'
import NavBar from '@/components/NavBar.vue'

const gameStore = useGameStore()

const decoratedCommercials = computed(() =>
  gameStore.commercials.map((commercial) => {
    return {
      id: commercial.id,
      name: commercial.name,
      cost: commercial.salary,
      seniority: commercial.seniority.type,
      labels: {
        name: 'Name',
        cost: 'Cost',
        seniority: 'Seniority'
      }
    }
  })
)
</script>

<template>
  <header>
    <h1>Sales</h1>
  </header>
  <main>
    <ListCard title="Commercials">
      <template #elements>
        <ListElement
          v-for="commercial in decoratedCommercials"
          :key="commercial.id"
          :element="commercial"
        />
      </template>
    </ListCard>
    <NavBar />
  </main>
</template>

<style scoped>
main {
  overflow: scroll;
}
</style>
