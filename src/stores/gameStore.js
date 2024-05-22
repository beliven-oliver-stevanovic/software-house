import { defineStore } from 'pinia'
import Dev from '@/models/Dev'
import Commercial from '@/models/Commercial'
import { generateEmployeeName } from '@/utils'
import JuniorStrategy from '@/models/JuniorStrategy'
import MidStrategy from '@/models/MidStrategy'
import SeniorStrategy from '@/models/SeniorStrategy'
import { config } from '@/config'

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      devs: [new Dev(generateEmployeeName(), new JuniorStrategy())],
      commercials: [new Commercial(generateEmployeeName(), new JuniorStrategy())],
      projects: [],
      candidates: [],
      budget: config.initialBudget,
      highestBudgetPeak: config.initialBudget,
      timePassed: 0,
      playerId: 1,
      isGameStarted: false,
      dailyCost: config.dailyCost,
      hireTimer: config.hireTimer,
      salariesTimer: config.salariesTimer
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
      this.increaseBudget(completed.value)
      this.projects = this.projects.filter((project) => project.id !== projectId)
    },
    decreaseBudget(amount = 0) {
      this.budget -= this.dailyCost
      this.budget -= amount
    },
    increaseBudget(amount) {
      this.budget += amount
      if (this.budget > this.highestBudgetPeak) {
        this.highestBudgetPeak = this.budget
      }
    },
    assignProjectById(devId, projectId) {
      let dev = this.devs.find((dev) => dev.id === devId)
      let project = this.projects.find((project) => project.id === projectId)
      project.isAssigned = true
      dev.assignProject(project)
    },
    workDay() {
      this.devs.forEach((dev) => dev.work())
      this.commercials.forEach((commercial) => {
        if (commercial.foundProject) {
          this.projects.push(commercial.foundProject)
          commercial.foundProject = null
          commercial.searchTime = commercial.getSearchTime()
        } else {
          commercial.search()
        }
      })
      this.timePassed = this.timePassed + 1
    },
    resetStats() {
      this.devs = [new Dev(generateEmployeeName(), new JuniorStrategy())]
      this.commercials = [new Commercial(generateEmployeeName(), new JuniorStrategy())]
      this.projects = []
      this.budget = config.initialBudget
      this.highestBudgetPeak = config.initialBudget
      this.timePassed = 0
      this.playerId = -1
      this.dailyCost = config.dailyCost
      this.hireTimer = config.hireTimer
      this.salariesTimer = config.salariesTimer
    },
    findCandidate() {
      let seniority
      let generator = Math.random()
      if (generator < config.juniorGenerationRate) {
        seniority = new JuniorStrategy()
      } else if (generator < config.midGenerationRate) {
        seniority = new MidStrategy()
      } else {
        seniority = new SeniorStrategy()
      }
      this.candidates = [
        ...this.candidates,
        Math.random() > config.devGenerationRate
          ? new Dev(generateEmployeeName(), seniority)
          : new Commercial(generateEmployeeName(), seniority)
      ]
    }
  },

  getters: {
    totalDevSalaries(state) {
      return state.devs.reduce((acc, dev) => acc + dev.getSalary(), 0)
    },
    totalCommercialsSalaries(state) {
      return state.commercials.reduce((acc, commercial) => acc + commercial.getSalary(), 0)
    },
    totalSalaries() {
      return this.totalDevSalaries + this.totalCommercialsSalaries
    }
  }
})
