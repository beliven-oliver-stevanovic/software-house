import SeniorityStrategy from './SeniorityStrategy'
import { midSearchTime, midSalary, midProjectDifficultyRate, labels } from '@/config.js'

export default class MidStrategy extends SeniorityStrategy {
  constructor() {
    super()
    this.type = labels.seniority.mid
  }

  getSearchTime() {
    return midSearchTime
  }

  getWorkTime(project) {
    return Math.floor(project.complexity / midProjectDifficultyRate)
  }

  getSalary() {
    return midSalary
  }
}
