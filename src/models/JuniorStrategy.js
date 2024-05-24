import SeniorityStrategy from './SeniorityStrategy'
import { juniorProjectDifficultyRate, juniorSalary, juniorSearchTime, labels } from '@/config.js'

export default class JuniorStrategy extends SeniorityStrategy {
  constructor() {
    super()
    this.type = labels.seniority.junior
  }

  getSearchTime() {
    return juniorSearchTime
  }

  getWorkTime(project) {
    return Math.floor(project.complexity / juniorProjectDifficultyRate)
  }

  getSalary() {
    return juniorSalary
  }
}
