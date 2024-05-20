<script setup>
import { onMounted, ref } from 'vue'

const rankings = ref([])
const isByBudget = ref(true)

onMounted(async () => {
  getRankingsByBudget()
})

const getRankingsByBudget = async () => {
  const response = await fetch(`http://localhost:8000/games/ranking/max_budget`)
  rankings.value = await response.json()
  isByBudget.value = true
  console.log(rankings.value)
}

const getRankingsByTime = async () => {
  const response = await fetch(`http://localhost:8000/games/ranking/time_passed`)
  rankings.value = await response.json()
  isByBudget.value = false
  console.log(rankings.value)
}
</script>

<template>
  <header>
    <h1>Rankings</h1>
  </header>
  <main>
    <span>
      <button @click="getRankingsByBudget" :class="isByBudget ? 'activeButton' : null">
        By Budget
      </button>
      <button @click="getRankingsByTime" :class="!isByBudget ? 'activeButton' : null">
        By Time
      </button>
    </span>
    <ul class="ranking-list">
      <li v-for="(ranking, index) in rankings" :key="ranking.id">
        {{ index + 1 + '. Player: ' + ranking.player.name }} -
        {{
          isByBudget ? 'Maximum budget: ' + ranking.max_budget : 'Game time: ' + ranking.time_passed
        }}
      </li>
    </ul>
  </main>
</template>

<style>
.ranking-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  width: 90%;
  overflow: scroll;
}

li {
  list-style-type: none;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 20px;
  background-color: #f0f0f0;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.activeButton {
  background-color: gray;
  color: white;
}
</style>
