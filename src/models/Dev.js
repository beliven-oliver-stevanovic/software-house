import { useGameStore } from '@/stores/gameStore'
import Employee from './Employee'

export default class Dev extends Employee {
  constructor(name, seniority) {
    super(name, seniority)
    this.project = null
  }

  getSeniority() {
    return this.seniority
  }

  getIsOccupied() {
    return this.isOccupied
  }

  assignProject(project) {
    this.isOccupied = true
    this.project = project
    if (this.seniority === 'Junior') {
      this.workLeft = Math.floor(project.complexity / 1)
    } else if (this.seniority === 'Mid') {
      this.workLeft = Math.floor(project.complexity / 2)
    } else if (this.seniority === 'Senior') {
      this.workLeft = Math.floor(project.complexity / 3)
    }
  }

  work() {
    if (!this.isOccupied) return
    if (this.workLeft === 0) {
      const gameStore = useGameStore()
      gameStore.completeProject(this.project.id)
      this.isOccupied = false
      this.project = null
      return
    }
    this.workLeft -= 1
  }
}
