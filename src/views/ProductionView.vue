<script setup>
import { useGameStore } from '@/stores/gameStore'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { computed, ref } from 'vue'
import { config } from '@/config.js'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'

const gameStore = useGameStore()

const router = useRouter()

let dailyCost = config.dailyCost

const selectedProject = ref(null)

const decoratedDevs = computed(() =>
  gameStore.devs.map((dev) => {
    return {
      id: dev.id,
      name: dev.name,
      seniority: dev.seniority.type,
      status: dev.isOccupied
        ? config.labels.workStatus.working
        : config.labels.workStatus.notWorking,
      workTime: dev.workTime ? dev.workTime : 0,
      isOccupied: dev.isOccupied,
      labels: {
        name: 'Name',
        seniority: 'Seniority',
        status: 'Status',
        workTime: 'Work Left',
        isOccupied: 'Occupied'
      }
    }
  })
)

const decoratedProjects = computed(() =>
  gameStore.projects.map((project) => {
    return {
      id: project.id,
      name: project.name,
      value: project.value,
      complexity: project.complexity,
      isAssigned: project.isAssigned,
      labels: {
        name: 'Name',
        value: 'Value',
        complexity: 'Complexity',
        isAssigned: 'Assigned'
      }
    }
  })
)

const setSelection = (project) => {
  selectedProject.value = project
}

const assignProject = (devId) => {
  gameStore.assignProjectById(devId, selectedProject.value.id)
  selectedProject.value = null
}

let gameLoop, salaries

gameLoop = setInterval(async () => {
  gameStore.decreaseBudget(dailyCost)
  if (gameStore.budget <= 0) {
    await gameOver()
  }
}, config.gameLoopInterval)

salaries = setInterval(() => {
  gameStore.decreaseBudget(gameStore.totalSalaries)
  dailyCost += dailyCost
}, config.salaryInterval)

gameStore.isGameStarted = true

const gameOver = async () => {
  clearInterval(gameLoop)
  clearInterval(salaries)
  console.log(gameStore.timePassed)
  await fetch('http://localhost:8000/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      time_passed: gameStore.timePassed,
      max_budget: gameStore.highestBudgetPeak,
      player_id: gameStore.playerId
    })
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log('Success:', data)
      clearInterval(gameLoop)
      clearInterval(salaries)
      alert('Game Over')
      router.push('/')
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
</script>

<template>
  <header>
    <h1>Production</h1>
  </header>

  <main>
    <h2 class="budget-indicator">
      Budget:
      <strong :class="gameStore.budget > config.alertBudgetLimit ? 'positive' : 'negative'">{{
        gameStore.budget
      }}</strong>
    </h2>

    <div v-if="selectedProject" class="selected-dev">
      <h2>Selected Project</h2>
      <p>Assigning {{ selectedProject.name }}...</p>
      <button @click="() => (selectedProject = null)">Cancel</button>
    </div>

    <ListCard class="list-card" title="Developers">
      <template #elements>
        <ListElement
          v-for="dev in decoratedDevs"
          :key="dev.id"
          :element="dev"
          @click="
            () => {
              if (!dev.isOccupied && selectedProject) assignProject(dev.id)
            }
          "
        />
      </template>
    </ListCard>

    <ListCard class="list-card" title="Projects">
      <template #elements>
        <ListElement
          v-for="project in decoratedProjects"
          :key="project.id"
          :element="project"
          :button="
            project.isAssigned
              ? null
              : { label: 'Assign', onClickFunction: () => setSelection(project) }
          "
        />
      </template>
    </ListCard>
    <NavBar />
  </main>
</template>

<style scoped>
.budget-indicator {
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
}
.positive {
  color: green;
}
.negative {
  color: red;
}

.list-card {
  flex: 1;
}

.selected-dev {
  position: fixed;
  bottom: 20%;
  left: auto;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  text-align: center;
}
</style>
