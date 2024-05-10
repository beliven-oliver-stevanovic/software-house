import { defineStore } from 'pinia'
import Dev from '@/models/Dev'
import Commercial from '@/models/Commercial'
import { generateEmployeeName } from '@/utils'

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      devs: [new Dev(generateEmployeeName(), 'Junior')],
      commercials: [new Commercial(generateEmployeeName(), 'Junior')],
      projects: [],
      budget: 5000
    }
  },

  actions: {
    hireCandidate(candidate) {
      if (candidate instanceof Dev) {
        this.devs = [...this.devs, candidate]
      } else if (candidate instanceof Commercial) {
        this.commercials = [...this.commercials, candidate]
      }
    },
    addProject(project) {
      this.projects.push(project)
    },
    completeProject(projectId) {
      let completed = this.projects.find((project) => project.id !== projectId)
      this.budget += completed.value
      this.projects = this.projects.filter((project) => project.id !== projectId)
    },
    decreaseBudget(amount) {
      this.budget -= amount
    },
    increaseBudget(amount) {
      this.budget += amount
    },
    assignProjectById(devId, projectId) {
      let dev = this.devs.find((dev) => dev.id === devId)
      let project = this.projects.find((project) => project.id === projectId)
      project.isAssigned = true
      dev.assignProject(project)
    }
  },

  getters: {
    workDay() {
      this.devs.forEach((dev) => dev.work())
      this.commercials.forEach((commercial) => {
        if (commercial.foundProject) {
          this.projects.push(commercial.foundProject)
          commercial.foundProject = null
          commercial.searchTime = commercial.setSearchTime()
        } else {
          commercial.search()
        }
      })
    },
    totalDevSalaries(state) {
      return state.devs.reduce((acc, dev) => acc + dev.getCost(), 0)
    },
    totalCommercialsSalaries(state) {
      return state.commercials.reduce((acc, commercial) => acc + commercial.getCost(), 0)
    },
    totalSalaries() {
      return this.totalDevSalaries + this.totalCommercialsSalaries
    }
  }
})
