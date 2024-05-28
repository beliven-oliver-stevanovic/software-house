<script setup>
import { useGameStore } from '@/stores/gameStore'
import { computed } from 'vue'
import Dev from '@/models/Dev'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { labels } from '@/config.js'
import NavBar from '../components/NavBar.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const gameStore = useGameStore()

const decoratedCandidates = computed(() =>
  gameStore.candidates.map((candidate) => {
    return {
      id: candidate.id,
      name: candidate.name,
      seniority: candidate.seniority.type,
      role: candidate instanceof Dev ? labels.roles.developer : labels.roles.commercial,
      cost: candidate.salary,
      labels: {
        name: '',
        seniority: 'Seniority: ',
        role: 'Role: ',
        cost: 'Cost: $'
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
  <HeaderComponent> HR </HeaderComponent>

  <main>
    <ListCard class="w-[90%] mx-auto" title="Candidates">
      <template #elements>
        <ListElement
          v-for="candidate in decoratedCandidates"
          :key="candidate.id"
          :element="candidate"
          :horizontal="true"
          :button="{ label: 'Hire', onClickFunction: () => onHire(candidate) }"
        />
      </template>
    </ListCard>
    <NavBar />
  </main>
</template>
