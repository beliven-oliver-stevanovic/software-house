<script setup>
import { useGameStore } from '@/stores/gameStore'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const gameStore = useGameStore()

const decoratedCommercials = computed(() =>
  gameStore.commercials.map((commercial) => {
    return {
      id: commercial.id,
      name: commercial.name,
      cost: commercial.salary,
      seniority: commercial.seniority.type,
      labels: {
        name: '',
        cost: 'Cost: $',
        seniority: 'Seniority: '
      }
    }
  })
)
</script>

<template>
  <HeaderComponent> Sales </HeaderComponent>
  <main>
    <ListCard class="list-card" title="Commercials">
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

.list-card {
  margin: 0 auto;
  width: 100%;
}
</style>
