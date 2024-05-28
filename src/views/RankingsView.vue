<script setup>
import { onMounted, ref } from 'vue'
import { useGame } from '@/game'
import TitleComponent from '@/components/TitleComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const rankings = ref([])
const isByBudget = ref(true)
const { getRankingsByBudget, getRankingsByTime, restartGame } = useGame()

onMounted(async () => {
  rankings.value = await getRankingsByBudget()
})
</script>

<template>
  <header>
    <TitleComponent dimension="2xl">Rankings</TitleComponent>
  </header>
  <main class="h-full">
    <span class="flex items-center justify-evenly w-full">
      <button
        @click="
          async () => {
            rankings = await getRankingsByBudget()
            isByBudget = true
          }
        "
        :class="
          isByBudget
            ? 'p-2 rounded-lg bg-gray-500 text-white'
            : 'p-2 rounded-lg border border-black'
        "
      >
        By Budget
      </button>
      <button
        @click="
          async () => {
            rankings = await getRankingsByTime()
            isByBudget = false
          }
        "
        :class="
          !isByBudget
            ? 'p-2 rounded-lg bg-gray-500 text-white'
            : 'p-2 rounded-lg border border-black'
        "
      >
        By Time
      </button>
    </span>
    <ul class="flex flex-col items-center gap-1 w-[100%] overflow-scroll">
      <li
        v-for="(ranking, index) in rankings"
        :key="ranking.id"
        class="m-1 p-1 rounded-lg w-[90%] bg-neutral-50 border-2 shadow-md"
      >
        <span class="flex items-center justify-evenly">
          <TitleComponent dimension="2xl">{{ index + 1 }}.</TitleComponent>
          <p>
            <strong>{{ ranking.player.name }}</strong>
            <br />
            {{
              isByBudget
                ? 'Maximum budget: ' + ranking.max_budget + '$'
                : 'Game time: ' + ranking.time_passed + ' seconds'
            }}
          </p>
        </span>
      </li>
    </ul>
    <ButtonComponent
      @click="async () => await restartGame()"
      text="Restart game"
      :positive="true"
    />
  </main>
</template>
