import SeniorityStrategy from './SeniorityStrategy'
import { seniorSalary, seniorSearchTime, seniorProjectDifficultyRate, labels } from '@/config.js'

export default class SeniorStrategy extends SeniorityStrategy {
  constructor() {
    super()
    this.type = labels.seniority.senior
  }

  getSearchTime() {
    return seniorSearchTime
  }

  getWorkTime(project) {
    return Math.floor(project.complexity / seniorProjectDifficultyRate)
  }

  getSalary() {
    return seniorSalary
  }
}
