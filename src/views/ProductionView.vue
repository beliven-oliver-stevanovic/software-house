<script setup>
import { useGameStore } from '@/stores/gameStore'
import ListCard from '../components/ListCard.vue'
import ListElement from '../components/ListElement.vue'
import { computed, ref, watch } from 'vue'
import { labels, alertBudgetLimit } from '@/config.js'
import NavBar from '@/components/NavBar.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

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
          name: '',
          seniority: 'Seniority: ',
          status: 'Status: ',
          workTime: 'Work left: '
        }
      }
    } else {
      return {
        id: dev.id,
        name: dev.name,
        seniority: dev.seniority.type,
        status: dev.isOccupied ? labels.workStatus.working : labels.workStatus.notWorking,
        labels: {
          name: '',
          seniority: 'Seniority: ',
          status: 'Status: '
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
            name: '',
            value: 'Value: $',
            complexity: 'Complexity: '
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
    <TitleComponent dimension="xl">
      Budget:
      <strong :class="gameStore.budget > alertBudgetLimit ? 'text-green-500' : 'text-red-500'"
        >{{ gameStore.budget }}$</strong
      >
      <Transition name="slide-fade">
        <span class="text-green-500" v-if="budgetIncreased">+</span>
      </Transition>
    </TitleComponent>

    <div
      v-if="selectedProject"
      class="fixed bottom-[12%] left-auto shadow bg-white text-black rounded-lg p-2 flex justify-between items-center w-[50%] border-2 border-neutral-700"
    >
      <div>
        <p class="font-bold">Assigning...</p>
        <p>{{ selectedProject.name }}</p>
      </div>

      <ButtonComponent text="Cancel" @click="() => (selectedProject = null)" :negative="true" />
    </div>

    <div class="grid grid-cols-2 justify-evenly items-start gap-2 p-1 mb-3 w-full h-full">
      <ListCard title="Developers">
        <template #elements>
          <ListElement
            v-for="dev in decoratedDevs"
            :key="dev.id"
            :element="dev"
            @click="
              () => {
                if (!dev.workTime && selectedProject) assignProject(dev.id)
              }
            "
          />
        </template>
      </ListCard>

      <ListCard title="Projects">
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
.selected-dev {
  position: fixed;
  bottom: 12%;
  left: auto;
  border-radius: 1rem;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  text-align: center;
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
