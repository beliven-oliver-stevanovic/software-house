import { defineStore } from 'pinia'
import Dev from '@/models/Dev'
import Commercial from '@/models/Commercial'
import Project from '@/models/Project'
import { generateEmployeeName } from '@/utils'
import JuniorStrategy from '@/models/JuniorStrategy'
import MidStrategy from '@/models/MidStrategy'
import SeniorStrategy from '@/models/SeniorStrategy'
import config from '@/config'

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      id: 1,
      devs: [new Dev(generateEmployeeName(), new JuniorStrategy())],
      commercials: [new Commercial(generateEmployeeName(), new JuniorStrategy())],
      projects: [],
      candidates: [],
      budget: config.initialBudget,
      highestBudgetPeak: config.initialBudget,
      timePassed: 0,
      playerId: 1,
      playerRegistered: false,
      isGameStarted: false,
      dailyCost: config.dailyCost,
      hireTimer: config.hireTimer,
      salariesTimer: config.salariesTimer,
      playedGames: []
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
    },
    createSeniority(seniorityData) {
      let seniority
      switch (seniorityData.type) {
        case 'Junior':
          seniority = new JuniorStrategy(seniorityData)
          break
        case 'Mid':
          seniority = new MidStrategy(seniorityData)
          break
        case 'Senior':
          seniority = new SeniorStrategy(seniorityData)
          break
        default:
          throw new Error(`Unknown seniority level: ${seniorityData.level}`)
      }
      return seniority
    },
    restoreGame(gameState) {
      let status = JSON.parse(gameState)
      this.devs = status.devs.map((devData) => {
        return new Dev(devData.name, this.createSeniority(devData.seniority))
      })
      this.commercials = status.commercials.map((comData) => {
        return new Commercial(comData.name, this.createSeniority(comData.seniority))
      })
      this.projects = status.projects.map(
        (projectData) => new Project(projectData.name, projectData.value, projectData.complexity)
      )
      this.budget = status.budget
      this.highestBudgetPeak = status.highestBudgetPeak
      this.timePassed = status.timePassed
      this.candidates = status.candidates
      this.dailyCost = status.dailyCost
      this.hireTimer = status.hireTimer
      this.salariesTimer = status.salariesTimer
      this.isGameStarted = true
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
    },
    gameStatus(state) {
      return {
        budget: state.budget,
        highestBudgetPeak: state.highestBudgetPeak,
        timePassed: state.timePassed,
        candidates: state.candidates,
        devs: state.devs,
        commercials: state.commercials,
        projects: state.projects,
        dailyCost: state.dailyCost,
        hireTimer: state.hireTimer,
        salariesTimer: state.salariesTimer
      }
    }
  }
})
