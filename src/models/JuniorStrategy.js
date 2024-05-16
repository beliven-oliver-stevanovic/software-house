import SeniorityStrategy from './SeniorityStrategy'
import { config } from '@/config.js'

export default class JuniorStrategy extends SeniorityStrategy {
  constructor() {
    super()
    this.type = config.labels.seniority.junior
  }

  getSearchTime() {
    return config.juniorSearchTime
  }

  getWorkTime(project) {
    return Math.floor(project.complexity / config.juniorProjectDifficultyRate)
  }

  getSalary() {
    return config.juniorSalary
  }
}
