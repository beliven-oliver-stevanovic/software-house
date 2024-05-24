<script setup>
import { useGameStore } from '@/stores/gameStore'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { computed, ref, watch } from 'vue'
import { labels, alertBudgetLimit } from '@/config.js'
import NavBar from '@/components/NavBar.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const gameStore = useGameStore()

const selectedProject = ref(null)
let budgetIncreased = ref(false)

const decoratedDevs = computed(() =>
  gameStore.devs.map((dev) => {
    if (dev.isOccupied) {
      return {
        id: dev.id,
        name: dev.name,
        seniority: dev.seniority.type,
        workTime: dev.workTime ? dev.workTime : 0,
        labels: {
          name: 'Name',
          seniority: 'Seniority',
          status: 'Status',
          workTime: 'Work Left'
        }
      }
    } else {
      return {
        id: dev.id,
        name: dev.name,
        seniority: dev.seniority.type,
        status: dev.isOccupied ? labels.workStatus.working : labels.workStatus.notWorking,
        labels: {
          name: 'Name',
          seniority: 'Seniority',
          status: 'Status'
        }
      }
    }
  })
)

const decoratedProjects = computed(() =>
  gameStore.projects
    .filter((project) => !project.isAssigned)
    .map((project) => {
      if (!project.isAssigned) {
        return {
          id: project.id,
          name: project.name,
          value: project.value,
          complexity: project.complexity,
          labels: {
            name: 'Name',
            value: 'Value',
            complexity: 'Complexity'
          }
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

watch(
  () => gameStore.budget,
  (newBudget, oldBudget) => {
    if (newBudget > oldBudget) {
      budgetIncreased.value = true
      setTimeout(() => {
        budgetIncreased.value = false
      }, 1000)
    }
  }
)
</script>

<template>
  <HeaderComponent> Production </HeaderComponent>

  <main>
    <h2 class="budget-indicator">
      Budget:
      <strong :class="gameStore.budget > alertBudgetLimit ? 'positive' : 'negative'">{{
        gameStore.budget
      }}</strong>
      <Transition name="slide-fade">
        <span class="positive" v-if="budgetIncreased">+</span>
      </Transition>
    </h2>

    <div v-if="selectedProject" class="selected-dev">
      <h2>Selected Project</h2>
      <p>Assigning {{ selectedProject.name }}...</p>
      <button @click="() => (selectedProject = null)">Cancel</button>
    </div>

    <div class="list-container">
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
    </div>

    <NavBar />
  </main>
</template>

<style scoped>
.budget-indicator {
  padding: 0.5rem;
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
  max-height: 100%;
  height: fit-content;
  overflow-y: scroll;
}

.selected-dev {
  position: fixed;
  bottom: 12%;
  left: auto;
  border-radius: 1rem;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  text-align: center;
}

.list-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-evenly;
  align-content: start;
  width: 100vw;
  height: 100%;
  gap: 1rem;
  padding: 0.8rem;
  overflow: scroll;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
