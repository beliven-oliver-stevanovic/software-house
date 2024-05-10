import { v4 as uuidv4 } from 'uuid'

export default class Employee {
  constructor(name, seniority) {
    this.id = uuidv4()
    this.name = name
    this.seniority = seniority
    this.cost = this.setCost()
    this.workLeft = 0
    this.isOccupied = false
  }

  setCost() {
    if (this.seniority === 'Junior') {
      return 100
    } else if (this.seniority === 'Mid') {
      return 200
    } else if (this.seniority === 'Senior') {
      return 300
    }
  }

  getworkLeft() {
    return this.workLeft
  }

  getCost() {
    return this.cost
  }

  getName() {
    return this.name
  }
}
