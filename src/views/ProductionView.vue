<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>

<template>
  <h1>Production</h1>
  <p>Budget: {{ gameStore.budget }}</p>
  <ul>
    <li v-for="dev in gameStore.devs" :key="dev.id">
      {{ dev.getName() }} - {{ dev.getSeniority() }} -
      {{ dev.getIsOccupied() ? 'Working...' : 'Free' }}
    </li>
  </ul>
  <ul>
    <li v-for="project in gameStore.projects" :key="project.id">
      {{ project.getName() }} - {{ project.getComplexity() }} - {{ project.getValue() }}
    </li>
  </ul>
</template>
