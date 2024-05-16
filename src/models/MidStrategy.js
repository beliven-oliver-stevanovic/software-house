import SeniorityStrategy from './SeniorityStrategy'
import { config } from '@/config.js'

export default class MidStrategy extends SeniorityStrategy {
  constructor() {
    super()
    this.type = config.labels.seniority.mid
  }

  getSearchTime() {
    return config.midSearchTime
  }

  getWorkTime(project) {
    return Math.floor(project.complexity / config.midProjectDifficultyRate)
  }

  getSalary() {
    return config.midSalary
  }
}
