import { useGameStore } from '@/stores/gameStore'
import Employee from './Employee'

export default class Dev extends Employee {
  constructor(name, seniority) {
    super(name, seniority)
    this.project = null
    this.workTime = 0
  }

  getWorkTime() {
    return this.seniority.getWorkTime(this.project)
  }

  getIsOccupied() {
    return this.isOccupied
  }

  assignProject(project) {
    this.isOccupied = true
    this.project = project
    this.workTime = this.getWorkTime()
  }

  work() {
    if (!this.isOccupied) return
    if (this.workTime === 0) {
      const gameStore = useGameStore()
      gameStore.completeProject(this.project.id)
      this.isOccupied = false
      this.project = null
      return
    }
    this.workTime -= 1
  }
}
