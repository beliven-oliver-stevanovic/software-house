<script setup>
import { useGameStore } from '@/stores/gameStore'
import { onMounted, ref, computed } from 'vue'
import Dev from '@/models/Dev'
import Commercial from '@/models/Commercial'
import { generateEmployeeName } from '@/utils'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'

const gameStore = useGameStore()

const findCandidate = () => {
  let seniority
  let generator = Math.random()
  if (generator < 0.5) {
    seniority = 'Junior'
  } else if (generator < 0.8) {
    seniority = 'Mid'
  } else {
    seniority = 'Senior'
  }
  return Math.random() > 0.5
    ? new Dev(generateEmployeeName(), seniority)
    : new Commercial(generateEmployeeName(), seniority)
}

const candidates = ref([findCandidate(), findCandidate()])

const decoratedCandidates = computed(() =>
  candidates.value.map((candidate) => {
    return {
      id: candidate.id,
      name: candidate.name,
      seniority: candidate.seniority,
      role: candidate instanceof Dev ? 'Developer' : 'Commercial',
      cost: candidate.cost,
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
  let toHire = candidates.value.find((c) => c.id === candidate.id)
  gameStore.hireCandidate(toHire)
  candidates.value = candidates.value.filter((c) => c.id !== candidate.id)
}

onMounted(() => {
  setInterval(() => {
    candidates.value = [...candidates.value, findCandidate()]
  }, 20000)
})
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
  </main>
</template>
