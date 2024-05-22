<script setup>
import { useGameStore } from '@/stores/gameStore'
import { computed } from 'vue'
import Dev from '@/models/Dev'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { config } from '@/config.js'
import NavBar from '../components/NavBar.vue'

const gameStore = useGameStore()

const decoratedCandidates = computed(() =>
  gameStore.candidates.map((candidate) => {
    return {
      id: candidate.id,
      name: candidate.name,
      seniority: candidate.seniority.type,
      role:
        candidate instanceof Dev ? config.labels.roles.developer : config.labels.roles.commercial,
      cost: candidate.salary,
      labels: {
        name: 'Name',
        seniority: 'Seniority',
        role: 'Role',
        cost: 'Cost'
      }
    }
  })
)

const onHire = (candidate) => {
  let toHire = gameStore.candidates.find((c) => c.id === candidate.id)
  gameStore.hireCandidate(toHire)
  gameStore.candidates = gameStore.candidates.filter((c) => c.id !== candidate.id)
}
</script>

<template>
  <header>
    <h1>HR</h1>
  </header>

  <main>
    <ListCard title="Candidates">
      <template #elements>
        <ListElement
          v-for="candidate in decoratedCandidates"
          :key="candidate.id"
          :element="candidate"
          :button="{ label: 'Hire', onClickFunction: () => onHire(candidate) }"
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
