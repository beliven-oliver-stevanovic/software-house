import SeniorityStrategy from './SeniorityStrategy'
import { config } from '@/config.js'

export default class SeniorStrategy extends SeniorityStrategy {
  constructor() {
    super()
    this.type = config.labels.seniority.senior
  }

  getSearchTime() {
    return config.seniorSearchTime
  }

  getWorkTime(project) {
    return Math.floor(project.complexity / config.seniorProjectDifficultyRate)
  }

  getSalary() {
    return config.seniorSalary
  }
}
