import Employee from './Employee'
import Project from './Project'
import { generateProjectName } from '../utils'

export default class Commercial extends Employee {
  constructor(name, seniority) {
    super(name, seniority)
    this.searchTime = this.setSearchTime()
    this.foundProject = null
  }

  setSearchTime() {
    if (this.seniority === 'Junior') {
      return 15
    } else if (this.seniority === 'Mid') {
      return 10
    } else if (this.seniority === 'Senior') {
      return 5
    }
  }

  findProject() {
    let projectName = generateProjectName()
    let projectValue
    let projectComplexity = Math.floor(Math.random() * 30) + 10

    if (this.seniority === 'Junior') {
      projectValue = Math.floor(Math.random() * 100) * projectComplexity
    } else if (this.seniority === 'Mid') {
      projectValue = Math.floor(Math.random() * 200) * projectComplexity
    } else if (this.seniority === 'Senior') {
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
