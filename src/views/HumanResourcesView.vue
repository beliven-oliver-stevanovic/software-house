<script setup>
import { useGameStore } from '@/stores/gameStore'
import { computed } from 'vue'
import Dev from '@/models/Dev'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { labels } from '@/config.js'
import NavBar from '../components/NavBar.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useGame } from '@/game'

const gameStore = useGameStore()
const { onHire } = useGame()

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
