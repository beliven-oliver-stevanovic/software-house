import Employee from './Employee'
import Project from './Project'
import { generateProjectName } from '../utils'

export default class Commercial extends Employee {
  constructor(name, seniority) {
    super(name, seniority)
    this.searchTime = this.getSearchTime()
    this.foundProject = null
  }

  getSearchTime() {
    return this.seniority.getSearchTime()
  }

  findProject() {
    let projectName = generateProjectName()
    let projectValue
    let projectComplexity = Math.floor(Math.random() * 30) + 10

    if (this.getSeniorityType() === 'Junior') {
      projectValue = Math.floor(Math.random() * 100) * projectComplexity
    } else if (this.getSeniorityType() === 'Mid') {
      projectValue = Math.floor(Math.random() * 200) * projectComplexity
    } else if (this.getSeniorityType() === 'Senior') {
      projectValue = Math.floor(Math.random() * 300) * projectComplexity
    }

    return new Project(projectName, projectValue, projectComplexity)
  }

  search() {
    if (this.foundProject) return
    if (this.searchTime === 0) {
      this.isOccupied = false
      this.foundProject = this.findProject()
      return
    }
    this.searchTime -= 1
  }
}
