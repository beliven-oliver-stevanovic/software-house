import { defineStore } from 'pinia'
import Dev from '@/models/Dev'

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      devs: [new Dev('First', 'Junior', 300)],
      sales: [],
      projects: [],
      budget: 5000
    }
  },

  actions: {
    hireDev(name) {
      this.devs.push({ name })
    },
    hireSales(name) {
      this.sales.push({ name })
    },
    addProject(name, value, complexity) {
      this.projects.push({ name, value, complexity })
    },
    decreaseBudget(amount) {
      this.budget -= amount
    },
    increaseBudget(amount) {
      this.budget += amount
    }
  },

  getters: {
    totalDevSalaries(state) {
      return state.devs.reduce((acc, dev) => acc + dev.getCost(), 0)
    },
    totalSalesSalaries(state) {
      return state.sales.reduce((acc, sale) => acc + sale.getCost(), 0)
    },
    totalSalaries() {
      return this.totalDevSalaries() + this.totalSalesSalaries()
    }
  }
})
